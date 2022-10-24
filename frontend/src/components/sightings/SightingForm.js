import React, { useState } from "react"

const SightingForm = ({ birdId, addNewSighting, showForm }) => {

    const styling = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: 'fit-content',
            // minimumWidth: '50%',
            margin: '30px',
            backgroundColor: 'rgb(217, 230, 234)',
            borderRadius: '8px',
            padding: '16px'
        },
        inner: {
            margin: '16px 0'
        },
        notes: {
            height: '170px',
            minWidth: '400px'
        }
    }

    const [input, setInput] = useState({ notes: '', file: React.createRef() })
    const [useLocation, setUseLocation] = useState(false)

    const handleInputChange = e => {
        const [name, value] = [e.target.name, e.target.value]
        setInput({ ...input, [name]: value })
    }

    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                pos = {latitude: pos.coords.latitude, longitude: pos.coords.longitude}
                submitEntry(pos)
            })
        } else {
            submitEntry()
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (useLocation) {
            await getLocation()
        }
        else
            await submitEntry()
    }

    const submitEntry = async (location = {}) => {
        const formData = new FormData()
        formData.append('birdFile', input.file.current.files[0])
        formData.append('notes', input.notes)
        formData.append('birdId', birdId)
        if (location) {
            formData.append('location', JSON.stringify(location))
        }
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

                <label style={styling.inner}>
                    <input name='useLocation' type='checkbox' onChange={e => setUseLocation(e.target.checked)} />
                    <span>Save your location to this sighting</span>
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