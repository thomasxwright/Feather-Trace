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

    getAllSightings: async (req, res) => {
        try {
            const sightingsData = await Sighting.aggregate([
                { $match: { userId: req.user.id } },
                { $match: { image: { $exists: true } } },
                { $project: { birdId: true, image: true, _id: false } }
            ])
            const condensedSightingsData = {}
            for (const sighting of sightingsData) {
                condensedSightingsData[sighting.birdId] = (condensedSightingsData[sighting.birdId] || []).concat(sighting.image)
            }
            res.json(condensedSightingsData)
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

            // If the note contains JSON data from a bird log, use that data.
            const isJSON = note => {
                let value = typeof note !== 'string' ? JSON.stringify(note) : note
                try {
                    value = JSON.parse(note)
                } catch (e) {
                    return false
                }
                return typeof value === 'object' && value !== null
            }
            // Check if it's valid JSON. if it isn't, then check if it's trying to be. If it isn't, then use it as a note.
            //If it is trying to be JSON, alert that it's not working. If it is actual JSON, check that it has a t value. If it doesn't, alert that. If it does, use it.
            const hasValidJson = isJSON(req.body.notes)
            if (req.body.notes) {
                if (!hasValidJson) {
                    if (req.body.notes.match(/"custm"|"subnote"|"t"/)) {
                        //alert error in JSON
                        console.log("it bad data")
                        res.statusMessage = "Misformatted JSON data sent for this bird sighting."
                        res.status(400).end()
                        throw new Error(res.statusMessage)
                    }
                }
                else if (!JSON.parse(req.body.notes).hasOwnProperty('t')) {
                    // throw error for lacking a timestamp
                    res.statusMessage = "Missing timestamp for bird sighting entry."
                    res.status(400).end()
                    throw new Error(res.statusMessage)
                }
                else {
                    const birdEntry = JSON.parse(req.body.notes)
                    sightingParameters.createdAt = parseInt(birdEntry.t)
                    if (birdEntry.subnote)
                        sightingParameters.notes = birdEntry.subnote
                    if (birdEntry.pos)
                        sightingParameters.location = { latitude: parseFloat(birdEntry.pos.lat), longitude: parseFloat(birdEntry.pos.lon) }
                }
            }


            // If a file was added, send it to cloudinary and put that into our parameters.
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                sightingParameters.image = result.secure_url
                sightingParameters.cloudinary_id = result.public_id
            }
            if (req.body.notes && !hasValidJson)
                sightingParameters.notes = sightingParameters.notes || req.body.notes
            if (req.body.location)
                sightingParameters.location = sightingParameters.location || JSON.parse(req.body.location)

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
            res.json({ deleted: true })
            // res.redirect('/sightings/' + req.body.birdId)
        } catch (err) {
            console.log(err)
            res.json({ deleted: false }) //('/sightings/' + req.body.birdId)
        }
    }
}    