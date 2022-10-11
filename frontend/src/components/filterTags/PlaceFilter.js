import UsStateSelect from './UsStateSelect'

const PlaceFilter = ({ place, setPlace, setPlaceShown }) => {

    return (
        <div className='filter-tag'>
            <img src={require('../../images/close_FILL0_wght400_GRAD0_opsz48.png')} onClick={() => setPlaceShown(false)} />
            <UsStateSelect place={place} setPlace={setPlace}/>
        </div>
    )
}

export default PlaceFilter