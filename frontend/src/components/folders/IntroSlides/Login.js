import React from 'react'
import Slide from './Slide'
import recording from '../../../images/recording.png'

const Login = () => {

    const styling = {
        text: {
            margin: '8px 0'
        },
        image: {
            width: '100%',
            maxWidth: '400px'
        }
    }
    return (
        <Slide>
            <img src={recording} alt='bird sighting recording feature' style={styling.image} />
            <p style={styling.text}>If you log in, you can record your bird sightings, including notes, photos, locations, and dates.</p>
        </Slide>
    )
}

export default Login