const express = require('express')
const router = express.Router()
const sightingsController = require('../controllers/sightings')
const upload = require("../middleware/multer")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// router.get('/:id', ensureAuth, sightingsController.getSightings)
router.get('/:id', sightingsController.getSightings)

router.post('/submitSighting', upload.single('birdFile'), sightingsController.submitSighting)

router.delete('/deleteSighting/:id', sightingsController.deleteSighting)


module.exports = router



// https://damiandev.com/blog/Multer-File-Upload-with-React-and-Node