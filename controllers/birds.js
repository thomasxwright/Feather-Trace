const BirdObj = require('./bird functions/BirdObj')
const Bird = require('../models/Bird')
const Sighting = require('../models/Sighting')
const mongoose = require('mongoose')

module.exports = {
    getBirds: async (req, res) => {
        const paramElem = new ParamElement(req.query)
        try {
            const birdData = await Bird.find(paramElem.mongoDbSearchObj)
                .limit(35)
                .lean()
            const birdObjs = birdData.map(json => {
                const bird = new BirdObj(json)
                bird.processInfoSegments()
                return bird.output
            })
            res.render('birds.ejs', { birdData: birdObjs, filters: paramElem.query, count: birdObjs.length })
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
        return this._paramElem
    }
    get query() {
        return this._query
    }
}