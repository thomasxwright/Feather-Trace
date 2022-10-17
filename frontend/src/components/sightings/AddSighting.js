import SightingForm from "./SightingForm"

const AddSighting = ({birdId, addNewSighting}) => {

    const styling = {
        outer: {
            display: 'flex'
        }
    }

    return (
        <SightingForm birdId={birdId} addNewSighting={addNewSighting}/>
    )
}

export default AddSighting