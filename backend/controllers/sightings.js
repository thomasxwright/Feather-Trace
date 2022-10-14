const cloudinary = require("../middleware/cloudinary");
const Sighting = require('../models/Sighting')
const Bird = require('../models/Bird')

module.exports = {
    getSightings: async (req, res) => {
        try {
            const sightingsData = await Sighting.find({ birdId: req.params.id })
            // const sightingsData = await Sighting.find({ userId: req.user.id, birdId: req.params.id })
            res.json(sightingsData)
            
            // const bird = await Bird.findOne({ _id: req.params.id })
            // const sightingsData = await Sighting.find({ userId: req.user.id, birdId: req.params.id })
            // res.render('sightings.ejs', { birdName: bird.commonName, birdId: req.params.id, sightings: sightingsData, imgSrc: bird.images[0].src })
        } catch (err) {
            console.log(err)
        }
    },

    submitSighting: async (req, res) => {
        try {
            console.log('yoo')
            console.log('here is req.body:', req.body)
            console.log('here is req.file:', req.file)
            // const sightingParameters = {
            //     birdId: req.body.birdId,
            //     userId: '63224ab4d8b1963324e4336b' //req.user.id
            // }

            // if (req.file) {
            //     const result = await cloudinary.uploader.upload(req.file.path)
            //     sightingParameters.image = result.secure_url
            //     sightingParameters.cloudinary_id = result.public_id
            // }
            // if (req.body.notes)
            //     sightingParameters.notes = req.body.notes
            // await Sighting.create(sightingParameters)
            // console.log('Bird sighting has been logged')
            // res.json(sightingParameters)

            res.json({yea:'no'})
            // res.redirect(`/sightings/${req.body.birdId}`)
        } catch (err) {
            console.log(err)
        }
    },

    deleteSighting: async (req, res) => {
        try {
            let sighting = await Sighting.findById({ _id: req.params.id })
            if (sighting.cloudinary_id) {
                console.log('got the sighting in the database, its cloudinary id is', sighting.cloudinary_id, sighting)
                await cloudinary.uploader.destroy(sighting.cloudinary_id)
            }

            await Sighting.remove({ _id: req.params.id })
            console.log('Deleted sighting')
            res.redirect('/sightings/' + req.body.birdId)
        } catch (err) {
            console.log(err)
            res.redirect('/sightings/' + req.body.birdId)
        }
    }
}    