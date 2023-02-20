import React from 'react'

const RoundedBlock = ({ taxonomyBlock = false, children, stylingAdjustments = {}, handleClick = null }) => {
    const styling = {
        padding: `18px ${taxonomyBlock ? 18 + 4 : 18}px 18px 18px`,
        borderRadius: '25px',
        width: 'fit-content',
        position: 'relative',
        ...stylingAdjustments
    }

    return (
        <div style={styling} onClick={handleClick}>
            {children}
        </div>
    )
}

export default RoundedBlock