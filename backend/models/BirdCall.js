const mongoose = require('mongoose')

const BirdCallSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  }
})

module.exports = {
  BirdCallSchema: BirdCallSchema
}