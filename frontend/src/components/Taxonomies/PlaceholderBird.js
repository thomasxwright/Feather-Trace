import { useState } from "react"
import { useScreenModeContext } from "../../auth/useScreenMode"
import BirdPhoto from "../BirdPhoto"
import { NavLink } from "react-router-dom"
import BirdCall from "../BirdCall"
import Taxonomy from "./Taxonomy"

export const PlaceholderBird = ({ bird }) => {
    const screenMode = useScreenModeContext()

    // modes: narrow, medium, desktop

    const styling = {
        inner: {
            display: 'flex',
            // alignItems: 'flex-start'
        },
        column: {
            display: 'flex',
            flexDirection: 'column'
        },
        hoverColor: 'rgb(217, 230, 234, 0.3)',
        backgroundColor: 'white',
        name: {
            margin: '20px 0',
            fontWeight: '550',
            fontSize: '24px'
        },
        link: {
            padding: '12px',
            backgroundColor: 'rgb(217, 230, 234, 0.3)',
            textDecoration: 'none'
        }
    }

    return (
        <section style={{width: '500px', margin: '5px', backgroundColor: 'white'}}>
            {bird.commonName}
            <img src={bird.images[0]} alt="burd" style={{width: '250px'}}/>
        </section>
    )
}

export default PlaceholderBird