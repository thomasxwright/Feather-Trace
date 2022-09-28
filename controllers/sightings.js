const cloudinary = require("../middleware/cloudinary");
const Sighting = require('../models/Sighting')
const Bird = require('../models/Bird')

module.exports = {
    getSightings: async (req, res) => {
        try {
            const sightingsData = await Sighting.find({ userId: req.user.id, birdId: req.params.id })
            const bird = await Bird.findOne({ _id: req.params.id })
            res.render('sightings.ejs', { birdName: bird.commonName, birdId: req.params.id, sightings: sightingsData, imgSrc: bird.images[0].src })
        } catch (err) {
            console.log(err)
        }
    },

    submitSighting: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);

            await Sighting.create({
                birdId: req.body.birdId,
                userId: req.user.id,
                notes: req.body.notes,
                image: result.secure_url,
                cloudinary_id: result.public_id
            })
            console.log('Bird sighting has been logged')
            res.redirect(`/sightings/${req.body.birdId}`)
        } catch (err) {
            console.log(err)
        }
    },

    deleteSighting: async (req, res) => {
        try {
            let sighting = await Sighting.findById({ _id: req.params.id})
            console.log('got the sighting in the database, its cloudinary id is', sighting.cloudinary_id, sighting)
            await cloudinary.uploader.destroy(sighting.cloudinary_id)
            await Sighting.remove({ _id: req.params.id})
            console.log('Deleted sighting')
            res.redirect('/sightings/' + req.body.birdId)
        } catch (err) {
            console.log(err)
            res.redirect('/sightings/' + req.body.birdId)
        }
    }
}    