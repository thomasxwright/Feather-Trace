import { useState, useEffect } from 'react'
import BirdsGlossary from "./BirdsGlossary"
import SearchTags from "./SearchTags"
import { BirdObj } from '../js/BirdObj.js'
import '../App.css';
import BackToTop from './BackToTop';
import { useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth'
import GainAccess from './Login/GainAccess';
import SignOut from './Login/SignOut';
import AccountSection from './Login/AccountSection';

function BirdBrowser() {

    const { authed } = useAuth()
    
    const [cladisticData, setCladisticData] = useState([])
    const state = useLocation()
    
    useEffect(() => {
        const getBirds = async () => {
            const birdsFromServer = await fetchBirds()
            setCladisticData(birdsFromServer.cladisticBirdData)
            // console.log(birdsFromServer)
            // birdsFromServer = birdsFromServer.map(birdJson => new BirdObj(birdJson))
            // console.log(birdsFromServer[3])
        }
        getBirds()
    }, [state])

    const fetchBirds = async () => {
        // console.log(`http://localhost:4000/birds${state.search}`)
        const res = await fetch(`http://localhost:4000/birds${state.search}`, {credentials: 'include'})
        const data = await res.json()
        return data
    }

    return (
        <div>
            <AccountSection/>
            <div>
                <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SearchTags tagColor='#F0E7F5' />
                </section>

                <section>
                    <BirdsGlossary cladisticData={cladisticData} />
                </section>
            </div>
            <BackToTop />
        </div>
    )
}

export default BirdBrowser