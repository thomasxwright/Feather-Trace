const Bird = require('../models/Bird')
const mongoose = require('mongoose')
const testFunction = require('../scrape')

module.exports = {
    getBirds: async (req, res) => {
        console.log(req.user)
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
            res.render('birds.ejs', { birdData: birdData, userId: req.user.id, filters: filters })
        } catch (err) {
            console.log(err)
        }
    },

    submitBird: async (req, res) => {
        try {
            await Bird.create({ commonName: req.body.commonName, scientificName: req.body.scientificName, userId: req.user.id })
            console.log('Bird entry has been created')
            res.redirect('/birds')
        } catch (err) {
            console.log(err)
        }
    },

    testFunction: testFunction,

    getBird: async (req, res) => {
        try {
            const bird = await Bird.find({primaryCommonName: req.params.birdName})
            console.log(bird)
            res.json(bird[0])
        } catch(err) {
            console.log(err)
        }
    },

    getBirdByWikiUrl: async (req, res) => {
        try {
            const bird = await Bird.find({wikiSurname: req.params.wikiUrl})
            console.log(bird)
            res.json(bird[0])
        } catch(err) {
            console.log(err)
        }
    },

    getRandomBird: async (req, res) => {
        try {
            console.log('get random burd')
            const bird = await Bird.aggregate([{ $sample: { size: 1 } }])
            console.log(bird)
            res.json(bird[0])
        } catch(err) {
            console.log(err)
        }
    },

    getAllBirds: async (req, res) => {
        try {
            const birdData = await Bird.find({})
                .limit(45)
                .lean()
            res.json(birdData)
            } catch (err) {
            console.log(err)
        }
    },



    // createTodo: async (req, res)=>{
    //     try{
    //         await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
    //         console.log('Todo has been added!')
    //         res.redirect('/todos')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // deleteTodo: async (req, res)=>{
    //     console.log(req.body.todoIdFromJSFile)
    //     try{
    //         await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
    //         console.log('Deleted Todo')
    //         res.json('Deleted It')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
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