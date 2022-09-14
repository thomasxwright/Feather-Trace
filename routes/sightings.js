const express = require('express')
const router = express.Router()
const sightingsController = require('../controllers/sightings')
const upload = require("../middleware/multer")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', ensureAuth, sightingsController.getSightings)

router.post('/submitSighting', ensureAuth, sightingsController.submitSighting)

router.post("/createSightingWithPic", upload.single("file"), sightingsController.createSightingWithPic);

// router.post('/createTodo', todosController.createTodo)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

// router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router