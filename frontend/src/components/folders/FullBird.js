import React from 'react'
import { NavLink } from 'react-router-dom'
import { useScreenModeContext } from '../../auth/useScreenMode'
import BirdCall from './BirdCall'
import InfoSegment from './InfoSegment'

const FullBird = ({ data }) => {
    const screenMode = useScreenModeContext()

    const styling = {
        inner: {
            display: 'flex',
            // alignItems: 'flex-start'
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            alignSelf: 'flex-end',
            bottom: '1rem'
        },
        image: {
            borderRadius: '8px 8px 0 0',
            width: '100%',
            zIndex: '1',
            position: 'relative'
        },
        hoverColor: 'rgb(217, 230, 234, 0.3)',
        backgroundColor: 'white',
        name: {
            margin: '20px 0',
            fontWeight: '550',
            fontSize: '24px',
            narrow: {
                fontSize: '18px'
            }
        },
        link: {
            padding: '12px',
            backgroundColor: 'rgb(217, 230, 234, 0.3)',
            textDecoration: 'none'
        },
        generalInfo: {
            narrow: {
                lineHeight: '1.5',
                fontSize: '.9em'
            }
        }
    }

    return screenMode === 'narrow' ?
        // phone size------------------
        (
            <section style={{ display: 'flex', flexDirection: 'column' }}>
                <section style={{ ...styling.name, ...styling.name[screenMode] }} >{data.commonName}</section>
                {data.images.length > 0 && <img src={data.images[0].src} alt={data.images[0].alt} style={styling.image} />}
                {Boolean(data.calls.length) && <BirdCall calls={data.calls} />}
                <NavLink style={styling.link} to={`/sightings/${data._id}`}>
                    Log Sightings
                </NavLink>
                <section style={{ ...styling.generalInfo[screenMode] }}>
                    {data.generalDescription.map((paragraph, i) => <p key={i} >{paragraph}</p>)}
                    {data.infoSegments.map((segment, i) => (
                        <>


                            {data.images[i + 1] && <>
                                {data.images[i + 1].alt ? (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <img src={data.images[i + 1].src} alt={data.images[i + 1].alt} style={{ width: '80%' }} />
                                            <p style={{ fontSize: '.8em', marginTop: '2px', textAlign: 'center' }}>{data.images[i + 1].alt}</p>
                                        </div>
                                    </>
                                )
                                    :
                                    <img src={data.images[i + 1].src} alt={data.images[i + 1].alt} style={{ width: '90%', marginBottom: '16px' }} />
                                }
                            </>
                            }


                            <InfoSegment key={i} title={segment.title} info={segment.info} />


                        </>
                    )
                    )}
                    {/* The rest of the images. IDK how to display them side by side with overflow hidden for some reason and I am sick of trying. */}
                    <ul style={{ ...styling.generalInfo[screenMode], listStyle: 'none', overflow: 'scroll' }}>
                        {data.images.slice(data.infoSegments.length + 1).map((image, i) => (
                            <li key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {image.alt ? (
                                    <>
                                        <img src={image.src} alt={image.alt} style={{ width: '80%' }} />
                                        <p style={{ fontSize: '.8em', marginTop: '2px', textAlign: 'center' }}>{image.alt}</p>
                                    </>
                                )
                                    :
                                    <img src={image.src} alt={image.alt} style={{ width: '80%', marginBottom: '16px' }} />
                                }
                            </li>
                        )
                        )}
                    </ul>
                </section>
            </section>
        )

        :

        // Full size-------------------
        (
            <div>
                <section style={styling.name} >{data.commonName}</section>

                <section style={styling.inner}>
                    <section style={{ ...styling.column, width: '40%' }}>
                        {data.images.length > 0 && <img src={data.images[0].src} alt={data.images[0].alt} style={styling.image} />}
                        {/* {console.log('call:', bird.call)} */}
                        {/* <BirdCall call={bird.call} /> */}
                        {/* {console.log(bird.calls)} */}
                        {Boolean(data.calls.length) && <BirdCall calls={data.calls} />}
                        <NavLink style={styling.link} to={`/sightings/${data._id}`}>
                            Log Sightings
                        </NavLink>
                        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>{data.images.slice(1, 9).map((image, i) => (
                            <li key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {image.alt ? (
                                        <>
                                            <div style={{ width: '75%' }}>
                                                <img src={image.src} alt={image.alt} style={{ width: '100%' }} />
                                            </div>
                                            <p style={{ fontSize: '.8em', marginTop: '2px' }}>{image.alt}</p>
                                        </>
                                    )
                                        :
                                        <img src={image.src} alt={image.alt} style={{ width: '90%' }} />
                                    }

                                </div>
                            </li>
                        ))}
                        </ul>
                    </section>
                    {/* <section><img src={bird.images[0]} style={styling.image} /></section> */}

                    <section style={{ ...styling.column, paddingLeft: '4%', maxWidth: '65%' }}>
                        {data.generalDescription.map((paragraph, i) => <p key={i} style={i === 0 ? { marginTop: '0', lineHeight: '1.75' } : { lineHeight: '1.75' }}>{paragraph}</p>)}
                        {data.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)}
                    </section>
                    {/* <a href={`/sightings/${bird._id}`}>Sightings</a> */}
                </section>

            </div>
        )
}

export default FullBird
// <img src={data.images[0]} style={{ width: '30%' }} />
// <ul style={{ listStyle: 'none' }}>
//     {data.generalDescription.map((paragraph, i) => (
//         <li key={i}>
//             <p>{paragraph}</p>
//         </li>
//     ))}
// </ul>