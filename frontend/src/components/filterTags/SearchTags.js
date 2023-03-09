import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AddFilter from "./AddFilter"
import FilterTag from "./FilterTag"
import IsLoggedFilter from "./IsLoggedFilter"
import SearchTextFilter from "./SearchTextFilter"
import UsStateSelect from "./UsStateSelect"

const SearchTags = ({ setCladisticData, tagColor }) => {
    const navigate = useNavigate()
    const search = new URLSearchParams(useLocation().search)
    const searches = {
        place: search.get('state') || '',
        isLogged: search.get('isLogged') || '',
        searchText: search.get('searchText') || ''
    }
    const [place, setPlace] = useState(searches.place)
    const [isLogged, setIsLogged] = useState(searches.isLogged)
    const [searchText, setSearchText] = useState(searches.searchText)
    // const [amTracking, setAmTracking] = useState(search.amTracking)

    const unsubmittedSearchParams = place !== searches.place || isLogged !== searches.isLogged || searchText !== searches.searchText

    function getQueryParamsFromTags() {
        const params = {
            ...place && { state: place },
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

    const go = event => {
        event.preventDefault()
        navigate(`?${getQueryParamsFromTags()}`)
    }


    return (
        <section style={styling.outer}>

            <FilterTag filterValue={place} resetFilterValue={() => setPlace('')}>
                <UsStateSelect place={place} setPlace={setPlace} />
            </FilterTag>
            <FilterTag filterValue={searchText} resetFilterValue={() => setSearchText('')}>
                <SearchTextFilter searchText={searchText} setSearchText={setSearchText} handleSubmit={go} />
            </FilterTag>
            <FilterTag filterValue={isLogged} resetFilterValue={() => setIsLogged('')}>
                <IsLoggedFilter isLogged={isLogged} setIsLogged={setIsLogged} />
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