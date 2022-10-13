import { useState, useEffect } from 'react'
import BirdsGlossary from "./BirdsGlossary"
import SearchTags from "./SearchTags"
import { BirdObj } from '../js/BirdObj.js'
import '../App.css';
import BackToTop from './BackToTop';
import { useLocation } from 'react-router-dom';

function BirdBrowser() {

    const [cladisticData, setCladisticData] = useState([])
    const state = useLocation()
    console.log(state.search)

    useEffect(() => {
        const getBirds = async () => {
            const birdsFromServer = await fetchBirds()
            setCladisticData(birdsFromServer.cladisticBirdData)
            // console.log(birdsFromServer)
            // birdsFromServer = birdsFromServer.map(birdJson => new BirdObj(birdJson))
            // console.log(birdsFromServer[3])
        }
        console.log('useeffect')
        getBirds()
        console.log('done')
    }, [state])

    const fetchBirds = async () => {
        console.log(`http://localhost:4000/birds${state.search}`)
        const res = await fetch(`http://localhost:4000/birds${state.search}`)
        console.log('in fetchbirds')
        const data = await res.json()
        console.log('we got from the backend', data)
        return data
    }

    return (
        <div>
            <div>
                <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SearchTags tagColor='#F0E7F5'/>
                </section>

                <section>
                    <BirdsGlossary cladisticData={cladisticData}/>
                </section>
            </div>
            <BackToTop />
        </div>
    )
}

export default BirdBrowser