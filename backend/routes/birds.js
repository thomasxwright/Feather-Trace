const express = require('express')
const router = express.Router()
const birdsController = require('../controllers/birds') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', birdsController.getBirds)

router.get('/random', birdsController.getRandomBird)

router.get('/getAllBirds', birdsController.getAllBirds)

router.get('/getAllSpecies', birdsController.getAllSpecies)

router.put('/editBird', birdsController.updateBirdEntryWithParsedWikiData)

router.get('/:commonName', birdsController.getBird)

router.get('/wiki/:wikiId', birdsController.getBirdByWikiId)

module.exports = router