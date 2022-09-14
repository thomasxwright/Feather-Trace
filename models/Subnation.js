const mongoose = require('mongoose')

const SubnationSchema = new mongoose.Schema({
  subnationCode: String,
  roundedSRank: String,
  exotic: Boolean,
  native: Boolean
})

module.exports = {
  Subnation: mongoose.model('Subnation', SubnationSchema),
  SubnationSchema: SubnationSchema
}