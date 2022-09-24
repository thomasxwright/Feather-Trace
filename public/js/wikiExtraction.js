//functions used to scrape wikipedia for data, then print and organize the data, and place into the database.
import { InfoSegment } from './wikiInfoSegment.js'

class BirdObj {
    constructor(mongoDbBirdObj) {
        this._data = mongoDbBirdObj
        this._dom = new DOMParser().parseFromString(this._data.wikiHtml, 'text/html')
    }
    get wikiId() {
        return this._data.wikiSurname
    }
    get html() {
        return this._data.wikiHtml
    }
    get dom() {
        return this._dom
    }

    getWikiUrl() {
        return `https://en.wikipedia.org/wiki/${this.wikiId}`
    }

    printBirdData() {
        console.log(`Extracted this stuff for ${this._data.primaryCommonName}:`)
        console.log('Bird images:', this.getImages()[0])
        const cries = this.getCries()
        console.log('Bird cries:', cries.length ? cries[0] : 'none')
        console.log(`Wiki link: ${this.getWikiUrl()}`)
        // console.log('Heading sections', this.getHeadings())
        console.log('info sections', this.getAllParagraphsWithHeadings())
        console.log('General description:', this.getGeneralDescription())
        this.printAllParagraphsWithHeadings()
        // console.log('dom', [...this.dom.querySelectorAll('body > section p')].map(elem => elem.innerText.replace(/\[[0-9]*\]/g, '')))
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
        const headingsAndParagraphs = Array.from(this.dom.querySelectorAll('h2,h3,p'))
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


// -------------------METHODS TO PRINT BIRD DATA-----------

export async function printWikipediaDataFromBirdClick(event) {
    const searchQuery = event.target.innerText.trim()
    try {
        const birdObj = await getBirdObjByPrimaryCommonName(searchQuery)
        birdObj.printBirdData()
    } catch (err) {
        console.log(err)
        alert("Couldn't search wikipedia")
    }
}

export async function printRandomBirdData() {
    try {
        const response = await fetch('/birds/random')
        const birdObj = new BirdObj(await response.json())
        birdObj.printBirdData()
    } catch (err) {
        console.log(err)
    }
}

//may be deprecated by printBirdHeadings
export async function printAllBirdHeaders() {
    try {
        const response = await fetch('/birds/getAllBirds')
        const birdJsonArr = response.json()

        birdJsonArr.forEach(bird => {
            const birdObj = new BirdObj(bird)
            const headingsObj = {
                url: birdObj.getWikiUrl(),
                headingNames: birdObj.getHeadings()
            }
            console.log(`bird headings for ${birdObj._data.primaryCommonName}`, birdObj.getHeadings())
        })
    } catch (err) {
        console.log(err)
    }
}

// This function prints a list of all the headings for all the pages.
export async function printBirdHeadings() {
    const allBirds = await getAllBirds()
    const allUniqueBirds = filterUniqueBirds(allBirds)
    const headings = new HeadingsObject()
    allUniqueBirds.forEach(bird => {
        headings.recordBirdHeadings(bird)
        // console.log(bird.wikiId, bird.html)
    })
    console.log(headings)
}


// ----------------GET A BIRD OBJECT---------------------

//plug in a bird's primaryCommonName, get its object.
async function getBirdObjByPrimaryCommonName(searchQuery) {
    try {
        const bird = await fetch('/birds/' + searchQuery)
        const result = await bird.json()
        console.log(`found this bird: ${result.primaryCommonName}`)
        return new BirdObj(result)
    } catch (err) {
        console.log(err)
    }
}

//plug in a bird's wikiSurname, get its object.
async function getBirdObjByWikiUrl(searchQuery) {
    try {
        const bird = await fetch('/birds/wiki/' + searchQuery)
        const result = await bird.json()
        console.log(`found this bird: ${result.primaryCommonName}`)
        return new BirdObj(result[0])
    } catch (err) {
        console.log(err)
    }
}

async function getAllBirds() {
    try {
        const response = await fetch('/birds/getAllBirds')
        const birdJsonArr = await response.json()
        const birdObjArr = birdJsonArr.map(bird => new BirdObj(bird))
        return birdObjArr
    } catch (err) {
        console.log(err)
    }
}


// ---------------GET BIRD HTML FROM WIKIPEDIA----------

//plug in a full wikiUrl, get HTML for its page
export async function getWikipediaHtmlFromWikipedia(wikiUrl) {
    try {
        const response = await fetch(wikiUrl)
        if (!response.ok)
            throw Error(response.status)
        const wikiResponse = await response.json()
        // const birdPageHtml = new DOMParser().parseFromString(wikiResponse.html, 'text/html')//.querySelector('#mw-content-text')
        return wikiResponse
    } catch (err) {
        console.log(err)
        alert("couldn't search wikipedia")
    }
}

//plug in a wikiSurname, get a full wikipedia URL
function getWikipediaUrl(wikiId) {
    return `https://en.wikipedia.org/wiki/${wikiId}`
}


// --------------PARSE THE DOM ITSELF, EXTRACT STUFF----------

// this.recordBirdHeadings(birdObj) => adds that bird's headings to this object's count and headings properties
export function HeadingsObject() {
    this.count = 0      //how many birds have been recorded here
    this.headings = {}  //name of a heading : tally (how many times) and urls to each bird with that heading
    this.recordBirdHeadings = birdObj => {
        this.count++
        birdObj.getHeadings().forEach(heading => {
            if (!this.headings[heading]) this.headings[heading] = { tally: 0, links: [] }
            this.headings[heading].tally++
            this.headings[heading].links.push(birdObj.getWikiUrl())
        })
    }
}

function filterUniqueBirds(birds) {
    var flags = {}
    var uniqueBirds = birds.filter(function (bird) {
        if (flags[bird.wikiId]) {
            return false
        }
        flags[bird.wikiId] = true
        return true
    })
    console.log(uniqueBirds.length, 'unique bird pages')
    return uniqueBirds
}