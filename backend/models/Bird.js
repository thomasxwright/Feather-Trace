const { NationSchema } = require('../models/Nation')
const { InfoSegmentSchema } = require('./InfoSegment')
const { BirdCallSchema } = require('./BirdCall')
const { ImageSchema } = require('./Image')
const { SpeciesShorthandSchema } = require('./SpeciesShorthand')
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
  commonName: {
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
    class: String,
    order: String,
    family: String,
    genus: String,
    informalTaxonomy: String,
    infraspecies: Boolean,
    completeDistribution: Boolean,
    taxonomicComments: String
  },
  gRank: String,
  wikiId: String,
  wikiHtml: String,

  generalDescription: [String],
  images: [ImageSchema],
  call: [BirdCallSchema],
  infoSegments: {
    type: [InfoSegmentSchema],
    required: true
  },
  subspecies: [SpeciesShorthandSchema],
  parentSpecies: SpeciesShorthandSchema
})

BirdSchema.index({
  commonName: 'text',
  'speciesGlobal.otherCommonNames': 'text',
  'speciesGlobal.order': 'text',
  'speciesGlobal.family': 'text',
  'scientificName': 'text'
})

module.exports = mongoose.model('Bird', BirdSchema)
//https://explorer.natureserve.org/api-docs/ for more about where I got these from