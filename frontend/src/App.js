import './App.css'
import { RequireAuth } from './auth/RequireAuth';
import BirdBrowser from './components/BirdBrowser'
// import { Routes, Route } from 'react-router-dom'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Sightings from './components/sightings/Sightings'
import { useScreenModeContext } from './auth/useScreenMode';
import { ThemeContextProvider } from './utils/ThemeContextManagement';
import HeaderBar from './components/HeaderBar';
import OverlayMessage from './components/OverlayMessage';
import { useEffect, useState } from 'react';
import About from './components/folders/About';
import Carousel from './components/folders/Carousel';

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
    if (!localStorage.getItem('veteran')) {
      console.log('didnt get veteran')
      setMessage(<About setMessage={setMessage} />)
    }
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
        {/* <Carousel>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Eurasian_teal_%28Anas_crecca%29_Photograph_by_Shantanu_Kuveskar.jpg" alt="placeholder" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg" alt="placeholder" />
          <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
        </Carousel> */}
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