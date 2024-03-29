import React from 'react'

const OverlayMessage = ({ children, setMessage }) => {

    const leaveDialog = () => {
        localStorage.setItem('veteran', 'true')
        setMessage(null)
    }

    const styling = {
        inactive: {
            backgroundColor: 'rgb(0 0 0 / 0.6)',
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: '0',
            cursor: 'pointer',
            zIndex: 4,
            display: 'flex',
            justifyContent: 'center'
        },
        window: {
            cursor: 'auto',
            width: '200px',
            height: '250px',
            backgroundColor: 'white',
            borderRadius: '0 0 8px 0'
        }
    }
    return (
        <div style={styling.inactive} onClick={leaveDialog}>
            {children}
        </div>
    )
}

export default OverlayMessage