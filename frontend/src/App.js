import './App.css'
import { RequireAuth } from './utils/auth/RequireAuth';
import BirdBrowser from './components/BirdBrowser'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Sightings from './components/sightings/Sightings'
import { useScreenModeContext } from './utils/useScreenMode';
import { ThemeContextProvider } from './utils/ThemeContextManagement';
import HeaderBar from './components/HeaderBar';
import OverlayMessage from './components/menus/OverlayMessage';
import { useEffect, useState } from 'react';
import About from './components/menus/About';

const styling = {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px auto',
    narrow: {
      padding: '4px'
    },
    medium: {
      padding: '8px'
    },
    desktop: {
      width: '70%',
      paddingTop: '8px'
    }
  }
}

function App() {
  const screenMode = useScreenModeContext()

  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('veteran'))
      setMessage(<About setMessage={setMessage} />)
  }, [])

  return (
    <ThemeContextProvider>
      {
        message !== null && <OverlayMessage setMessage={setMessage}>
          {message}
        </OverlayMessage>
      }
      <div style={{ ...styling.outer, ...styling.outer[screenMode] }}>
        <HeaderBar setMessage={setMessage} />
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
    </ThemeContextProvider>
  )
}

export default App