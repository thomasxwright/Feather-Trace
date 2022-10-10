const BirdObj = require('./bird functions/BirdObj')
const Bird = require('../models/Bird')
const Sighting = require('../models/Sighting')
const mongoose = require('mongoose')

module.exports = {
    getBirds: async (req, res) => {
        const paramElem = new ParamElement(req.query)
        try {
            console.log('fetching', paramElem.mongoDbSearchObj)
            let start = new Date()
            // const birdData = await Bird.find(paramElem.mongoDbSearchObj, { wikiHtml: false })
            const birdData = await Bird.aggregate([
                { $match: paramElem.mongoDbSearchObj },
                { $sample: { size: 130 } },
                { $project: { wikiHtml: 0 } }
            ])
                // .limit(120)
                // .lean()
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
    }



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


    }
    get mongoDbSearchObj() {
        return { ...this._paramElem, parentSpecies: { $exists: false } }
    }
    get query() {
        return this._query
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