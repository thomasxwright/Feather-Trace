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

    const styling = {
        outer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '75%',
            margin: '0px auto'
        }
    }

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
    }, [state])

    const fetchBirds = async () => {
        const res = await fetch(`http://localhost:4000/birds${state.search}`)
        const data = await res.json()
        return data
    }

    return (
        <div style={styling.outer}>
            <div>
                <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SearchTags setCladisticData={setCladisticData} />
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