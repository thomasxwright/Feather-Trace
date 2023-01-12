import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useScreenModeContext } from "../../auth/useScreenMode"
import BirdCall from "../BirdCall"
import BirdPhoto from "../BirdPhoto"
import BlockingOverlay from "../BlockingOverlay"
import CladeHeader from "../CladeHeader"
import InfoSegment from "../InfoSegment"
import Taxonomy from "./Taxonomy"

const ExpandedBird = ({ bird, isLoading }) => {

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
        backgroundColor: 'white',
        name: {
            margin: '20px 0',
            fontWeight: '550',
            fontSize: '24px'
        },
        link: {
            padding: '12px',
            backgroundColor: 'rgb(217, 230, 234, 0.3)',
            textDecoration: 'none'
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


    const values = {
        isExpanded,
        setIsExpanded,
        zIndex: 1,
        cladeName: bird.species,
        cladeType: 'species',
        backgroundColor: 'white',
        headerColor: [234, 241, 243],
        additionalStyle: {
            padding: '8px'
        }

    }


    return (
        <Taxonomy values={values}>
            <section style={styling.name} >{bird.commonName}</section>
            <>
                <div style={{ float: 'left', width: '55%', marginRight: '8px' }}>
                    <BirdPhoto src={bird.image} isExpanded={isExpanded} />
                </div>
                <section>
                    <p style={{ marginTop: '0', lineHeight: '1.5' }}>hurrayyyyyyy it's bird stuff</p>
                    {/* {bird.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)} */}
                </section>
            </>
        </Taxonomy>
    )

    // return (
    //     <Taxonomy values={values}>
    //         {/* <section className='unexpanded' style={isExpanded ? { position: 'relative'} : { position: 'relative', cursor: 'pointer' }}> */}
    //         {/* <BlockingOverlay styling={styling} isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[217, 230, 234]} zIndex={0} opacity={0.5}/> */}
    //         <section style={styling.name} >{bird.commonName}</section>

    //         {screenMode === 'narrow' ?
    //             (<>
    //                 <div style={{ float: 'left', width: '55%', marginRight: '8px' }}>
    //                     <BirdPhoto src={bird.images[0]} isExpanded={isExpanded} />
    //                 </div>
    //                 <section>
    //                     {bird.generalDescription.map((paragraph, i) => <p key={i} style={i === 0 ? { marginTop: '0', lineHeight: '1.5' } : { lineHeight: '1.75' }}>{paragraph}</p>)}
    //                     {/* {bird.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)} */}
    //                 </section>
    //             </>
    //             )
    //             :
    //             (
    //                 <div></div>
    //             )
    //         }




    //         {
    //             screenMode !== 'narrow' && <section style={styling.inner}>
    //                 <section style={{ ...styling.column, width: '40%' }}>
    //                     <BirdPhoto src={bird.images[0]} isExpanded={isExpanded} />
    //                     {/* {console.log('call:', bird.call)} */}
    //                     {/* <BirdCall call={bird.call} /> */}
    //                     {/* {console.log(bird.calls)} */}
    //                     {Boolean(bird.calls.length) && <BirdCall calls={bird.calls} />}
    //                     <NavLink style={styling.link} to={`/sightings/${bird._id}`}>
    //                         Log Sightings
    //                     </NavLink>
    //                 </section>
    //                 {/* <section><img src={bird.images[0]} style={styling.image} /></section> */}

    //                 <section style={{ ...styling.column, paddingLeft: '4%', maxWidth: '65%' }}>
    //                     {bird.generalDescription.map((paragraph, i) => <p key={i} style={i === 0 ? { marginTop: '0', lineHeight: '1.75' } : { lineHeight: '1.75' }}>{paragraph}</p>)}
    //                     {bird.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)}
    //                 </section>
    //                 {/* <a href={`/sightings/${bird._id}`}>Sightings</a> */}
    //                 {/* <section>
    //                 {bird.infoSegments}
    //             </section> */}
    //             </section>
    //         }
    //         {/* </section> */}
    //     </Taxonomy>
    //     // </div>
    // )
}

export default ExpandedBird