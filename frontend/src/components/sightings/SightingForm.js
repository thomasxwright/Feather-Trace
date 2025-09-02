import { useState, createRef, useContext } from "react"
import { ThemeContext } from '../../utils/ThemeContextManagement'
import { useScreenModeContext } from "../../utils/useScreenMode"

const SightingForm = ({ birdId, addNewSighting, showForm }) => {

    const { theme } = useContext(ThemeContext)
    const screenMode = useScreenModeContext()

    const styling = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            padding: screenMode === 'narrow' ? '8px' : '16px',
            margin: '4px',
            backgroundColor: theme.taxonomies.genus,
            borderRadius: '18px',
        },
        inner: {
            margin: '16px 0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        notes: {
            height: '170px',
            backgroundColor: theme.background,
            color: theme.text,
            border: 'none',
            fontFamily: "'Roboto Slab', 'Roboto', 'Helvetica Neue', sans-serif",
            fontSize: '0.9em'
            // width: 'calc(100%)'
            // minWidth: '400px'
        },
        button: {
            backgroundColor: theme.filters.applyButton,
            color: theme.text,
            cursor: 'pointer'
        }
    }

    const [input, setInput] = useState({ notes: '', file: createRef() })
    const [useLocation, setUseLocation] = useState(false)

    const handleInputChange = e => {
        const [name, value] = [e.target.name, e.target.value]
        setInput({ ...input, [name]: value })
    }

    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                pos = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
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
        try {
            const result = await fetch('/sightings/submitSighting', requestOptions)
            if (result.status === 400) {
                throw new Error(result.statusText)
            }
            const json = await result.json()
            addNewSighting(json)
            showForm(false)
        }
        catch (e) {
            alert(e)
        }
    }


    return (
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

            <label >
                <input name='useLocation' type='checkbox' onChange={e => setUseLocation(e.target.checked)} />
                <span>Save your location to this sighting</span>
            </label>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input style={{ ...styling.button, border: 'none', borderRadius: '4px', padding: '16px', margin: '4px', fontSize: '1.2em', fontFamily: "'Roboto Slab', 'Roboto', 'Helvetica Neue', sans-serif" }} type='submit' value='Record sighting' />
                {/* <button style={styling.button} onClick={() => showForm(false)}>Cancel</button> */}
            </div>
        </form>
    )
}

export default SightingForm