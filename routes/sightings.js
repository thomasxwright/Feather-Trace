const express = require('express')
const router = express.Router()
const sightingsController = require('../controllers/sightings')
const upload = require("../middleware/multer")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', ensureAuth, sightingsController.getSightings)

router.post('/submitSighting', upload.single('file'), sightingsController.submitSighting)

router.post('/deleteSighting/:id', sightingsController.deleteSighting)


module.exports = router