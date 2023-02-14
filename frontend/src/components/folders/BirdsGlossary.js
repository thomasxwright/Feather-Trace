import { createRef, useEffect, useState } from "react"
import { useScreenModeContext } from "../../auth/useScreenMode"
import Bird from "./Bird"
import FloatingTaxonomyNavigation from "./FloatingTaxonomyNavigation"
import FullBird from "./FullBird"
// import BirdGroup from "./BirdGroup"
// import BlockWithNavTags from "./BlockWithNavTags"
import RoundedBlock from "./RoundedBlock"
import TaxonomyGroup from "./TaxonomyGroup"
import TaxonomyNavigation from "./TaxonomyNavigation"
import useElementOnScreen from "../../utils/UseElementOnScreen"
import TempFloatingTaxonomyNavigation from "./TempFloatingTaxonomyNavigation"

const BirdsGlossary = ({ cladisticData, setCladisticData, currentLevel, setCurrentLevel, fetchingBirds, setFetchingBirds }) => {

    const screenMode = useScreenModeContext()

    const styling = {
        outer: {
            display: 'flex',
            justifyContent: 'center',
            listStyle: 'none',
            flexWrap: 'wrap',
            padding: '0'
        },
        outerResponsive: {
            narrow: {
                // margin: '0 4px 0',
                padding: '8px'
            }
        },
        innerLiResponsive: {
            narrow: {
                margin: '0 4px 20px'
            }
        }
    }

    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    })

    const [scrollTo, setScrollTo] = useState('')

    const levels = ['class', 'order', 'family', 'genus', 'species']
    const depth = (currentLevel.species && 'species') || (currentLevel.genus && 'genus') || (currentLevel.family && 'family') || (currentLevel.order && 'order') || 'class'
    const nextLayer = levels[levels.indexOf(depth) + 1]
    const colors = {
        order: 'rgb(180, 167, 197)',
        family: 'rgb(194, 196, 216)',
        genus: 'rgb(217, 230, 234)',
        species: 'mintcream'
    }

    useEffect(() => {
        if (depth === 'genus')
            validateGenusData(currentLevel.genus)
        const destination = refs[scrollTo] || top
        const position = destination.current.getBoundingClientRect().top
        const stickyOffset = currentLevel.order && screenMode !== 'narrow' ? -48 : 0  // if the taxonomy nav bar is floating at the top of the screen, add extra scrolling clearance
        const offset = refs[scrollTo] ? (-32 + stickyOffset) : -10  //scrolling to a specific area vs just the top in general
        window.scrollBy({
            top: position + offset,
            behavior: 'smooth'
        })
    }, [currentLevel])

    const activeData =
        cladisticData?.[currentLevel.order]?.[currentLevel.family]?.[currentLevel.genus]?.[currentLevel.species]
        || cladisticData?.[currentLevel.order]?.[currentLevel.family]?.[currentLevel.genus]
        || cladisticData?.[currentLevel.order]?.[currentLevel.family]
        || cladisticData?.[currentLevel.order]
        || cladisticData

    const validateGenusData = genus => {
        const birdsOfGenus = Object.values(cladisticData[currentLevel.order][currentLevel.family][genus])
        if (!birdsOfGenus[0].wikiUrl) {
            setFetchingBirds(true)
            const speciesIds = birdsOfGenus.map(bird => bird._id)
            const findSpeciesData = async () => {
                const res = await fetch(`/birds/completeData?ids=${speciesIds.join(',')}`, { credentials: 'include' })
                const data = await res.json()
                setGenusData(currentLevel.order, currentLevel.family, genus, data)
                setFetchingBirds(false)
                return data
            }
            const birds = findSpeciesData()
        }
    }

    const setActiveTaxonomy = {
        stepOutOneLevel: () => {
            const { [depth]: remove, ...outOneLayer } = currentLevel
            // if (currentLevel[depth]) outOneLayer.from = currentLevel.depth
            console.log('stepping out one level')
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

    // const navbarIsFixed = depth === 'species' && screenMode !== 'narrow'  Was useful when the nav bar was anchored at the bottom of the page in tablet and desktop mode.
    const stickyStylingAdjustments = {
        zIndex: 3,
        position: 'sticky',
        top: '0em',
        backgroundColor: 'white',
        marginLeft: '0px',
        paddingLeft: '4px',
        paddingBottom: '4px'
    }

    const navTagsStickyTo = isVisible ? '' :
        (screenMode === 'narrow' ? 'bottom' : 'top')

    return (
        <section ref={top}>
            <div ref={screenMode !== 'narrow' ? containerRef : null}></div>
            <TaxonomyNavigation taxonomies={Object.entries(currentLevel)} zIndex={0} setActiveTaxonomy={setActiveTaxonomy} stylingAdjustments={{ marginBottom: '-8px', paddingTop: '2px', ...navTagsStickyTo === 'top' && stickyStylingAdjustments }} reference={screenMode === 'narrow' ? containerRef : null} />
            <RoundedBlock
                stylingAdjustments={{
                    zIndex: 1,
                    // width: depth === 'species' ? '100%' : 'fit-content',
                    backgroundColor: colors[depth],
                    padding: '18px 18px 0',
                    ...styling.outerResponsive[screenMode]
                }}
            >
                {depth === 'species' ? (
                    <FullBird data={activeData} />
                ) :
                    <ul style={styling.outer}>
                        {Object.entries(activeData).map(([name, data]) => (
                            <li key={name} style={{ margin: '0 10px 20px', ...styling.innerLiResponsive[screenMode] }} ref={refs[name]}>
                                {
                                    depth === 'genus' ?
                                        <Bird data={data} fetchingBirds={fetchingBirds} setActiveTaxonomy={setActiveTaxonomy} />
                                        :
                                        <TaxonomyGroup data={data} taxonomies={{ [nextLayer]: name }} setActiveTaxonomy={setActiveTaxonomy} />
                                }
                            </li>
                        ))}
                    </ul>
                }
            </RoundedBlock>
            {navTagsStickyTo === 'bottom' && <TempFloatingTaxonomyNavigation taxonomies={Object.entries(currentLevel)} setActiveTaxonomy={setActiveTaxonomy} />}
        </section >
    )
}

export default BirdsGlossary