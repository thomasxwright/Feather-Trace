const Bird = ({ bird }) => {

    const styling = {
        outer: {
            display: 'flex',
            // alignItems: 'flex-start'
        },

        image: {
            width: '200px'
        }
    }


    return (
        <div style={styling.outer}>
            <section><img src={bird.images[0]} style={styling.image} /></section>
            <span className='name'>
                {bird.commonName}
            </span>
            <span>
                {bird.order} {bird.family} {bird.genus}
            </span>
            <a href={`/sightings/${bird._id}`}>Sightings</a>
            <section>
                {bird.infoSegments}
            </section>
        </div>
    )
}

export default Bird