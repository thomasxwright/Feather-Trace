import { parseBirdClickAndUpdateItsEntryInDB, sendAllBirdsToDB, printDataFromBirdClick, printRandomBirdData } from './wikiExtraction.js'
const deleteBtn = document.querySelectorAll('.del')
const birdNames = document.querySelectorAll('.bird .name')

Array.from(deleteBtn).forEach((el) => {
    // el.addEventListener('click', deleteTodo)
})

// Array.from(birdNames).forEach(bird => {
//     bird.addEventListener('click', printDataFromBirdClick)
// })

document.querySelector('h4#run-query').addEventListener('click', runQuery)

const cladeInput = document.querySelector('select#clade-select + input')

function runQuery() {
    const state = document.querySelector('select#state-select')
    const cladeType = document.querySelector('select#clade-select')
    const queries = {}
    if (cladeType.value && cladeInput.value) {
        queries['cladeType'] = cladeType.value
        queries['cladeInput'] = cladeInput.value
    }
    if (state.value)
        queries['state'] = state.value
    const query = new URLSearchParams(queries)
    window.location.href = `/birds?${query.toString()}`
}



document.querySelector('h1').addEventListener('click', printRandomBirdData)