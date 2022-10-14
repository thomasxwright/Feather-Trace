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
            const birdInfo = await fetchSightings(`/birds/id/${params['*']}`)
            const sightingsLogged = await fetchSightings(state.pathname)
            setSightings(sightingsLogged)
            setBird(birdInfo)
            // console.log(birdInfo, bird)
            // birdInfo = new BirdObj(birdInfo)
        }
        console.log('useeffect')
        getSightings()
        console.log(bird, sightings)
    }, [])

    const fetchSightings = async (link) => {
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
            {/* <div style={styling.grid}>
                <div style={{ ...styling.gridItem, gridColumn: 'span 1' }}>lorjlsijls efi ooooo</div>
                <div style={styling.gridItem}>boobear</div>
                <div style={styling.gridItem}>quash</div>
                <div style={styling.gridItem}>quash</div>
                <div style={styling.gridItem}>quash</div>
                <div style={{ ...styling.gridItem, gridColumn: 'span 3' }}>quash</div>
                <div style={styling.gridItem}>quash bleebo</div>
            </div> */}


            {/* <div style={styling.grid}>
                {sightings.map(sighting => <Sighting sighting={sighting} key={sighting._id}/>)}
            </div> */}

            <h1>Sightings of {bird.commonName}</h1>
            {bird.images && (<img style={styling.image} src={bird.images[0].src} alt={`photo of ${bird.commonName}`}/>)}
            <AddSighting birdId={bird._id}/>
            <ul style={styling.list}>
                {sightings.map(sighting => {
                    return (
                        <li key={sighting._id}>
                            <Sighting sighting={sighting} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Sightings