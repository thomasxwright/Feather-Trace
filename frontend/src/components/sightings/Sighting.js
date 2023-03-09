import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import { ReactComponent as UnfilledDelete } from '../../images/delete (unfilled).svg'
import { ReactComponent as FilledDelete } from '../../images/delete (filled).svg'
import { useScreenModeContext } from '../../utils/useScreenMode'

const Sighting = ({ sighting, hideDeletedSighting }) => {

  const { theme } = useContext(ThemeContext)
  const screenMode = useScreenModeContext()

  const styling = {
    outer: {
      display: 'flex',
      position: 'relative',
      backgroundColor: theme.taxonomies.genus,
      margin: '20px 8px',
      padding: '8px',
      borderRadius: '8px'
    },
    delete: {
      position: 'absolute',
      left: '-20px',
      top: '-16px',
      cursor: 'pointer',
      opacity: '0.6',
      narrow: {
        left: '-12px',
        top: '-20px',
        width: '30px'
      }
    },
    imageContainer: {
      ...screenMode !== 'narrow' && {
        flexBasis: '400px',
        marginRight: '30px'
      }
    },
    image: {
      width: '100%'
    },
    details: {
      display: 'flex',
      fontSize: screenMode === 'narrow' ? '0.8rem' : '1rem',
      flexDirection: 'column',
      // padding: '15px',
      width: 'fit-content',
      paddingLeft: screenMode === 'narrow' ? '4px' : '20px'
    },
    timeSection: {
      margin: screenMode === 'narrow' ? '0 12px' : '0 24px'
    },
    date: {
      fontSize: '120%',
      fontWeight: '600',
      margin: '4px'
    },
    time: {
      fontSize: '100%',
      margin: '4px'
    },
    location: {
      marginTop: '20px'
    }
  }

  const showLocation = () => {
    alert(`latitude: ${sighting.location.latitude}\nlongitude: ${sighting.location.longitude}`)
  }

  const deleteSighting = async () => {
    const result = await fetch(`/sightings/deleteSighting/${sighting._id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
    const json = await result.json()
    if (json.deleted) {
      hideDeletedSighting(sighting._id)
    }
  }


  return (
    <section style={styling.outer}>
      {screenMode !== 'narrow' ?
        <UnfilledDelete onClick={deleteSighting} style={{ ...styling.delete, ...styling.delete[screenMode] }} />
        :
        <FilledDelete onClick={deleteSighting} style={{ ...styling.delete, ...styling.delete[screenMode] }} />
      }
      <div style={styling.details}>
        <div style={styling.timeSection}>
          <p style={styling.date}>{new Date(sighting.createdAt).toLocaleDateString()}</p>
          <p style={styling.time}>{new Date(sighting.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        {sighting.location && <span style={styling.location} onClick={showLocation}>Has a location</span>}
      </div>

      {screenMode === 'narrow' ?
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sighting.image && <div style={styling.imageContainer}>
            <img src={sighting.image} style={styling.image} alt='photo' />
          </div>
          }
          {sighting.notes && <p>{sighting.notes}</p>}
        </div>
        :
        <>
          {sighting.image && <div style={styling.imageContainer}>
            <img src={sighting.image} style={styling.image} alt='photo' />
          </div>
          }
          {sighting.notes && <p>{sighting.notes}</p>}
        </>
      }
    </section>
  )
}

export default Sighting 