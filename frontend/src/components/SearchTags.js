import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AddFilter from "./filterTags/AddFilter"
// import CladeFilter from "./filterTags/CladeFilter"
import FilterTag from "./filterTags/FilterTag"
import IsLoggedFilter from "./filterTags/IsLoggedFilter"
import PlaceFilter from "./filterTags/PlaceFilter"
import SearchTextFilter from "./filterTags/SearchTextFilter"
// import SearchTag from "./SearchTag"

const SearchTags = ({ setCladisticData, tagColor }) => {
    const search = new URLSearchParams(useLocation().search)
    const searches = {
        place: search.get('state') || '',
        isLogged: search.get('isLogged') || '',
        searchText: search.get('searchText') || ''
        // cladeType: search.get('cladeType'),
        // cladeInput: search.get('cladeInput'),
    }
    const [place, setPlace] = useState(searches.place)
    const [isLogged, setIsLogged] = useState(searches.isLogged)
    const [searchText, setSearchText] = useState(searches.searchText)

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
            flexWrap: 'wrap',
            marginTop: '12px',
            justifyContent: 'center',
            width: '100%'
        }
    }


    return (
        <section style={styling.outer}>

            <FilterTag filterValue={place} resetFilterValue={() => setPlace('')}>
                <PlaceFilter place={place} setPlace={setPlace}/>
            </FilterTag>
            <FilterTag filterValue={searchText} resetFilterValue={() => setSearchText('')}>
                <SearchTextFilter searchText={searchText} setSearchText={setSearchText}/>
            </FilterTag>
            <FilterTag filterValue={isLogged} resetFilterValue={() => setIsLogged('')}>
                <IsLoggedFilter isLogged={isLogged} setIsLogged={setIsLogged}/>
            </FilterTag>

            {/* {amTrackingShown && <amTrackingFilter amTracking={amTracking} setFilter={setAmTracking}/>} */}

            {unsubmittedSearchParams && <Link to={`?${getQueryParamsFromTags()}`} className='react-link'>
                <AddFilter />
            </Link>
            }
        </section>
    )
}

export default SearchTags