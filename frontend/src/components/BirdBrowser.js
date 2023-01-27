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
    const state = useLocation()
    const screenMode = useScreenModeContext()

    const styling = {
        outer: {
            width: '100%'
        }
    }
    console.log('loaded teh birds section', new Date().toLocaleTimeString())


    useEffect(() => {
        console.log('getting da birds', new Date().toLocaleTimeString())

        const getBirds = async () => {
            const birdsFromServer = await fetchBirds()
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
            <div>
                <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SearchTags tagColor='#F0E7F5' />
                </section>

                <BirdsGlossary cladisticData={cladisticData} setCladisticData={setCladisticData} />
            </div>
        </div>
    )
}

export default BirdBrowser