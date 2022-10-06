const SearchTag = ({ filter, onClick }) => {

    const styling = {
        outerBox: {
            display: 'flex',
            alignItems: 'center',
            height: '45px',
            backgroundColor: '#F0E7F5',
            margin: '7px 15px',
            padding: '5px 5px 5px 0'
        },
        image: {
            height: '35px',
            backgroundColor: 'rgba(255,255,255, 0.8)',
            padding: '10px',
            marginRight: '5px',
            opacity: '0.6',
            cursor: 'pointer'
        },
        words: {
            padding: '0 10px',
            textAlign: 'center',
            // fontFamily: 'Impact'
        }
    }

    const addFilterStyle = {
        ...styling,
        outerBox: { ...styling.outerBox, backgroundColor: '#E7ECF5' }
    }

    const removeTag = tag => {
        console.log('ok')
    }

    return (
        <div style={filter === 'Add a Filter' ? addFilterStyle.outerBox : styling.outerBox}>
            <img style={styling.image} src={require('../images/close_FILL0_wght400_GRAD0_opsz48.png')} onClick={() => onClick(filter)} />
            <span style={styling.words}>{filter}</span>
        </div>
    )
}

export default SearchTag