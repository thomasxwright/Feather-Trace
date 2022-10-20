import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css'
import { RequireAuth } from './auth/RequireAuth';
import BirdBrowser from './components/BirdBrowser'
// import { Routes, Route } from 'react-router-dom'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Sightings from './components/sightings/Sightings';

function App() {

  const styling = {
    outer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '70%',
      margin: '0px auto'
    }
  }

  return (
    <div style={styling.outer}>
      <Routes>
        {/* <Route path='/' element={<p>nothing here!</p>} /> */}
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