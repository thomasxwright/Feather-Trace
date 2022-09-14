const cloudinary = require("../middleware/cloudinary");
const Sighting = require('../models/Sighting')
const Bird = require('../models/Bird')

module.exports = {
    getSightings: async (req, res) => {
        console.log(req.params.id)
        try {
            const sightingsData = await Sighting.find({ userId: req.user.id, birdId: req.params.id })
            let bird = await Bird.findOne({ _id: req.params.id })
            res.render('sightings.ejs', { birdName: bird.primaryCommonName, birdId: req.params.id, sightings: sightingsData })
        } catch (err) {
            console.log(err)
        }
    },

    submitSighting: async (req, res) => {
        try {
            await Sighting.create({ birdId: req.body.birdId, date: new Date(), userId: req.user.id, caption: req.body.caption })
            console.log('Bird sighting has been logged')
            res.redirect(`/sightings/${req.body.birdId}`)
        } catch (err) {
            console.log(err)
        }
    },

    createSightingWithPic: async (req, res) => {
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
            });
            console.log("Post has been added!");
            res.redirect("/profile");
        } catch (err) {
            console.log(err);
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