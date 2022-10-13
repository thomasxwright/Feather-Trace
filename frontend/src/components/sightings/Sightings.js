import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const Sightings = () => {
    const state = useLocation()
    // console.log(state)
    const [sightings, setSightings] = useState([])

    useEffect(() => {
        const getSightings = async () => {
            const birdsLogged = await fetchSightings()
            setSightings(birdsLogged)
            console.log(sightings, birdsLogged)
            // birdsFromServer = birdsFromServer.map(birdJson => new BirdObj(birdJson))
            // console.log(birdsFromServer[3])
        }
        console.log('useeffect')
        getSightings()
        console.log(sightings, 'done')
    }, [])

    const fetchSightings = async () => {
        console.log(`http://localhost:4000${state.pathname}`)
        const res = await fetch(`http://localhost:4000${state.pathname}`)
        console.log('in fetchSightings')
        const data = await res.json()
        return data
    }


    return (
        <ul>
            {sightings.map(sighting => {
                return (
                    <li key={sighting} >
                        <div>{sighting.createdAt} {sighting.notes}</div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Sightings