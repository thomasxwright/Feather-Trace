import React from 'react'

const BirdGroup = ({ data, genusName }) => {
    // get one image for each subgroup.
    const images = data.map(bird => bird.images[0])

    return (

        <section>
            {genusName}
            <ul>
                {images.map((url, i) => (
                    <li key={i}>
                        <img src={url} width='80px'/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default BirdGroup