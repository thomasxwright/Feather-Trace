const OpenCloseFilters = ({ showFilters, setShowFilters }) => {

    return (
        <div onClick={() => setShowFilters(!showFilters)}>
            <span >
                {showFilters ? 'Leave filters alone' : 'Change filters'}
            </span>
        </div>
    )
}

export default OpenCloseFilters