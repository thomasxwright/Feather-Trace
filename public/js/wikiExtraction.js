//functions used to scrape wikipedia for data, then print and organize the data, and place into the database.
import { InfoSegment } from './wikiInfoSegment.js'
import { BirdObj } from './BirdObj.js'


// -------------------METHODS TO PRINT BIRD DATA-----------

export async function printDataFromBirdClick(event) {
    const searchQuery = event.target.innerText.trim()
    try {
        const birdObj = await getBirdObjByCommonName(searchQuery)
        birdObj.printBirdData()
    } catch (err) {
        console.log(err)
        alert("Couldn't extract and print the bird data")
    }
}

// Apply to an element containing a bird's commonName, it'll grab its DB object, parse it, and put it to the endpoint which will update the entry in the DB.
export async function parseBirdDataAndUpdateItsEntryInDB(event) {
    // printDataFromBirdClick(event)
    const searchQuery = event.target.innerText.trim()
    try {
        const birdObj = await getBirdObjByCommonName(searchQuery)
        // birdObj.printBirdData()
        const birdWikiDataObj = birdObj.output

        console.log(`Making the post call for ${birdObj.commonName}`)
        const response = await fetch('/birds/editBird', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(birdWikiDataObj)
        })
        const data = await response.json()
        console.log(data)
        // location.reload()
    } catch(err) {
        console.log(err)
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
                headingNames: birdObj.extractHeadings()
            }
            console.log(`bird headings for ${birdObj._data.primaryCommonName}`, birdObj.extractHeadings())
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

//plug in a bird's commonName, get its object.
async function getBirdObjByCommonName(searchQuery) {
    try {
        const bird = await fetch('/birds/' + searchQuery)
        const result = await bird.json()
        console.log(`found this bird: ${result.commonName}`)
        return new BirdObj(result)
    } catch (err) {
        console.log(err)
    }
}

//plug in a bird's wikiId, get its object.
async function getBirdObjByWikiUrl(searchQuery) {
    try {
        const bird = await fetch('/birds/wiki/' + searchQuery)
        const result = await bird.json()
        console.log(`found this bird: ${result.commonName}`)
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

//plug in a wikiId, get a full wikipedia URL
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