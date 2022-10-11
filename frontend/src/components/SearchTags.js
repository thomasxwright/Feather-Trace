import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AddFilter from "./filterTags/AddFilter"
import CladeFilter from "./filterTags/CladeFilter"
import PlaceFilter from "./filterTags/PlaceFilter"
import SearchTag from "./SearchTag"

const SearchTags = ({ setCladisticData }) => {
    const search = new URLSearchParams(useLocation().search)
    const searches = {
        place: search.get('state'),
        cladeType: search.get('cladeType'),
        cladeInput: search.get('cladeInput'),
        isLogged: search.get('isLogged')
    }
    const [placeShown, setPlaceShown] = useState(Boolean(searches.place))
    const [place, setPlace] = useState(searches.place)

    // const [isLoggedShown, setIsLoggedShown] = useState(search.get('isLogged') !== null)
    // const [isLogged, setIsLogged] = useState(search.get('isLogged'))


    const cladeObj = (searches.cladeType && searches.cladeInput) ? { cladeType: searches.cladeType, cladeInput: searches.cladeInput } : {cladeType: '', cladeInput: ''}
    const [clade, setClade] = useState(cladeObj)
    const [cladeShown, setCladeShown] = useState(Boolean(clade.cladeType && clade.cladeInput))
    
    // const [amTrackingShown, setAmTrackingShown] = useState(Boolean(search.amTracking))
    // const [amTracking, setAmTracking] = useState(search.amTracking)

    function getQueryParamsFromTags() {
        const cladeParams = clade.cladeType && clade.cladeInput ? clade : {}
        const params = { state: place,
            ...cladeParams,
            // isLogged: isLogged
        }
        return new URLSearchParams(params).toString()
    }


    return (
        <section>
            <Link to={`?${getQueryParamsFromTags()}`}>
                <AddFilter />
            </Link>

            {placeShown && <PlaceFilter place={place} setPlace={setPlace} setPlaceShown={setPlaceShown} />}
            {/* {isLoggedShown && <isLoggedFilter isLogged={isLogged} setFilter={setIsLogged}/>}
            {amTrackingShown && <amTrackingFilter amTracking={amTracking} setFilter={setAmTracking}/>} */}
            {cladeShown && <CladeFilter clade={clade} setClade={setClade} setCladeShown={setCladeShown}/>}
            <button>Send</button>
        </section>
    )
}

export default SearchTags