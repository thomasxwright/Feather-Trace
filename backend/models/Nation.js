const mongoose = require('mongoose')
const { SubnationSchema } = require('../models/Subnation')

const NationSchema = new mongoose.Schema({
  nationCode: String,
  roundedNRank: String,
  subnations: [SubnationSchema],
  exotic: Boolean,
  native: Boolean
})

module.exports = {
  Nation: mongoose.model('Nation', NationSchema),
  NationSchema: NationSchema
}