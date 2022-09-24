const mongoose = require('mongoose')

const InfoSegmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  info: {
    type: [String],
    required: true
  }
})

module.exports = {
  InfoSegmentSchema: InfoSegmentSchema
}