import {previewBirdWikiData} from './wikiExtraction.js'
const deleteBtn = document.querySelectorAll('.del')
const birdNames = document.querySelectorAll('.bird .name')

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo)
})

Array.from(birdNames).forEach(bird => {
    bird.addEventListener('click', previewBirdWikiData)
})

document.querySelector('select').addEventListener('change', event => {
    console.log(event.target.value)
    const query = new URLSearchParams(event.target.value ? { state: event.target.value } : {})
    window.location.href = `/birds?${query.toString()}`
})

document.querySelector('h1').addEventListener('click', previewBirdWikiData)

async function deleteTodo() {
    const todoId = this.parentNode.dataset.id
    try {
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function markComplete() {
    const todoId = this.parentNode.dataset.id
    try {
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function markIncomplete() {
    const todoId = this.parentNode.dataset.id
    try {
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}