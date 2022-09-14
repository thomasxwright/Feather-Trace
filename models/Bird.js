const {NationSchema} = require('../models/Nation')
const mongoose = require('mongoose')

const BirdSchema = new mongoose.Schema({
  recordType: String,
  elementGlobalId: Number,
  uniqueId: String,
  nsxUrl: String,
  elcode: String,
  scientificName: {
    type: String,
    required: true
  },
  formattedScientificName: String,
  primaryCommonName: {
    type: String,
    required: true
  },
  primaryCommonNameLanguage: String,
  roundedGRank: String,
  nations: [NationSchema],
  lastModified: Date,
  classificationStatus: String,
  speciesGlobal: {
    usesaCode: String,
    cosewicCode: String,
    saraCode: String,
    synonyms: [String],
    otherCommonNames: [String],
    kingdom: String,
    phylum: String,
    taxclass: String,
    taxorder: String,
    family: String,
    genus: String,
    informalTaxonomy: String,
    infraspecies: Boolean,
    completeDistribution: Boolean,
    taxonomicComments: String
  },
  gRank: String
})

module.exports = mongoose.model('Bird', BirdSchema)
//https://explorer.natureserve.org/api-docs/ for more about where I got these from