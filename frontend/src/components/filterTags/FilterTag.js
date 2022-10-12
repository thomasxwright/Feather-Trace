import { useState } from 'react'

const FilterTag = ({ innerTag }) => {

    const styling = {
        outerBox: {
            display: 'flex',
            alignItems: 'center',
            height: '45px',
            backgroundColor: 'aqua',
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

    const [showFilter, setShowFilter] = useState(true)

    function onClick(e) {
        console.log('clicked on the x +')
    }

    return showFilter ? (
        <div style={styling.outerBox}>
            <img style={styling.image} src={require('../../images/close_FILL0_wght400_GRAD0_opsz48.png')} onClick={() => setShowFilter(false)} />
            {innerTag}
        </div>
    ) : <></>
}

export default FilterTag