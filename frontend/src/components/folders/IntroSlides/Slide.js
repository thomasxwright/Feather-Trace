import React from 'react'

const Slide = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </div>
    )
}

export default Slide