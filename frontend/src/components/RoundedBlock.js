import React from 'react'

const RoundedBlock = ({ taxonomyBlock = false, children, stylingAdjustments = {}, handleClick = null, hideScroll=false, color = null }) => {
    const styling = {
        padding: `18px ${taxonomyBlock ? 18 + 4 : 18}px 18px 18px`,
        borderRadius: '25px',
        width: 'fit-content',
        position: 'relative',
        ...color !== null & {backgroundColor: color},
        ...stylingAdjustments
    }

    return (
        <div style={styling} onClick={handleClick} className={hideScroll ? 'scroll-overflow' : ''}>
            {children}
        </div>
    )
}

export default RoundedBlock