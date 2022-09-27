const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  alt: String
})

module.exports = {
  ImageSchema: ImageSchema
}