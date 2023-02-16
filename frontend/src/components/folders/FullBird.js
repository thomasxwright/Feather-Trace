import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useScreenModeContext } from '../../auth/useScreenMode'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import useElementOnScreen from '../../utils/UseElementOnScreen'
import BirdCall from './BirdCall'
import InfoSegment from './InfoSegment'

const FullBird = ({ data }) => {
    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const offsetFromHoveringNavBar = 85
    const [leftContainerRef, leftIsVisible] = useElementOnScreen({
        root: null,
        rootMargin: `-${offsetFromHoveringNavBar}px 0px 0px`,
        threshold: 1
    })

    const [rightContainerRef, rightIsVisible] = useElementOnScreen({
        root: null,
        rootMargin: `-${offsetFromHoveringNavBar}px 0px 0px`,
        threshold: 1
    })

    const styling = {
        inner: {
            display: 'flex',
            // alignItems: 'flex-start'
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            // paddingBottom: navbarIsFixed ? '70px' : '0px',  // This line was used to add space for the fixed navbar for infosegments being displayed in narrow screenMode.
            position: 'sticky',
            ...screenMode !== 'narrow' && {
                minWidth: '215px'
            },
            columnIsEntirelyVisible: {
                true: {
                    alignSelf: 'flex-start',
                    top: `${offsetFromHoveringNavBar}px`
                },
                false: {
                    alignSelf: 'flex-end',
                    bottom: '0rem'
                }
            }
        },
        image: {
            borderRadius: '8px 8px 0 0',
            width: '100%',
            zIndex: '1',
            position: 'relative'
        },
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
            backgroundColor: theme.logSightingsBackground,
            textDecoration: 'none',
            color: theme.link
        },
        generalInfo: {
            narrow: {
                lineHeight: '1.5',
                fontSize: '.9em',
                padding: '4px'
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
                    {/* The rest of the images. IDK how to display them side by side with overflow hidden for some reason and I am sick of trying */}
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
            <section>
                <section style={styling.name} >{data.commonName}</section>

                <section style={styling.inner}>
                    <section style={{ width: '40%', height: 'fit-content', ...styling.column, ...styling.column.columnIsEntirelyVisible[leftIsVisible] }} ref={leftContainerRef}>
                        {data.images.length > 0 && <img src={data.images[0].src} alt={data.images[0].alt} style={styling.image} />}
                        {/* {console.log('call:', bird.call)} */}
                        {/* <BirdCall call={bird.call} /> */}
                        {/* {console.log(bird.calls)} */}
                        {Boolean(data.calls.length) && <BirdCall calls={data.calls} />}
                        <NavLink style={styling.link} to={`/sightings/${data._id}`}>
                            Log Sightings
                        </NavLink>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>{data.images.slice(1, 9).map((image, i) => (
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
                                        <img src={image.src} alt={image.alt} style={{ width: '90%', borderRadius: '8px' }} />
                                    }

                                </div>
                            </li>
                        ))}
                        </ul>
                    </section>
                    {/* <section><img src={bird.images[0]} style={styling.image} /></section> */}

                    <section style={{ paddingLeft: '4%', maxWidth: '65%', height: 'fit-content', ...styling.column, ...styling.column.columnIsEntirelyVisible[rightIsVisible] }} ref={rightContainerRef}>
                        {data.generalDescription.map((paragraph, i) => <p key={i} style={i === 0 ? { marginTop: '0', lineHeight: '1.75' } : { lineHeight: '1.75' }}>{paragraph}</p>)}
                        {data.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)}
                    </section>
                    {/* <a href={`/sightings/${bird._id}`}>Sightings</a> */}
                </section>

            </section>
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