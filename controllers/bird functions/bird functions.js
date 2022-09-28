class BirdObj {
    constructor(mongoDbBirdObj) {
        this._data = mongoDbBirdObj
    }
    _keyWords = {
        descriptionSegments: ['description', 'anatomy', 'appearance'],
        behaviorSegments: ['behavior', 'behaviour'],
        habitat: ['habitat'],
        gallery: ['gallery', 'images', 'photo gallery'],
        diet: ['diet', 'feed', 'food'],
        migration: ['migration', 'range', 'distribution'],
        breeding: ['breeding', 'reproduction'],
        predators: ['predators', 'threats', 'predation'],
        culture: ['culture', 'cultural', 'media'],
        taxonomy: ['taxonomy'],
        ecology: ['ecology'],
        conservation: ['conservation', 'status', 'preservation', 'protection'],
        human: ['human'],
        history: ['history']
    }
    get wikiId() {
        return this._data.wikiId
    }
    get wikiUrl() {
        return `https://en.wikipedia.org/wiki/${this.wikiId}`
    }
    get keyWords() {
        return _keyWords
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
        return this._data.infoSegments.map(segment => segment.title)
    }
    get output() {
        return {
            _id: this._data._id,
            commonName: this.commonName,
            images: this.images,
            calls: this.calls,
            infoSegments: this.infoSegments,
            wikiUrl: this.wikiUrl
        }
    }

    processInfoSegments() {
        this.infoSegments //an array: {title, info(array of strings)}
    }

    printBirdData() {
        // console.log('did this', this)
        // console.log(`Extracted this stuff for ${this.commonName}:`)
        // console.log('Bird images:', this.images)
        // const calls = this.calls
        // console.log('Bird calls:', calls.length ? calls[0] : 'none')
        // console.log(`Wiki link: ${this.getWikiUrl()}`)
        // // console.log('General description:', this.getGeneralDescription())
    }



}

module.exports = BirdObj