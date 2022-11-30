const deleteImg = require('../../images/close_FILL0_wght400_GRAD0_opsz48.png')

const Sighting = ({ sighting, hideDeletedSighting }) => {

  const styling = {
    outer: {
      display: 'flex',
      position: 'relative',
      backgroundColor: 'rgb(217, 230, 234)',
      margin: '20px 8px',
      padding: '8px',
      borderRadius: '8px'
    },
    delete: {
      position: 'absolute',
      left: '-20px',
      top: '-16px',
      cursor: 'pointer',
      opacity: '0.6'
    },
    imageContainer: {
      flexBasis: '350px',
      marginRight: '30px'
    },
    image: {
      width: '100%'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      // padding: '15px',
      width: '20%',
      paddingLeft: '20px'
    },
    timeSection: {
      margin: '0 32px'
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
      <img onClick={deleteSighting} style={styling.delete} src={deleteImg} />
      <div style={styling.details}>
        <div style={styling.timeSection}>
          <p style={styling.date}>{new Date(sighting.createdAt).toLocaleDateString()}</p>
          <p style={styling.time}>{new Date(sighting.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        {sighting.location && <span style={styling.location} onClick={showLocation}>Has a location</span>}
      </div>
      <div style={styling.imageContainer}>
        {sighting.image && <img src={sighting.image} style={styling.image} alt='photo' />}
      </div>
      {sighting.notes && <p>{sighting.notes}</p>}
    </section>
  )
}

export default Sighting 