import { useState, useEffect, useContext } from 'react'
import BirdsGlossary from "./birdGroupings/BirdsGlossary"
import SearchTags from "./filterTags/SearchTags"
import '../App.css';
import { useLocation } from 'react-router-dom';
import { useScreenModeContext } from '../utils/useScreenMode';
import { ThemeContext } from '../utils/ThemeContextManagement';
import useAuth from '../utils/auth/useAuth'

function BirdBrowser() {
    const [cladisticData, setCladisticData] = useState({})
    const [currentLevel, setCurrentLevel] = useState({})
    const [fetchingBirds, setFetchingBirds] = useState(true)
    const [isFetchingFullData, setIsFetchingFullData] = useState(true)
    const state = useLocation()
    const screenMode = useScreenModeContext()
    const { authed, sightings } = useAuth()

    const { theme } = useContext(ThemeContext)
    const styling = {
        outer: {
            width: '100%',
            backgroundColor: theme.background,
            color: theme.text
        }
    }

    const stepIntoFirstDivergingTaxonomy = data => {
        setCurrentLevel({})
        const orders = Object.entries(data)
        const destination = {}
        if (orders.length !== 1)
            return false
        // There's only one order
        destination.order = orders[0][0]
        const families = Object.entries(orders[0][1])
        if (families.length !== 1) {
            setCurrentLevel(destination)
            return false
        }
        // There's only one family
        destination.family = families[0][0]
        const genuses = Object.entries(families[0][1])
        if (genuses.length !== 1) {
            setCurrentLevel(destination)
            return false
        }
        // There's only one genus. we don't need to go any deeper than here even if there's only one species in the genus.
        destination.genus = genuses[0][0]
        setCurrentLevel(destination)
        return true
    }

    useEffect(() => {
        console.log(new Date().toLocaleTimeString(), 'getting da birds')
        setIsFetchingFullData(true)

        const getBirds = async () => {
            setFetchingBirds(true)
            const birdsFromServer = await fetchBirds()
            const resultCladisticBirdData = birdsFromServer.cladisticBirdData
            console.log(new Date().toLocaleTimeString(), 'found birds:', resultCladisticBirdData)
            setCladisticData(resultCladisticBirdData)
            const needsAnotherLoad = stepIntoFirstDivergingTaxonomy(resultCladisticBirdData)
            setFetchingBirds(false)
        }
        getBirds()

    }, [state])

    const fetchBirds = async () => {
        const res = await fetch(`/birds${state.search}`, { credentials: 'include' })
        const data = await res.json()
        return data
    }

    return (
        <div style={styling.outer}>
            <SearchTags tagColor='#F0E7F5' />
            <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {fetchingBirds && <img src={require('../images/quacksmall.gif')} alt='Please be patient!'
                        style={{
                            maxHeight: '75px', position: 'absolute', top: screenMode === 'narrow' ? '20px' : '80px', zIndex: 3, padding: '77px 60px',
                            background: theme.dark ?
                                'radial-gradient(rgba(200, 192, 241, 0.1) 10%, rgba(200, 192, 241, 0.5) 43%, rgba(255, 255, 255, 0) 44%)'
                                :
                                'radial-gradient(rgba(18, 16, 19, 0.6) 10%, rgba(18, 16, 19, 0.8) 43%, rgba(255, 255, 255, 0) 44%)'
                        }}
                    />}
                </div>
                <BirdsGlossary cladisticData={cladisticData} setCladisticData={setCladisticData} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} fetchingBirds={fetchingBirds} setFetchingBirds={setFetchingBirds} isFetchingFullData={isFetchingFullData} setIsFetchingFullData={setIsFetchingFullData} sightings={sightings} />
            </div>
        </div>
    )
}

export default BirdBrowser