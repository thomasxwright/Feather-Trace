import React from 'react'

const Button = ({ text, onClick }) => {

    const styling = {
        border: 'none',
        borderRadius: '4px',
        padding: '8px',
        fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif"
    }

    return (
        <button style={styling} onClick={onClick}>{text}</button>
    )
}

export default Button