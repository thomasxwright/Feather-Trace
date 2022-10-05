// This file is basically outdated, but was originally the playground where I made functions that found the WikiIds and pulled the HTML from those pages, and did a bit of basic parse-previewing of that HTML.

const Bird = require('./models/Bird')
const mongoose = require('mongoose')


async function attachBirdUrlsToDatabase() {
    // const birds = [{ name: 'tufted titmouse', id: 'dkj' }, { name: 'northern cardinal', id: 'dlfsij' }, { name: 'chickadee', id: 'idlsfj' }]
    const birds = await getBirdsFromDatabase()
    // birds.forEach(bird => {
    //     setTimeout(findBirdUrlUsingQuery, 20000, bird)
    // })

    const length = birds.length
    let i = 0    //started using scientific names at 220
    const interval = setInterval(() => {
        // time is up
        if (i === 0) {
            clearInterval(interval);
        }
        console.log(`${birds[i].name}               ${birds[i].scientificName}                  #${i} looking...`)
        findBirdUrlUsingQuery(birds[i])
        i--
    }, 4521);

}


async function grabWikiHtml() {
    const birds = await getBirdsFromDatabase()


    const length = birds.length - 1
    let i = 1111;
    const interval = setInterval(() => {

        if (i === length){
            console.log(". . . I'M FINISHED!!")
            clearInterval(interval)
        }
        console.log(`---#${i}:`)
        console.log(` ${birds[i].name}       ${birds[i].scientificName}    grabbing...#${i}`)
        extractBirdWikiPage(birds[i].wikiSurname, birds[i].id)
        i++
    }, 4298)
}

//saves the wiki page to the db given the wiki url and the birdId in my db
async function extractBirdWikiPage(wikiSurname, birdId) {
    const response = await fetch(`https://en.wikipedia.org/w/rest.php/v1/page/${wikiSurname}/with_html`)
    if (!response.ok)
        throw Error(response.status)
    const wikiResponse = await response.json()
    const html = wikiResponse.html

    try {
        await Bird.findOneAndUpdate({ uniqueId: birdId }, {
            wikiHtml: html
        })
        console.log(`  html added for ${wikiSurname}    ${birdId}`)
    } catch (err) {
        console.log(err)
    }
}



async function getBirdsFromDatabase() {
    try {
        const birds = await Bird.find({}).lean()
        const birdNames = [...birds].map(bird => {
            return {
                name: bird.primaryCommonName,
                scientificName: bird.scientificName,
                id: bird.uniqueId,
                wikiSurname: bird.wikiSurname
            }
        })
        // console.log(birdNames.slice(0,12))
        return birdNames
    } catch (err) {
        console.log(err)
    }
}

async function getWikipediaData(birdName) {
    try {
        const key = await findBirdUrlUsingQuery(birdName)
        const birdUrl = `https://en.wikipedia.org/w/rest.php/v1/page/${key}/with_html`
        const response = await fetch(birdUrl)
        if (!response.ok)
            throw Error(response.status)
        const wikiResponse = await response.json()
        const birdPageHtml = new DOMParser().parseFromString(wikiResponse.html, 'text/html')
        const parsedThing = getImage(birdPageHtml)
        console.log(birdPageHtml)
        console.log(parsedThing)
    } catch (err) {
        console.log(err)
        alert("Couldn't search wikipedia")
    }
}

async function findBirdUrlUsingQuery(searchQuery) {
    // console.log('gonna search', searchQuery)
    const endpoint = `https://en.wikipedia.org/w/rest.php/v1/search/page?limit=1&q=${searchQuery.scientificName}`
    const response = await fetch(endpoint)
    let surname
    try {
        if (!response.ok) {
            throw Error(response.status)
        }
        const json = await response.json()
        surname = json.pages[0].key
    } catch (err) {
        console.log(`-------ERROR------${searchQuery.commonName} -----${searchQuery.scientificName}}--------`)
        markAsProblematic(searchQuery)
        return
    }

    try {
        await Bird.findOneAndUpdate({ uniqueId: searchQuery.id }, {
            wikiSurname: surname
        })
        console.log(`${surname}      wiki surname found`)
    } catch (err) {
        console.log(err)
    }

    // console.log(json.pages[0].key)
    return surname
}


async function markAsProblematic(bird) {
    try {
        await Bird.findOneAndUpdate({ uniqueId: bird.id }, {
            wikiSurname: 'unfound'
        })
        console.log(`marked unfound:  ${bird.name}`)
    } catch (err) {
        console.log(err)
    }
}

async function findMismatchedBirds() {
    const birds = await getBirdsFromDatabase()
    const badBirds = birds.filter(bird => bird.wikiSurname === 'unfound')
    badBirds.forEach(bird => {
        console.log(`${bird.name}         ${bird.scientificName}`)
        console.log(bird.wikiSurname)
        console.log('-')
    })
    console.log('done')
}

async function getBirdImages(req, res) {
    console.log('in the back end')
    const birds = await Bird.find({}).lean()
    console.log('got da birds')
    birdImgData = birds.map (bird => {
        // const url = getImage(new DOMParser().parseFromString(bird.wikiHtml, 'text/html'))
        return {
            name: bird.primaryCommonName,
            wikiUrl: `https://en.wikipedia.org/w/rest.php/v1/page/${bird.wikiSurname}/with_html`,
        }
    })
    res.json(birdImgData)
}

function getImage(doc) {
    return doc.images['0'].src.replace('220px', '1200px')
}

module.exports = getBirdImages