const mongoose = require('mongoose')

const BirdSchema = new mongoose.Schema({
  scientificName: {
    type: String,
    required: true
  },
  commonName: {
    type: String,
    required: true
  },
  photoUrl: String,
  userId: String
})

module.exports = mongoose.model('Bird', BirdSchema)
//https://explorer.natureserve.org/api-docs/ for more about where I got these from