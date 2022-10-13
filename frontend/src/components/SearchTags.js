import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AddFilter from "./filterTags/AddFilter"
import CladeFilter from "./filterTags/CladeFilter"
import FilterTag from "./filterTags/FilterTag"
import IsLoggedFilter from "./filterTags/IsLoggedFilter"
import PlaceFilter from "./filterTags/PlaceFilter"
// import SearchTag from "./SearchTag"

const SearchTags = ({ setCladisticData, tagColor }) => {
    const search = new URLSearchParams(useLocation().search)
    const searches = {
        place: search.get('state'),
        cladeType: search.get('cladeType'),
        cladeInput: search.get('cladeInput'),
        isLogged: search.get('isLogged')
    }
    const [place, setPlace] = useState(searches.place)
    const [isLogged, setIsLogged] = useState(search.get('isLogged'))

    const cladeObj = {cladeType: searches.cladeType, cladeInput: searches.cladeInput}
    const [clade, setClade] = useState(cladeObj)
    // const [amTracking, setAmTracking] = useState(search.amTracking)

    function getQueryParamsFromTags() {
        const cladeParams = clade.cladeType && clade.cladeInput ? clade : {}
        const params = {
            ...place && {state: place},
            ...cladeParams,
            ...isLogged && {isLogged: isLogged}
        }
        console.log(params)
        console.log(new URLSearchParams(params).toString())
        return new URLSearchParams(params).toString()
    }

    const styling = {
        outer: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    }


    return (
        <section style={styling.outer}>

            <FilterTag tagColor={tagColor} innerTag={<CladeFilter clade={clade} setClade={setClade} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} />
            <FilterTag tagColor={tagColor} innerTag={<PlaceFilter place={place} setPlace={setPlace} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} />
            <FilterTag tagColor={tagColor} innerTag={<IsLoggedFilter isLogged={isLogged} setIsLogged={setIsLogged} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} />

            {/* {amTrackingShown && <amTrackingFilter amTracking={amTracking} setFilter={setAmTracking}/>} */}
            {/* <button>Send</button> */}
            
            
            <Link to={`?${getQueryParamsFromTags()}`}>
                <AddFilter />
            </Link>
        </section>
    )
}

export default SearchTags