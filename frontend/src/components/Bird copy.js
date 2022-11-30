import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useScreenModeContext } from "../auth/useScreenMode"
import BirdCall from "./BirdCall"
import BirdPhoto from "./BirdPhoto"
import BlockingOverlay from "./BlockingOverlay"
import CladeHeader from "./CladeHeader"
import InfoSegment from "./InfoSegment"

const Bird = ({ bird }) => {

    // modes: narrow, medium, desktop
    const screenMode = useScreenModeContext()

    const styling = {
        inner: {
            display: 'flex',
            // alignItems: 'flex-start'
        },
        column: {
            display: 'flex',
            flexDirection: 'column'
        },
        hoverColor: 'rgb(217, 230, 234, 0.3)',
        name: {
            margin: '20px 0',
            fontWeight: '550',
            fontSize: '24px'
        },
        link: {
            padding: '12px',
            backgroundColor: 'rgb(217, 230, 234, 0.3)',
            textDecoration: 'none'
        },
        preview: {
            narrow: {
                backgroundColor: 'red'
            },
            medium: {
                backgroundColor: 'orange'
            },
            desktop: {
                backgroundColor: 'green'
            }
        }
    }

  

    const [isExpanded, setIsExpanded] = useState(false)
    
    const scrollTo = target => {
        const pos = target.getBoundingClientRect().top + window.scrollY - 8
        window.scrollTo({
            top: pos,
            behavior: "smooth"
        })
    }

    return (
        <section className='species unexpanded' style={isExpanded ? { position: 'relative' } : { position: 'relative', cursor: 'pointer' }}>
            <div style={{width: '200px', height: '45px', ...styling.preview[screenMode]}}></div>
            {/* <BlockingOverlay styling={styling} isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[217, 230, 234]} zIndex={0} opacity={0.5}/> */}
            <BlockingOverlay styling={styling} isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[234, 241, 243]} zIndex={0} />
            <CladeHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} cladeName={bird.species} hoverColor={styling.hoverColor} />
            <section style={styling.name} >{bird.commonName}</section>
            <section style={styling.inner}>
                <section style={{ ...styling.column, width: '250px' }}>
                    <BirdPhoto src={bird.images[0]} isExpanded={isExpanded} />
                    {/* {console.log('call:', bird.call)} */}
                    {/* <BirdCall call={bird.call} /> */}
                    {/* {console.log(bird.calls)} */}
                    {Boolean(bird.calls.length) && <BirdCall calls={bird.calls} />}
                    <NavLink style={styling.link} to={`/sightings/${bird._id}`}>
                        Log Sightings
                    </NavLink>
                </section>
                {/* <section><img src={bird.images[0]} style={styling.image} /></section> */}

                <section style={{ ...styling.column, paddingLeft: '55px', maxWidth: '65%' }}>
                    {bird.generalDescription.map((paragraph, i) => <p key={i} style={i === 0 ? { marginTop: '0', lineHeight: '1.75' } : { lineHeight: '1.75' }}>{paragraph}</p>)}
                    {bird.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)}
                </section>
                {/* <a href={`/sightings/${bird._id}`}>Sightings</a> */}
                {/* <section>
                    {bird.infoSegments}
                </section> */}
            </section>
        </section>
        // </div>
    )
}

export default Bird