const InfoSegment = require("./InfoSegment")

class BirdObj {
    constructor(mongoDbBirdObj) {
        this._data = mongoDbBirdObj
    }
    _topics = [
        ['description', 'anatomy', 'appearance'],                     // descriptionSegments
        ['behavior', 'behaviour'],                                    // behaviorSegments
        ['habitat'],                                                  // habitat
        ['gallery', 'images', 'photo gallery'],                       // gallery
        ['diet', 'feed', 'food'],                                     // diet
        ['migration', 'range', 'distribution'],                       // migration
        ['breeding', 'reproduction', 'nesting'],                      // breeding
        ['predators', 'threats', 'predation'],                        // predators
        ['culture', 'cultural', 'media'],                             // culture
        ['taxonomy'],                                                 // taxonomy
        ['ecology'],                                                  // ecology
        ['conservation', 'status', 'preservation', 'protection'],     // conservation
        ['human'],                                                    // human
        ['history']                                                   // history
    ]
    get wikiId() {
        return this._data.wikiId
    }
    get generalDescription() {
        return this._data.generalDescription
    }
    get wikiUrl() {
        return `https://en.wikipedia.org/wiki/${this.wikiId}`
    }
    get species() {
        return this._data.scientificName.split(' ').slice(1).join(' ')
    }
    get topics() {
        return this._topics
    }
    get html() {
        return this._data.wikiHtml
    }
    get commonName() {
        return this._data.commonName
    }
    get images() {
        return this._data.images.map(image => image.src)
    }
    get calls() {
        return this._data.call.map(call => call.src)
    }
    get infoSegments() {
        return this._data.infoSegments
    }
    get output() {
        return {
            _id: this._data._id,
            commonName: this.commonName,
            order: this._data.speciesGlobal.taxorder,
            family: this._data.speciesGlobal.family,
            genus: this._data.speciesGlobal.genus,
            species: this.species,
            images: this.images,
            calls: this.calls,
            generalDescription: this.generalDescription,
            infoSegments: this.infoSegments,
            wikiUrl: this.wikiUrl
        }
    }

    processInfoSegments() {
        let segments = []
        let infoSegments = this.infoSegments.map(segment => new InfoSegment(segment.title, segment.info))
        let remainingSegments = Math.min(4, infoSegments.length)
        for (let topicGroup of this.topics) {
            if (remainingSegments === 0) break
            // find the index of a segment whose title includes one of the keywords for this topic.
            const segmentIndex = infoSegments.findIndex(segment => segment && segment.containsThisContent(topicGroup))
            if (segmentIndex !== -1) {
                segments.push(infoSegments[segmentIndex])
                delete infoSegments[segmentIndex]
                remainingSegments--
            }
        }
        infoSegments = infoSegments.filter(segment => segment)
        if (remainingSegments && this.infoSegments.length) {
            segments = segments.concat(infoSegments.slice(0, remainingSegments))
        }
        this._data.infoSegments = segments.map(segment => segment.output)
    }
}

module.exports = BirdObj