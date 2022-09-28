import { InfoSegment } from './wikiInfoSegment.js'
// This object interprets HTML from a wikipedia page into a complete BirdObj. Its input is a MongoDB entry that already contains the wikipedia HTML as a property.
// Once you've extracted and parsed that data, you can put it into the back-end as BirdObj.output using a POST or PUT.
export class BirdObj {
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
    get output() {
        return {
            commonName: this.commonName,
            uniqueId: this._data.uniqueId,
            generalDescription: this.extractGeneralDescription(),
            images: this.extractImages(),
            call: this.extractCalls(),
            infoSegments: this.extractInfoSegments()
        }
    }

    getWikiUrl() {
        return `https://en.wikipedia.org/wiki/${this.wikiId}`
    }

    printBirdData() {
        console.log(`Extracted this stuff for ${this.commonName}:`)
        console.log('Bird images:', this.extractImages())
        const calls = this.extractCalls()
        console.log('Bird calls:', calls.length ? calls[0] : 'none')
        console.log(`Wiki link: ${this.getWikiUrl()}`)
        // console.log('Heading sections', this.getHeadings())
        // console.log('info sections', this.printAllParagraphsWithHeadings())
        console.log('General description:', this.extractGeneralDescription())
        console.log(this.extractInfoSegments())
        console.log(this.html)
        // console.log(getWikipediaHtmlFromWikipedia(getWikipediaUrl(this.wikiId)))
    }

    async saveDataToDatabase() {
        try {
            console.log(`making the put call for ${this.commonName}`)
            const response = await fetch('/birds/editBird', {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.output)
            })
            if (!response.ok) {
                throw new Error('oh nooo')
            }
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err)
        }
    }


    // ---------------------PARSE THE DOM, EXTRACT THE STUFF---------
    // get array of images
    extractImages() {
        return [...this.dom.images]
            .filter(image => !image.src.toLowerCase().includes('.svg') && !image.src.toLocaleLowerCase().includes('.png'))
            .map(image => {
                return {
                    src: image.src.replace(/[0-9]+px/, '800px'),
                    alt: image.alt
                }
            })
    }

    // get array of sound URLs
    extractCalls() {
        let audio = [...this.dom.querySelectorAll('audio source')]
            // Some wikipedia pages include "spoken word" versions that we must filter out. these segments are inside elements with the class "spoken-wikipedia-files"
            .filter(call => !call.closest('.spoken-wikipedia-files'))
            .map(source => { return { src: source.src, fileType: source.type } })
        return audio
    }

    extractGeneralDescription() {
        return Array.from(this.dom.querySelectorAll('body > section:nth-of-type(1) > p'))
            .map(elem => elem.innerText.replace(/\[([0-9]+|citation needed)\]/g, ''))
            .filter(elem => elem.includes('.')) //bc some elements are little irrelevant fragments, only grab sentences.
    }

    //get all the h2 and h3 titles' inner text
    extractHeadings() {
        return Array.from(this.dom.querySelectorAll('h2,h3')).map(elem => elem.innerText)
    }

    // find all the infoSegments, return them as an object {title: String, info: [String]}
    extractInfoSegments() {
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
        infoSegments = infoSegments.map(infoSegment => {
            infoSegment.processInfoSegment()
            return infoSegment.output
        })
        return infoSegments
    }


    // ------------TO DO: implement these extractors------------------
    // async extractEndangeredStatus() {
    //     // nothing, do this later though
    // }

    // async extractImageGallery() {
    //     // nothing, do later though
    // }

    // async extractFurtherReading() {
    //     // nothing, do later though
    // }

}