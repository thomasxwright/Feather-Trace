import { useState } from "react"

const SightingForm = ({birdId}) => {

    const [input, setInput] = useState({notes: '', file: ''})

    const handleInputChange = e => {
        const [name, value] = [e.target.name, e.target.value]
        setInput({...input, [name]: value})
        console.log('value', value)
    } //input.file ends up as C:\fakepath\whatever.png

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('birdFile', input.file.replace("C:\\fakepath\\", ""))
        // console.log(input.file.replace("C:\\fakepath\\", ""))
        console.log('formData has', formData.getAll('birdFile'))
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...input, birdId: birdId})
        }
        const result = await fetch('http://localhost:4000/sightings/submitSighting', formData, requestOptions)
        const json = await result.json()
        console.log('finished uploading. returned json:', json)
    }





    return (
        <form onSubmit={handleSubmit}>              {/* enctype="multipart/form-data" */}
            <label>
                Notes (optional)
                <textarea name='notes' value={input.notes} onChange={handleInputChange} ></textarea>
            </label>

            <label>
                Photo (optional)
                <input name='file' type='file' value={input.file} onChange={handleInputChange} />
            </label>

            <input type='submit' value='Submit'/>
        </form>
    )
}

export default SightingForm