import UsStateSelect from './UsStateSelect'

const PlaceFilter = ({ place, setPlace }) => {

    return (
        <>
            <UsStateSelect place={place} setPlace={setPlace}/>
        </>
    )
}

export default PlaceFilter