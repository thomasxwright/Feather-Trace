import { useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AddSighting from './AddSighting';
import Sighting from './Sighting';
import SightingsCount from './SightingsCount';
import { ThemeContext } from '../../utils/ThemeContextManagement'
import { useScreenModeContext } from '../../utils/useScreenMode'

const Sightings = () => {
    const { theme } = useContext(ThemeContext)
    const screenMode = useScreenModeContext()

    const styling = {
        image: {
            width: '55%',
            marginRight: '8px',
            maxWidth: '300px'
        },
        list: {
            listStyleType: 'none',
            margin: '0',
            padding: '0',
            width: '100%'
        },
        outer: {
            width: '100%',
            color: theme.text,
            // padding: screenMode === 'narrow' ? '0 10px' : '0'
        }
    }

    const state = useLocation()
    const params = useParams()
    const [sightings, setSightings] = useState([])
    const [bird, setBird] = useState({})
    const [showSightingForm, setShowSightingForm] = useState(false)

    useEffect(() => {
        const getSightings = async () => {
            const birdInfo = await fetchFromLink(`/birds/id/${params['*']}`)
            const sightingsLogged = await fetchFromLink(state.pathname)
            setSightings(sightingsLogged)
            setBird(birdInfo)
            if (sightingsLogged.length === 0)
                setShowSightingForm(true)
        }
        getSightings()
    }, [])

    const addNewSighting = sighting => {
        setSightings(sightings.concat(sighting))
    }

    const hideDeletedSighting = (id) => {
        const newSightings = sightings.filter(sighting => sighting._id !== id)
        setSightings(newSightings)
    }

    const fetchFromLink = async (link) => {
        const res = await fetch(link, { credentials: 'include' })
        const data = await res.json()
        return data
    }



    return (
        <div style={styling.outer}>
            {screenMode === 'narrow' ?
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1 style={{ margin: '8px 0', fontSize: '1.3em' }}>{bird.commonName}</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {bird.images && bird.images.length > 0 && (<img style={styling.image} src={bird.images[0].src} alt={`photo of ${bird.commonName}`} />)}
                        <SightingsCount count={sightings.length} />
                    </div>
                </div>
                :
                <div style={{ display: 'flex' }}>
                    {bird.images && bird.images.length > 0 && (<img style={styling.image} src={bird.images[0].src} alt={`photo of ${bird.commonName}`} />)}
                    <section>
                        <h1>{bird.commonName}</h1>
                        <SightingsCount count={sightings.length} />
                    </section>
                </div>
            }

            <AddSighting birdId={bird._id} addNewSighting={addNewSighting} sightings={sightings} showSightingForm={showSightingForm} setShowSightingForm={setShowSightingForm} />

            <ul style={styling.list}>
                {sightings.map(sighting => {
                    return (
                        <li key={sighting._id}>
                            <Sighting sighting={sighting} hideDeletedSighting={hideDeletedSighting} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sightings