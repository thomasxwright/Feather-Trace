import React from 'react'

const FullBird = ({ data }) => {
    const styling = {
        // border: '3px solid rgb(217, 230, 234)'
    }
    return (
        <div style={styling}>
            {data.commonName}
            <img src={data.images[0]} style={{ width: '30%' }} />
            <ul style={{ listStyle: 'none' }}>
                {data.generalDescription.map((paragraph, i) => (
                    <li key={i}>
                        <p>{paragraph}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FullBird