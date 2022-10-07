import SearchTag from "./SearchTag"

const SearchTags = ({ filters, onClick }) => {

    return (
        <>
            {filters.map((filter, i) => {
                return <SearchTag filter={filter} onClick={onClick} key={i}/>
            })}
        </>
    )
}

export default SearchTags