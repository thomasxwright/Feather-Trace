const Bird = ({ bird }) => {

    const styling = {
        outer: {
            display: 'flex',
            // alignItems: 'flex-start'
        }
    }

    // console.log(bird)

    return (
        <div className="species">
            <section style={{fontSize: '18px'}}>{bird.species}</section>
            <section style={{ margin: '20px 0', fontWeight: '550', fontSize: '24px' }}>{bird.commonName}</section>
            <section style={styling.outer}>
                <section><img src={bird.images[0]} style={styling.image} /></section>
                {/* <span>
                    {bird.order} {bird.family} {bird.genus}
                </span> */}


                <section style={{ display: 'flex', flexDirection: 'column', paddingLeft: '55px', maxWidth: '65%' }}>
                    {bird.generalDescription.map((paragraph, i) => <p key={i} style={i === 0 ? {marginTop: '0', lineHeight: '1.75'} : {lineHeight: '1.75'}}>{paragraph}</p>)}
                    {bird.infoSegments.map((segment, i) => <p key={i}> {segment} </p>)}
                </section>

                
                {/* <a href={`/sightings/${bird._id}`}>Sightings</a> */}
                {/* <section>
                    {bird.infoSegments}
                </section> */}
            </section>
        </div>
    )
}

export default Bird