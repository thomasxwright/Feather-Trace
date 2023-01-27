import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css'
import { RequireAuth } from './auth/RequireAuth';
import BirdBrowser from './components/BirdBrowser'
// import { Routes, Route } from 'react-router-dom'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Sightings from './components/sightings/Sightings'
import { useScreenModeContext } from './auth/useScreenMode';

const styling = {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // width: '70%',
    margin: '0px auto',
    narrow: {
      width: '100%'
    },
    medium: {
      // width: '98%',
      padding: '8px'
    },
    desktop: {
      width: '70%'
    }
  }
}

function App() {
  const screenMode = useScreenModeContext()


  return (
    <div style={{...styling.outer, ...styling.outer[screenMode]}}>
      <Routes>
        <Route path='/*' element={<BirdBrowser />} />
        <Route path='/browse/*' element={<BirdBrowser />} />
        <Route
          path='/sightings/*'
          element={
            <RequireAuth>
              <Sightings />
            </RequireAuth>
          } />
        <Route path='/game' element={<p>play da game</p>} />
      </Routes>
    </div >
  )
}

export default App