const Sighting = ({ sighting, hideDeletedSighting }) => {

  const styling = {
    outer: {
      display: 'flex'
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
      padding: '15px'
    }
  }

  const deleteSighting = async () => {
    const result = await fetch(`http://localhost:4000/sightings/deleteSighting/${sighting._id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}})
    const json = await result.json()
    if (json.deleted) {
      hideDeletedSighting(sighting._id)
    }
  }


  return (
    <section style={styling.outer}>
      <div style={styling.imageContainer}>
        <img src={sighting.image} style={styling.image} alt='photo' />
      </div>
      <div style={styling.details}>
        <p>{new Date(sighting.createdAt).toLocaleString()}</p>
        <p>{sighting.notes}</p>
        <button onClick={deleteSighting}>Delete</button>
      </div>
    </section>
  )
}

export default Sighting 