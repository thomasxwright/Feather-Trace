import React, { useState } from "react"

const SightingForm = ({ birdId, addNewSighting, showForm }) => {

    const styling = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            margin: '30px'
        },
        inner: {
            margin: '16px 0'
        },
        notes: {
            height: '170px',
            width: '60%'
        }
    }

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
            body: formData,
            credentials: 'include',
        }
        const result = await fetch('http://localhost:4000/sightings/submitSighting', requestOptions)
        const json = await result.json()
        addNewSighting(json)
        showForm(false)
    }


    return (
        <>
            <form onSubmit={handleSubmit} style={styling.form}>
                <label style={styling.inner}>
                    <div>Notes (optional):</div>
                    <textarea name='notes' value={input.notes} onChange={handleInputChange} style={styling.notes}></textarea>
                </label>

                <label style={styling.inner}>
                    <div>
                        Photo (optional):
                    </div>
                    <input name='file' type='file' ref={input.file} />
                </label>

                <div style={{ display: 'flex' }}>
                    <input type='submit' value='Submit' style={styling.inner} />
                    <button onClick={() => showForm(false)}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default SightingForm