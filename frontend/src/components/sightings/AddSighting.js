import { useEffect, useState } from "react"
import SightingForm from "./SightingForm"
import StartNewSighting from "./StartNewSighting"

const AddSighting = ({ birdId, addNewSighting, sightings }) => {

    const [showSightingForm, setShowSightingForm] = useState(sightings.length === 0)
    
    useEffect(() => {
      setShowSightingForm(sightings.length === 0)
    })
    

    const showForm = (value) => {
        setShowSightingForm(value)
    }
    const styling = {
        outer: {
            display: 'flex'
        }
    }

    return (
        showSightingForm ?
            <SightingForm birdId={birdId} addNewSighting={addNewSighting} showForm={showForm}/>
            :
            <StartNewSighting showForm={showForm}/>
    )
}

export default AddSighting