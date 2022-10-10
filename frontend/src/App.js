import logo from './logo.svg';
import { useState, useEffect } from 'react'
import BirdsGlossary from "./components/BirdsGlossary"
import SearchTags from "./components/SearchTags"
import { BirdObj } from './js/BirdObj.js'
import './App.css';
import BackToTop from './components/BackToTop';

function App() {


  const [filters, setFilters] = useState(['by state', 'Add a Filter', 'by Order', 'sd', 'bongo', 'binsdfoine', 'sleifj', 'lsijfelsifsefi', 'lisjfelsij', 'lsifejeilj', 'lsiefjsleij'])
  const [cladisticData, setCladisticData] = useState([])

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
      console.log(birdsFromServer)
      // birdsFromServer = birdsFromServer.map(birdJson => new BirdObj(birdJson))
      // console.log(birdsFromServer[3])
    }
    getBirds()
  }, [])

  const fetchBirds = async () => {
    const res = await fetch(`http://localhost:4000/birds/`)
    const data = await res.json()
    console.log('ok', data)
    return data
  }

  const removeFilter = filterToRemove => {
    setFilters(filters.filter(filter => filter !== filterToRemove))
  }

  return (

      <div style={styling.outer}>
        <div>
          <section style={{ display: 'flex', flexWrap: 'wrap' }}>
            <SearchTags filters={filters} onClick={removeFilter} />
          </section>

          <section>
            <BirdsGlossary cladisticData={cladisticData} />
          </section>
        </div>
        <BackToTop/>
      </div>
  )
}

export default App