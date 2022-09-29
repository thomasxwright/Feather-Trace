import { parseBirdClickAndUpdateItsEntryInDB, sendAllBirdsToDB, printDataFromBirdClick, printRandomBirdData } from './wikiExtraction.js'
const deleteBtn = document.querySelectorAll('.del')
const birdNames = document.querySelectorAll('.bird .name')

Array.from(deleteBtn).forEach((el) => {
    // el.addEventListener('click', deleteTodo)
})

Array.from(birdNames).forEach(bird => {
    bird.addEventListener('click', printDataFromBirdClick)
})

document.querySelector('h4').addEventListener('click', async () => {
    console.log('ok')
    // const data = await fetch('/birds/editProperty')
})

document.querySelector('select#state-select').addEventListener('change', event => {
    runFilter()
})

const cladeInput = document.querySelector('select#clade-select + input')
document.querySelector('select#clade-select').addEventListener('change', event => {
    runFilter()
})


function runFilter() {
    const queryObj = {}
    const state = document.querySelector('select#state-select')
    const clade = document.querySelector('select#clade-select')
    if (state)
        queryObj.state = state.value
    if (clade.value && cladeInput.value) {
        queryObj.cladeType = clade.value
        queryObj.cladeInput = cladeInput.value
    }
    const query = new URLSearchParams(queryObj)
    window.location.href = `/birds?${query.toString()}`
}

document.querySelector('h1').addEventListener('click', printRandomBirdData)