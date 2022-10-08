const mongoose = require('mongoose')

const SpeciesShorthandSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    scientificName: {
        type: String,
        required: true
    }
})

module.exports = {
    SpeciesShorthandSchema: SpeciesShorthandSchema
}