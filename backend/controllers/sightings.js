const cloudinary = require("../middleware/cloudinary");
const Sighting = require('../models/Sighting')
const Bird = require('../models/Bird')

module.exports = {
    getSightings: async (req, res) => {
        try {
            const sightingsData = await Sighting.find({ birdId: req.params.id, userId: req.user.id })
            console.log('req.user is.............................', req.user)
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
            // console.log(req.user)
            const sightingParameters = {
                birdId: req.body.birdId,
                userId: req.user.id //req.user.id
            }

            // If a file was added, send it to cloudinary and put that into our parameters.
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                sightingParameters.image = result.secure_url
                sightingParameters.cloudinary_id = result.public_id
            }
            if (req.body.notes)
                sightingParameters.notes = req.body.notes

            const result = await Sighting.create(sightingParameters)

            console.log('new sighting added! the data I got from the request is ', result)
            res.json(result)
        } catch (err) {
            console.log(err)
        }
    },

    deleteSighting: async (req, res) => {
        try {
            console.log('ha, delete')
            let sighting = await Sighting.findById({ _id: req.params.id })
            console.log(req.params, sighting)
            if (sighting.cloudinary_id) {
                console.log('got the sighting in the database, its cloudinary id is', sighting.cloudinary_id, sighting)
                await cloudinary.uploader.destroy(sighting.cloudinary_id)
            }

            await Sighting.remove({ _id: req.params.id })
            console.log('Deleted sighting')
            res.json({deleted: true})
            // res.redirect('/sightings/' + req.body.birdId)
        } catch (err) {
            console.log(err)
            res.json({deleted: false}) //('/sightings/' + req.body.birdId)
        }
    }
}    