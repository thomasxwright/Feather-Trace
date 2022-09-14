const mongoose = require('mongoose')

const SightingSchema = new mongoose.Schema({
  birdId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  photos: [String],
  caption: String,
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Sighting', SightingSchema)