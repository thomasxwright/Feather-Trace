import SightingForm from "./SightingForm"
import StartNewSighting from "./StartNewSighting"

const AddSighting = ({ birdId, addNewSighting, sightings, showSightingForm, setShowSightingForm }) => {

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