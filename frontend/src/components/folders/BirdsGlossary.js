import { createRef, useEffect, useState } from "react"
import Order from "../Taxonomies/Order"
import Bird from "./Bird"
import FloatingTaxonomyNavigation from "./FloatingTaxonomyNavigation"
import FullBird from "./FullBird"
// import BirdGroup from "./BirdGroup"
// import BlockWithNavTags from "./BlockWithNavTags"
import RoundedBlock from "./RoundedBlock"
import TaxonomyGroup from "./TaxonomyGroup"
import TaxonomyNavigation from "./TaxonomyNavigation"
// import Order from "./Order"

const BirdsGlossary = ({ cladisticData, setCladisticData }) => {

    const styling = {
        outer: {
            display: 'flex',
            justifyContent: 'center',
            listStyle: 'none',
            flexWrap: 'wrap',
            padding: '0'
        }
    }

    const [currentLevel, setCurrentLevel] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [scrollTo, setScrollTo] = useState('')

    useEffect(() => {
        const destination = refs[scrollTo] || top
        const position = destination.current.getBoundingClientRect().top
        const offset = refs[scrollTo] ? -20 : 0
        window.scrollBy({
            top: position + offset,
            behavior: 'smooth'
        })
    }, [currentLevel])

    const levels = ['class', 'order', 'family', 'genus', 'species']
    const depth = (currentLevel.species && 'species') || (currentLevel.genus && 'genus') || (currentLevel.family && 'family') || (currentLevel.order && 'order') || 'class'
    const nextLayer = levels[levels.indexOf(depth) + 1]
    const colors = {
        order: 'rgb(180, 167, 197)',
        family: 'rgb(194, 196, 216)',
        genus: 'rgb(217, 230, 234)',
        species: 'mintcream'
    }

    const activeData =
        cladisticData?.[currentLevel.order]?.[currentLevel.family]?.[currentLevel.genus]?.[currentLevel.species]
        || cladisticData?.[currentLevel.order]?.[currentLevel.family]?.[currentLevel.genus]
        || cladisticData?.[currentLevel.order]?.[currentLevel.family]
        || cladisticData?.[currentLevel.order]
        || cladisticData

    const validateGenusData = genus => {
        const birdsOfGenus = Object.values(cladisticData[currentLevel.order][currentLevel.family][genus])
        if (!birdsOfGenus[0].wikiUrl) {
            setIsLoading(true)
            const speciesIds = birdsOfGenus.map(bird => bird._id)
            const findSpeciesData = async () => {
                const res = await fetch(`/birds/completeData?ids=${speciesIds.join(',')}`, { credentials: 'include' })
                const data = await res.json()
                setGenusData(currentLevel.order, currentLevel.family, genus, data)
                setIsLoading(false)
                return data
            }
            const birds = findSpeciesData()
        }
    }

    const setActiveTaxonomy = {
        stepOutOneLevel: () => {
            const { [depth]: remove, ...outOneLayer } = currentLevel
            // if (currentLevel[depth]) outOneLayer.from = currentLevel.depth
            // console.log(remove)
            setCurrentLevel(outOneLayer)
            setScrollTo(remove)
        },
        order: order => {
            const destination = { order }
            // if (currentLevel.family) destination.from = currentLevel.family
            setCurrentLevel(destination)
            setScrollTo(currentLevel.family || '')
        },
        family: family => {
            const destination = { order: currentLevel.order, family }
            // if (currentLevel.genus) destination.from = currentLevel.genus
            setCurrentLevel(destination)
            setScrollTo(currentLevel.genus || '')
        },
        genus: genus => {
            validateGenusData(genus)
            const destination = { order: currentLevel.order, family: currentLevel.family, genus }
            // if (currentLevel.species) destination.from = currentLevel.species
            setCurrentLevel(destination)
            if (currentLevel.species) setScrollTo(currentLevel.species)
        },
        species: species => {
            const destination = { order: currentLevel.order, family: currentLevel.family, genus: currentLevel.genus, species }
            setCurrentLevel(destination)
            setScrollTo(top)
        }
    }


    const setGenusData = (order, family, genus, data) => {
        setCladisticData({
            ...cladisticData,
            [order]: {
                ...cladisticData[order],
                [family]: {
                    ...cladisticData[order][family],
                    [genus]: data
                }
            }
        })
    }

    const items = Object.entries(activeData)
    const top = createRef(),
        refs = items.reduce((acc, value) => {
            acc[value[0]] = createRef()
            return acc
        }, {})
    const scrollInto = id => {
        console.log(`go to ${id}`, refs)
        refs[id].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    return (
        <section ref={top}>
            {/* <FloatingTaxonomyNavigation taxonomies={Object.entries(currentLevel)} setActiveTaxonomy={setActiveTaxonomy}/> */}
            <TaxonomyNavigation taxonomies={Object.entries(currentLevel)} zIndex={0} setActiveTaxonomy={setActiveTaxonomy} />
            <RoundedBlock
                stylingAdjustments={{
                    zIndex: 1,
                    width: depth === 'species' ? '100%' : 'fit-content',
                    backgroundColor: colors[depth]
                }}
            >
                {depth === 'species' ? (
                    <FullBird data={activeData} />
                ) :
                    <ul style={styling.outer}>
                        {Object.entries(activeData).map(([name, data]) => (
                            <li key={name} style={{ margin: '0 10px 20px' }} ref={refs[name]}>
                                {
                                    depth === 'genus' ?
                                        <Bird data={data} isLoading={isLoading} setActiveTaxonomy={setActiveTaxonomy} />
                                        :
                                        <TaxonomyGroup data={data} taxonomies={{ [nextLayer]: name }} setActiveTaxonomy={setActiveTaxonomy} />
                                }
                            </li>
                        ))}
                    </ul>
                }
            </RoundedBlock>
        </section >
    )
}

export default BirdsGlossary