import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css'
import BirdBrowser from './components/BirdBrowser'
// import { Routes, Route } from 'react-router-dom'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/browse/*' element={<BirdBrowser />} />
          <Route path='/sightings' element={<p>here're your sightings</p>} />
          <Route path='/game' element={<p>play da game</p>} />
        </Routes>
      </Router>
    </>
  )
}

export default App