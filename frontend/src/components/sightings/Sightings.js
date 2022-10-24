import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AddSighting from './AddSighting';
import Sighting from './Sighting';
import useAuth from '../../auth/useAuth';
import SightingsCount from './SightingsCount';

const Sightings = () => {
    const { user } = useAuth();

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
        const res = await fetch(`http://localhost:4000${link}`, {credentials: 'include'})
        const data = await res.json()
        return data
    }

    const styling = {
        image: {
            width: '300px',
            marginRight: '50px'
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
            <div style={{ display: 'flex' }}>
                {bird.images && (<img style={styling.image} src={bird.images[0].src} alt={`photo of ${bird.commonName}`} />)}
                <section>
                    <h1>{bird.commonName}</h1>
                    <SightingsCount count={7}/>
                </section>
            </div>

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