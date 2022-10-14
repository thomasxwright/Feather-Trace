const Sighting = ({ sighting }) => {

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
  return (
    <section style={styling.outer}>
      <div style={styling.imageContainer}>
        <img src={sighting.image} style={styling.image} alt='photo' />
      </div>
      <div style={styling.details}>
        <p>{new Date(sighting.createdAt).toLocaleString()}</p>
        <p>{sighting.notes}</p>
        <button>Delete</button>
      </div>
    </section>
  )
}

export default Sighting 