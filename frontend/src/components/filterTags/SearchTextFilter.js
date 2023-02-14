import React from 'react'

const SearchTextFilter = ({ searchText, setSearchText, handleSubmit }) => {

    const styling = {
        form: {
            display: 'flex',
            alignItems: 'stretch'
        }
    }

    return (
        <form onSubmit={handleSubmit} style={styling.form}>
            <input type='text' placeholder='search for a bird' value={searchText} onChange={e => setSearchText(e.target.value)} onFocus={e => e.target.select()} style={{ border: 'none', fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif", textAlign: 'center' }} />
        </form>
    )
}

export default SearchTextFilter