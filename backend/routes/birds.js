const express = require('express')
const router = express.Router()
const birdsController = require('../controllers/birds') 
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', birdsController.getBirds)

router.get('/random', birdsController.getRandomBird)

router.get('/getAllBirds', birdsController.getAllBirds)

router.get('/getAllSpecies', birdsController.getAllSpecies)

router.get('/completeData', birdsController.getCompleteDataForBirds)

router.put('/editBird', birdsController.updateBirdEntryWithParsedWikiData)

router.get('/:commonName', birdsController.getBirdByCommonName)

router.get('/id/:id', birdsController.getBirdById)

router.get('/wiki/:wikiId', birdsController.getBirdByWikiId)

module.exports = router