import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import BirdPhoto from './BirdPhoto'
import PlaceholderBird from './PlaceholderBird'

const Bird = ({ data, isFetchingFullData, setActiveTaxonomy, sightings }) => {

    const abbreviateFirstSentence = text => {
        const paragraph = text.split('.')
        paragraph[0] = paragraph[0].substring([paragraph[0].indexOf(' is ') + 4])
        paragraph[0] = paragraph[0][0].toUpperCase() + paragraph[0].slice(1)
        return paragraph.join('.')
    }

    const myPhoto = sightings[data._id] ? sightings[data._id][0] : null

    const { theme } = useContext(ThemeContext)
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
        backgroundColor: theme.taxonomies.species,
        name: {
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'space-between'
        },
        link: {
            padding: '12px',
            backgroundColor: 'rgb(217, 230, 234, 0.3)',
            textDecoration: 'none'
        },
        myPhoto: {
            height: '100%',
            ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        }
    }

    return (
        <section style={{
            maxWidth: '350px', maxHeight: '320px', overflow: 'hidden', backgroundColor: theme.taxonomies.species, padding: '12px', borderRadius: '12px', cursor: isFetchingFullData ? 'default' : 'pointer',
            WebkitMaskImage: `linear-gradient(to top, rgba(0,0,0,0.35) 0%,rgba(0,0,0,1) 20%)`
        }}>
            {isFetchingFullData ?
                <PlaceholderBird />
                :
                (
                    <section onClick={() => setActiveTaxonomy.species(data.species)}>
                        <section style={styling.name} >
                            <h2 style={{ fontSize: '24px' }}>{data.commonName}</h2>
                            <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'flex-end', height: '100%'}}>
                                {myPhoto !== null && <img src={myPhoto} alt='' style={styling.myPhoto} />}
                            </div>
                        </section>
                        {data.images.length > 0 && <div style={{ float: 'left', width: '65%', marginRight: '8px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                            <BirdPhoto img={data.images[0]} myPhoto={myPhoto} />
                        </div>}
                        <ul style={{ fontSize: '12px', listStyle: 'none' }}>
                            {data.generalDescription.map((paragraph, i) => (<li key={i}><p>{i === 0 ? abbreviateFirstSentence(paragraph) : paragraph}</p></li>))
                            }
                            {data.infoSegments.map((segment, i) => <li key={i + data.generalDescription.length} style={{ fontWeight: '700', margin: '8px' }}><span>{segment.title}</span></li>)}
                        </ul>
                    </section>
                )
            }
        </section >
    )
    // (
    //     <Taxonomy values={values}>
    //         <>
    //             <section>
    //                 <p style={{ marginTop: '0', lineHeight: '1.5' }}>hurrayyyyyyy it's bird stuff</p>
    //                 {/* {bird.infoSegments.map((segment, i) => <InfoSegment key={i} title={segment.title} info={segment.info} />)} */}
    //             </section>
    //         </>
    //     </Taxonomy>
    // )

    // return
    // (
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

export default Bird