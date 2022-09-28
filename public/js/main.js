import {parseBirdClickAndUpdateItsEntryInDB, sendAllBirdsToDB, printDataFromBirdClick, printRandomBirdData} from './wikiExtraction.js'
const deleteBtn = document.querySelectorAll('.del')
const birdNames = document.querySelectorAll('.bird .name')

Array.from(deleteBtn).forEach((el) => {
    // el.addEventListener('click', deleteTodo)
})

Array.from(birdNames).forEach(bird => {
    bird.addEventListener('click', printDataFromBirdClick)
})

document.querySelector('h4').addEventListener('click', async() => {
    console.log('ok')
    // const data = await fetch('/birds/editProperty')
})

document.querySelector('select').addEventListener('change', event => {
    console.log(event.target.value)
    const query = new URLSearchParams(event.target.value ? { state: event.target.value } : {})
    window.location.href = `/birds?${query.toString()}`
})

document.querySelector('h1').addEventListener('click', printRandomBirdData)