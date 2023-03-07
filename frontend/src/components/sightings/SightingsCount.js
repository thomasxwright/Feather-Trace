const SightingsCount = ({ count }) => {
    const styling = {
        bold: {
            fontWeight: '600',
            fontSize: '140%'
        },
        big: {
            fontSize: '280%',
            fontWeight: '600'
        }
    }
    return (
        <div>
            <span style={styling.big}>{count}</span>
            <span style={styling.bold}> sighting{count !== 1 && 's'}</span>
        </div>
    )
}

export default SightingsCount