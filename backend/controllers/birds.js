const BirdObj = require('./bird functions/BirdObj')
const Bird = require('../models/Bird')
const Sighting = require('../models/Sighting')
const mongoose = require('mongoose')
const { query } = require('express')

module.exports = {
    getBirds: async (req, res) => {
        const paramElem = new ParamElement(req.query)
        try {
            console.log('fetching', paramElem.mongoDbSearchObj)
            let start = new Date()
            // const birdData = await Bird.find(paramElem.mongoDbSearchObj, { wikiHtml: false })

            let birdData = await Bird.aggregate(paramElem.fullPipeline)
            // res.json({ birdData: birdData })

            console.log('birds retrieved from db:', birdData.length)
            const birdObjs = birdData.map(json => {
                const bird = new BirdObj(json)
                bird.processInfoSegments()
                return bird.output
            })
            // .filter(bird => bird.call)
            console.log('processed the bird info segments')
            console.log(`it took ${new Date() - start} ms to get this stuff`)
            const cladisticStructure = getCladisticStructure(birdObjs)
            console.log('organized the birds cladistically')
            res.json({ filters: paramElem.query, cladisticBirdData: cladisticStructure })
            // res.render('birds.ejs', { birdData: birdObjs, filters: paramElem.query, count: birdObjs.length, cladisticBirdData: cladisticStructure })
        } catch (err) {
            console.log(err)
        }
    },

    getBird: async (req, res) => {
        try {
            console.log(req.params)
            const bird = await Bird.find({ commonName: req.params.commonName })
            res.json(bird[0])
        } catch (err) {
            console.log(`couldn't find ${req.params.birdName}`)
            console.log(err)
        }
    },

    getBirdByWikiId: async (req, res) => {
        try {
            const bird = await Bird.find({ wikiId: req.params.wikiId })
            console.log(bird)
            res.json(bird[0])
        } catch (err) {
            console.log(err)
        }
    },

    getRandomBird: async (req, res) => {
        try {
            const bird = await Bird.aggregate([{ $sample: { size: 1 } }])
            console.log(bird)
            res.json(bird[0])
        } catch (err) {
            console.log(err)
        }
    },

    getAllBirds: async (req, res) => {
        try {
            console.log('gettin them all')
            const birdData = await Bird.find({})
                // .limit(200)
                .lean()
            console.log('we got em all')
            res.json(birdData)
        } catch (err) {
            console.log(err)
        }
    },

    getAllSpecies: async (req, res) => {
        try {
            const birdData = await Bird.aggregate([
                { $match: { parentSpecies: { $exists: false } } },
                { $project: { 'speciesGlobal.taxorder': 1, 'speciesGlobal.family': 1, 'speciesGlobal.genus': 1 } }
            ])
            let mapped = birdData.map(bird => ({ order: bird.speciesGlobal.taxorder, genus: bird.speciesGlobal.genus, family: bird.speciesGlobal.family }))
            res.json(getFrequency(mapped))
        } catch (err) {
            console.log(err)
        }
    },

    updateBirdEntryWithParsedWikiData: async (req, res) => {
        try {
            await Bird.findOneAndUpdate({ uniqueId: req.body.uniqueId }, {
                generalDescription: req.body.generalDescription,
                images: req.body.images,
                call: req.body.call,
                infoSegments: req.body.infoSegments
            })
            console.log(`${req.body.commonName} was updated in the database!`)
            res.json({ done: req.body.commonName })
        } catch (err) {
            console.log(`had a problem updating ${req.body.commonName}'s DB entry with the parsed Wiki data`)
            console.log(err)
        }
    },

    //  would use input as shaped in the duplicates file
    attachSubspecies: async (req, res) => {
        try {
            Object.values(duplicates)
            for (let parentBird of Object.values(duplicates)) {
                await attachSubspeciesToABird(parentBird[0], parentBird.slice(1))
            }
            // const bird = Bird.find()
            res.json(duplicates)
        } catch (err) {
            console.log(err)
        }
    },

    editPropertyNames: async (req, res) => {
        try {
            // await Bird.updateMany({}, {$rename: {'speciesGlobal.taxorder': 'speciesGlobal.order'}})
            console.log('updated the classes')
            res.json({ done: 'yeah' })
        } catch (err) {
            console.log(err)
        }
    }
}

function getFrequency(input) {
    const orders = {}
    const families = {}
    const genuses = {}
    for (let bird of input) {
        orders[bird.order] = (orders[bird.order] || 0) + 1
        families[bird.family] = (families[bird.family] || 0) + 1
        genuses[bird.genus] = (genuses[bird.genus] || 0) + 1
    }
    return { orders, families, genuses }
}

async function attachSubspeciesToABird(parentSpecies, subspecies) {
    await Bird.findOneAndUpdate({ uniqueId: parentSpecies.uniqueId }, {
        subspecies: subspecies.map(thing => ({ uniqueId: thing.uniqueId, scientificName: thing.scientificName }))
    })
    console.log(`added subspecies to ${parentSpecies.commonName} at ${parentSpecies.wikiId}`)
    for (let oneSubspecies of subspecies) {
        await Bird.findOneAndUpdate({ uniqueId: oneSubspecies.uniqueId }, {
            parentSpecies: { uniqueId: parentSpecies.uniqueId, scientificName: parentSpecies.scientificName }
        })
        console.log(`added the parent species ${parentSpecies.scientificName} to ${oneSubspecies.scientificName}`)
    }
}

const queryFunctions = {
    state: stateSort,

}

function stateSort(state, paramElement) {
    paramElement.nations = {
        $elemMatch: {
            nationCode: 'US',
            subnations: {
                $elemMatch: {
                    subnationCode: state
                }
            }
        }
    }
    const family = 'corvidae'
    const regex = new RegExp(`^${family}$`, 'i')
    paramElement['speciesGlobal.family'] = { '$regex': regex }
    console.log(paramElement)
}


class ParamElement {
    constructor(query) {
        this._query = query
        this._paramElem = {}
        this._birdsWithSightingsPipeline = []
        this._fullPipeline = []

        if (query.state) {
            this._paramElem.nations = {
                $elemMatch: {
                    nationCode: 'US',
                    subnations: {
                        $elemMatch: {
                            subnationCode: query.state
                        }
                    }
                }
            }
        }

        if (query.cladeType && query.cladeInput) {
            const regex = new RegExp(`^${query.cladeInput}$`, 'i')
            this._paramElem[`speciesGlobal.${query.cladeType}`] = { '$regex': regex }
        }

        //TO DO: you need to actually sanitize the isLogged parameter. it contains a string 'true' or 'false'. right now i only check if it's one of those
        if (query.isLogged && ['true', 'false'].includes(query.isLogged)) {
            const shouldMatchEmptyArr = query.isLogged === 'true' ? '$ne' : '$eq'
            this._birdsWithSightingsPipeline = [

                { $addFields: { "_id": { '$toString': '$_id' } } }, //get its id as an object
                {
                    $lookup: {         //cross check with the birds collection
                        "from": "sightings",
                        "localField": "_id",
                        "foreignField": "birdId",
                        "as": "sightings"
                    }
                },
                {$match: {sightings: {$type: 'array', [shouldMatchEmptyArr]: []}}}
            ]
        }

        this._fullPipeline = [
            ...query.isLogged ? this.birdsWithSightingsPipeline : [],  //isLogged?
            { $match: this.mongoDbSearchObj },     //clade, state
            // { $limit: 80 },                         //how many?
            { $sample: { size: 80 } },
            { $project: { wikiHtml: 0 } },
        ]
        console.log('DA PIPELINE:', this.fullPipeline)
    }
    get mongoDbSearchObj() {
        return { ...this._paramElem, parentSpecies: { $exists: false } }
    }
    get query() {
        return this._query
    }
    get birdsWithSightingsPipeline() {
        return this._birdsWithSightingsPipeline
    }
    get fullPipeline() {
        return this._fullPipeline
    }
}

function getCladisticStructure(birdArr) {
    const cladisticStructure = {}
    for (let bird of birdArr) {
        if (!cladisticStructure[bird.order])
            cladisticStructure[bird.order] = { [bird.family]: { [bird.genus]: [] } }
        else if (!cladisticStructure[bird.order][bird.family])
            cladisticStructure[bird.order][bird.family] = { [bird.genus]: [] }
        else if (!cladisticStructure[bird.order][bird.family][bird.genus])
            cladisticStructure[bird.order][bird.family][bird.genus] = []

        cladisticStructure[bird.order][bird.family][bird.genus].push(bird)
    }
    return cladisticStructure
}