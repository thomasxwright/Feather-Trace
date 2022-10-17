import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AddSighting from './AddSighting';
import Sighting from './Sighting';

const Sightings = () => {
    const state = useLocation()
    const params = useParams()
    const [sightings, setSightings] = useState([])
    const [bird, setBird] = useState({})

    useEffect(() => {
        const getSightings = async () => {
            const birdInfo = await fetchFromLink(`/birds/id/${params['*']}`)
            const sightingsLogged = await fetchFromLink(state.pathname)
            setSightings(sightingsLogged)
            setBird(birdInfo)
        }
        console.log('useeffect')
        getSightings()
        console.log(bird, sightings)
    }, [])

    const addNewSighting = sighting => {
        setSightings(sightings.concat(sighting))
    }

    const hideDeletedSighting = (id) => {
        const newSightings = sightings.filter(sighting => sighting._id !== id)
        setSightings(newSightings)
    }

    const fetchFromLink = async (link) => {
        const res = await fetch(`http://localhost:4000${link}`)
        const data = await res.json()
        return data
    }

    const styling = {
        image: {
            width: '300px'
        },
        list: {
            listStyleType: 'none',
            margin: '0',
            padding: '0',
            width: '100%'
        }
    }

    return (
        <>
            <h1>Sightings of {bird.commonName}</h1>
            {bird.images && (<img style={styling.image} src={bird.images[0].src} alt={`photo of ${bird.commonName}`} />)}

            <AddSighting birdId={bird._id} addNewSighting={addNewSighting} />

            <ul style={styling.list}>
                {sightings.map(sighting => {
                    return (
                        <li key={sighting._id}>
                            <Sighting sighting={sighting} hideDeletedSighting={hideDeletedSighting} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Sightings