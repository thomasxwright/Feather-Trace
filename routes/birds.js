const express = require('express')
const router = express.Router()
const birdsController = require('../controllers/birds') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, birdsController.getBirds)

// router.get('/:id', ensureAuth, birdsController.getBirds)

router.post('/submitBird', ensureAuth, birdsController.submitBird)

// router.post('/createTodo', todosController.createTodo)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

// router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router