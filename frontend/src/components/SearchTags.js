import SearchTag from "./SearchTag"

const SearchTags = ({ filters, onClick }) => {

    return (
        <>
            {filters.map(filter => {
                return <SearchTag filter={filter} onClick={onClick}/>
            })}
        </>
    )
}

export default SearchTags