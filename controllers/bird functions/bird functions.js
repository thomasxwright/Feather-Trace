class BirdObj {
    constructor(mongoDbBirdObj) {
        this._data = mongoDbBirdObj
        this._dom = new DOMParser().parseFromString(this._data.wikiHtml, 'text/html')
    }
    get wikiId() {
        return this._data.wikiId
    }
    get html() {
        return this._data.wikiHtml
    }
    get dom() {
        return this._dom
    }
    get commonName() {
        return this._data.commonName
    }

    getWikiUrl() {
        return `https://en.wikipedia.org/wiki/${this.wikiId}`
    }

    printBirdData() {

        console.log('did this', this)
        console.log(`Extracted this stuff for ${this.commonName}:`)
        console.log('Bird images:', this.getImages()[0])
        const cries = this.getCries()
        console.log('Bird cries:', cries.length ? cries[0] : 'none')
        console.log(`Wiki link: ${this.getWikiUrl()}`)
        // console.log('Heading sections', this.getHeadings())
        // console.log('info sections', this.printAllParagraphsWithHeadings())
        console.log('General description:', this.getGeneralDescription())
        this.printAllParagraphsWithHeadings()
        // console.log(getWikipediaHtmlFromWikipedia(getWikipediaUrl(this.wikiId)))
        // console.log('dom', [...this.dom.querySelectorAll('body > section p')].map(elem => elem.innerText.replace(/\[[0-9]*\]/g, '')))
    }

    saveDataToDatabase() {

    }


    // ---------------------PARSE THE DOM, EXTRACT THE STUFF---------
    // get array of images
    getImages() {
        return [...this.dom.images].map(image => {
            return {
                src: image.src.replace('220px', '1200px'),
                alt: image.alt
            }
        })
    }

    // get array of sound URLs
    getCries() {
        let audio = [...this.dom.querySelectorAll('audio source')]
        // console.log('audio elem is', audio)
        audio = audio.map(source => source.src)
        return audio
    }

    // plug in bird page DOM, get its description text
    getGeneralDescription() {
        return Array.from(this.dom.querySelectorAll('body > section:nth-of-type(1) p'))
            .map(elem => elem.innerText)
            .filter(elem => elem.includes('.'))
    }

    //plug in bird page DOM, get all the h2 titles' inner text
    getHeadings() {
        return Array.from(this.dom.querySelectorAll('h2,h3')).map(elem => elem.innerText)
    }

    // find all the segments and their labels, and print them.
    printAllParagraphsWithHeadings() {
        // get the headings and p tags, and store their tag names, content, and index
        const headingsAndParagraphs = Array.from(this.dom.querySelectorAll('h2,h3,p,li'))
            .map((elem, i) => { return { type: elem.tagName, text: elem.innerText, i: i } })

        //  identify all the headings's positions in the array
        let headingIndices = headingsAndParagraphs.filter(elem => elem.type === "H2" || elem.type === "H3")
            .map(elem => { return { index: elem.i, name: elem.text } })

        // starting at the end of the page, pop off an info segment. keep going til all segments are processed.
        let infoSegments = []
        for (let i = headingIndices.length - 1; i >= 0; i--) {
            const headingIndex = headingIndices[i].index
            const infoSegment = new InfoSegment()
            infoSegment.info = headingsAndParagraphs.splice(headingIndex + 1).map(segment => segment.text)
            infoSegment.title = headingsAndParagraphs.pop().text
            infoSegments.push(infoSegment)
        }
        infoSegments = infoSegments.filter(infoSegment => infoSegment.shouldBeRecorded()).reverse()
        infoSegments.forEach(infoSegment => {
            infoSegment.processInfoSegment()
            infoSegment.printTidily()
        })
    }

    processInfoSegment(segment) {

    }

    getBehavior() {

    }

    getBreeding() {

    }

    getConservation() {

    }

    getEcology() {

    }

    getDistribution() {

    }

    getHabitat() {

    }

    // in art, in culture, in popular culture, interesting facts
    getCulturalTrivia() {

    }

    getDiet() {

    }

    getExternalLinks() {

    }
}

module.exports = BirdObj