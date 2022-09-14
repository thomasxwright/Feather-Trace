const Bird = require('../models/Bird')
const mongoose = require('mongoose')

module.exports = {
    getBirds: async (req,res)=>{
        console.log(req.user)
        try{
            const birdData = await Bird.find({
                nations: { $elemMatch: {
                    nationCode: 'US',
                    subnations: { $elemMatch: {
                        subnationCode: 'AK'
                    }} 
                }}
            }).limit(35).lean()
            console.log(birdData)
            res.render('birds.ejs', {birdData: birdData, userId: req.user.id})
        }catch(err){
            console.log(err)
        }
    },

    submitBird: async (req, res) => {
        try {
            await Bird.create({commonName: req.body.commonName, scientificName: req.body.scientificName, userId: req.user.id})
            console.log('Bird entry has been created')
            res.redirect('/birds')
        }catch(err) {
            console.log(err)
        }
    },

    copyBirds: async (req, res) => {
        try {

            // res.redirect('/birds')
            // const birdData = await BirdData.find({})
            // console.log(birdData)
        }catch(err){
            console.log(err)
        }
    }



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