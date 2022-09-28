const BirdObj = require('./bird functions/BirdObj')
const Bird = require('../models/Bird')
const Sighting = require('../models/Sighting')
const mongoose = require('mongoose')

module.exports = {
    getBirds: async (req, res) => {
        console.log(req.query)
        const paramElement = {}
        const filters = {}
        for (let queryType in req.query) {
            queryFunctions[queryType](req.query[queryType], paramElement)
            filters[queryType] = req.query[queryType]
        }
        // if (paramElement.nations)
        try {
            const birdData = await Bird.find(paramElement)
                .limit(35)
                .lean()
            const birdObjs = birdData.map(json => {
                const bird = new BirdObj(json)
                bird.processInfoSegments()
                return bird.output
            })
            res.render('birds.ejs', { birdData: birdObjs, filters: filters })
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
    state: stateSort
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
}