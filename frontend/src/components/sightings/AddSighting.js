import SightingForm from "./SightingForm"

const AddSighting = ({birdId}) => {

    const styling = {
        outer: {
            display: 'flex'
        }
    }

    return (
        <SightingForm birdId={birdId}/>
    )
}

export default AddSighting