import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import BirdPhoto from './BirdPhoto'
import PlaceholderBird from './PlaceholderBird'
import { motion } from 'framer-motion'

const Bird = ({ data, isFetchingFullData, setActiveTaxonomy, sightings, i }) => {

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
                <PlaceholderBird i={i} />
                :
                (
                    <motion.section
                        onClick={() => setActiveTaxonomy.species(data.species)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.1 * i }}>
                        <section style={styling.name} >
                            <h2 style={{ fontSize: '24px' }}>{data.commonName}</h2>
                            <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
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
                    </motion.section>
                )
            }
        </section >
    )
}

export default Bird