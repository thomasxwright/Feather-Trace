import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AddFilter from "./filterTags/AddFilter"
import CladeFilter from "./filterTags/CladeFilter"
import FilterTag from "./filterTags/FilterTag"
import IsLoggedFilter from "./filterTags/IsLoggedFilter"
import OpenCloseFilters from "./filterTags/OpenCloseFilters"
import PlaceFilter from "./filterTags/PlaceFilter"
import SearchTextFilter from "./filterTags/SearchTextFilter"
// import SearchTag from "./SearchTag"

const SearchTags = ({ setCladisticData, tagColor }) => {
    const search = new URLSearchParams(useLocation().search)
    const searches = {
        place: search.get('state'),
        // cladeType: search.get('cladeType'),
        // cladeInput: search.get('cladeInput'),
        isLogged: search.get('isLogged'),
        searchText: search.get('searchText') || ''
    }
    const [showFilters, setShowFilters] = useState(false)

    const [place, setPlace] = useState(searches.place)
    const [isLogged, setIsLogged] = useState(search.get('isLogged'))
    const [searchText, setSearchText] = useState(search.get('searchText') || '')

    console.log(searches.place, searches.isLogged, searches.searchText)
    console.log(place, isLogged, searchText)

    const unsubmittedSearchParams = place !== searches.place || isLogged !== searches.isLogged || searchText !== searches.searchText

    // const cladeObj = {cladeType: searches.cladeType, cladeInput: searches.cladeInput}
    // const [clade, setClade] = useState(cladeObj)
    // const [amTracking, setAmTracking] = useState(search.amTracking)

    function getQueryParamsFromTags() {
        // const cladeParams = clade.cladeType && clade.cladeInput ? clade : {}
        const params = {
            ...place && { state: place },
            // ...cladeParams,
            ...isLogged && { isLogged: isLogged },
            ...searchText && { searchText: searchText }
        }
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

            {/* <FilterTag tagColor={tagColor} innerTag={<CladeFilter clade={clade} setClade={setClade} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} /> */}
            {(showFilters || searchText) && <FilterTag tagColor={tagColor} setValue={setSearchText} innerTag={<SearchTextFilter searchText={searchText} setSearchText={setSearchText} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} />}
            {(showFilters || place) && <FilterTag tagColor={tagColor} setValue={setPlace} innerTag={<PlaceFilter place={place} setPlace={setPlace} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} />}
            {(showFilters || isLogged) && <FilterTag tagColor={tagColor} setValue={setIsLogged} innerTag={<IsLoggedFilter isLogged={isLogged} setIsLogged={setIsLogged} imgSrc='../../images/close_FILL0_wght400_GRAD0_opsz48.png' />} />}

            {/* {amTrackingShown && <amTrackingFilter amTracking={amTracking} setFilter={setAmTracking}/>} */}
            {/* <button>Send</button> */}


            {unsubmittedSearchParams && <Link to={`?${getQueryParamsFromTags()}`}>
                <AddFilter />
            </Link>
            }
            {/* <AddFilter /> */}
            <OpenCloseFilters showFilters={showFilters} setShowFilters={setShowFilters}/>
        </section>
    )
}

export default SearchTags