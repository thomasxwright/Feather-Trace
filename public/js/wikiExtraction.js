
export async function getWikipediaDataFromBirdClick(event) {
    const searchQuery = event.target.innerText.trim()
    try {
        const key = await findBirdUrlUsingQuery(searchQuery)
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

export async function previewBirdWikiData() {
    try {
        const response = await fetch('/birds/random')
        const birdJson = await response.json()
        const birdDOM = new DOMParser().parseFromString(birdJson.wikiHtml, 'text/html')
        // const birdDOM = await getWikipediaDOM(bird1.wikiUrl)
        console.log(`birdDOM for ${birdJson.primaryCommonName}:`)

        console.log(getImages(birdDOM))
        console.log(getCries(birdDOM))
        // console.log([...birdDOM.images].map(img => img.src))
    } catch (err) {
        console.log(err)
    }
}

export async function getWikipediaDOM(wikiUrl) {
    try {
        const response = await fetch(wikiUrl)
        if (!response.ok)
            throw Error(response.status)
        const wikiResponse = await response.json()
        const birdPageHtml = new DOMParser().parseFromString(wikiResponse.html, 'text/html')//.querySelector('#mw-content-text')
        return birdPageHtml
    } catch (err) {
        console.log(err)
        alert("couldn't search wikipedia")
    }
}

export async function getBirdWikiLinksUsingMongoDb() {
    console.log("ok let's get this bird data")
    try {
        const birds = await fetch('/birds/testFunction')
        if (!birds.ok) {
            throw Error(birds.status)
        }
        const json = await birds.json()

        return json
    } catch(err) {
        console.log(err)
    }
}





export async function findBirdUrlUsingQuery(searchQuery) {
    try {
        const bird = await fetch('/birds/' + searchQuery)
        const result = await bird.json()
        console.log(result[0].wikiSurname)
        return result[0].wikiSurname
    } catch (err) {
        console.log(err)
    }
}

function getImages(doc) {
    return [...doc.images].map(image => {
        return {
            src: image.src,
            alt: image.alt
        }
    })
    //['0'].src.replace('220px', '1200px')
}

//returns an array of urls to 
function getCries(doc) {
    let audio = [...doc.querySelectorAll('audio source')]
    console.log('audio elem is', audio)
    audio = audio.map(source => source.src)
    return audio
}

function getDescription(doc) {

}