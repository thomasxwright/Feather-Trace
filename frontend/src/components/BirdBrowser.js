import { useState, useEffect } from 'react'
import BirdsGlossary from "./folders/BirdsGlossary"
import SearchTags from "./SearchTags"
import { BirdObj } from '../js/BirdObj.js'
import '../App.css';
import BackToTop from './BackToTop';
import { useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth'
import AccountSection from './Login/AccountSection';
import { useScreenModeContext } from '../auth/useScreenMode';

function BirdBrowser() {
    const [cladisticData, setCladisticData] = useState([])
    const [currentLevel, setCurrentLevel] = useState({})
    const [fetchingBirds, setFetchingBirds] = useState(false)
    const state = useLocation()
    const screenMode = useScreenModeContext()

    const styling = {
        outer: {
            width: '100%'
        }
    }

    useEffect(() => {
        console.log('getting da birds', new Date().toLocaleTimeString())

        const getBirds = async () => {
            setFetchingBirds(true)
            const birdsFromServer = await fetchBirds()
            if (currentLevel.order)
                setCurrentLevel({})
            setFetchingBirds(false)
            setCladisticData(birdsFromServer.cladisticBirdData)
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
            <AccountSection />
            <SearchTags tagColor='#F0E7F5' />
            <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {fetchingBirds && <img src={require('../images/quacksmall.gif')} alt='Please be patient!' style={{ maxHeight: '75px', position: 'absolute', top: screenMode === 'narrow' ? '20px' : '80px', zIndex: 3, padding: '77px 60px', background: 'radial-gradient(rgba(18, 16, 19, 0.6) 10%, rgba(18, 16, 19, 0.8) 43%, rgba(255, 255, 255, 0) 44%)' }} />}
                </div>
                <BirdsGlossary cladisticData={cladisticData} setCladisticData={setCladisticData} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
            </div>
        </div>
    )
}

export default BirdBrowser