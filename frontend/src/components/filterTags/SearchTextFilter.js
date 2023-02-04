import React from 'react'

const SearchTextFilter = ({ searchText, setSearchText }) => {
    return (
        <>
            <input type='text' placeholder='search for a bird' value={searchText} onChange={e => setSearchText(e.target.value)} style={{border: 'none', fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif", textAlign: 'center'}} />
        </>
    )
}

export default SearchTextFilter