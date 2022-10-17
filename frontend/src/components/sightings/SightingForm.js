import React, { useState } from "react"

const SightingForm = ({ birdId, addNewSighting }) => {

    const [input, setInput] = useState({ notes: '', file: React.createRef() })

    const handleInputChange = e => {
        const [name, value] = [e.target.name, e.target.value]
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('birdFile', input.file.current.files[0])
        formData.append('notes', input.notes)
        formData.append('birdId', birdId)
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        const result = await fetch('http://localhost:4000/sightings/submitSighting', requestOptions)
        const json = await result.json()
        addNewSighting(json)
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Notes (optional)
                <textarea name='notes' value={input.notes} onChange={handleInputChange} ></textarea>
            </label>

            <label>
                Photo (optional)
                <input name='file' type='file' ref={input.file} />
            </label>

            <input type='submit' value='Submit' />
        </form>
    )
}

export default SightingForm