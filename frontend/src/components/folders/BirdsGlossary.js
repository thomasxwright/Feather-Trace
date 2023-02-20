import { createRef, useContext, useEffect, useState } from "react"
import { useScreenModeContext } from "../../auth/useScreenMode"
import Bird from "./Bird"
import FullBird from "./FullBird"
import RoundedBlock from "./RoundedBlock"
import TaxonomyGroup from "./TaxonomyGroup"
import TaxonomyNavigation from "./TaxonomyNavigation"
import useElementOnScreen from "../../utils/UseElementOnScreen"
import TempFloatingTaxonomyNavigation from "./TempFloatingTaxonomyNavigation"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const BirdsGlossary = ({ cladisticData, setCladisticData, currentLevel, setCurrentLevel, isFetchingFullData, setIsFetchingFullData }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

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

    useEffect(() => {
        if (depth === 'genus')
            validateGenusData(currentLevel.genus)
        if (scrollTo) {
            const destination = refs[scrollTo] || top // TODO: the scrollTo can contain a value from a previous page. try reversing out of a taxonomy, then running a new search, and this value will be outdated. Maybe instead of short circuiting this value, we should actually set it properly somewhere.
            const position = destination.current.getBoundingClientRect().top
            const stickyOffset = currentLevel.order && screenMode !== 'narrow' ? -48 : 0  // if the taxonomy nav bar is floating at the top of the screen, add extra scrolling clearance
            const offset = scrollTo === 'top' ? -10 : (-32 + stickyOffset)  //scrolling to just the top in general vs a specific birdgroup
            window.scrollBy({
                top: position + offset,
                behavior: 'smooth'
            })
        }
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
            setIsFetchingFullData(true)
            const speciesIds = birdsOfGenus.map(bird => bird._id)
            const findSpeciesData = async () => {
                const res = await fetch(`/birds/completeData?ids=${speciesIds.join(',')}`, { credentials: 'include' })
                const data = await res.json()
                setGenusData(currentLevel.order, currentLevel.family, genus, data)
                setIsFetchingFullData(false)
                return data
            }
            const birds = findSpeciesData()
        }
    }

    const setActiveTaxonomy = {
        stepOutOneLevel: () => {
            const { [depth]: remove, ...outOneLayer } = currentLevel
            setCurrentLevel(outOneLayer)
            setScrollTo(remove)
        },
        stepFullyOut: () => {
            setCurrentLevel({})
            setScrollTo(currentLevel.order || 'top')
        },
        order: order => {
            const destination = { order }
            setCurrentLevel(destination)
            setScrollTo(currentLevel.family || 'top')
        },
        family: family => {
            const destination = { order: currentLevel.order, family }
            setCurrentLevel(destination)
            setScrollTo(currentLevel.genus || 'top')
        },
        genus: genus => {
            validateGenusData(genus)
            const destination = { order: currentLevel.order, family: currentLevel.family, genus }
            setCurrentLevel(destination)
            setScrollTo(currentLevel.species || 'top')
        },
        species: species => {
            const destination = { order: currentLevel.order, family: currentLevel.family, genus: currentLevel.genus, species }
            setCurrentLevel(destination)
            setScrollTo('top')
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
    refs.top = top

    // const navbarIsFixed = depth === 'species' && screenMode !== 'narrow'  Was useful when the nav bar was anchored at the bottom of the page in tablet and desktop mode.
    const stickyStylingAdjustments = {
        zIndex: 3,
        position: 'sticky',
        top: '0em',
        backgroundColor: theme.background,
        marginLeft: '0px',
        paddingLeft: '4px',
        paddingBottom: '4px'
    }

    const navTagsStickyTo = isVisible ? '' :
        (screenMode === 'narrow' ? 'bottom' : 'top')

    return (
        <section ref={top}>
            <div ref={screenMode !== 'narrow' ? containerRef : null}></div>
            {currentLevel.hasOwnProperty('order') && <TaxonomyNavigation taxonomies={Object.entries(currentLevel)} zIndex={0} setActiveTaxonomy={setActiveTaxonomy} stylingAdjustments={{ marginBottom: '-8px', paddingTop: '2px', ...navTagsStickyTo === 'top' && stickyStylingAdjustments }} reference={screenMode === 'narrow' ? containerRef : null} />}
            <RoundedBlock
                stylingAdjustments={{
                    zIndex: 1,
                    // width: depth === 'species' ? '100%' : 'fit-content',
                    backgroundColor: theme.taxonomies[depth],
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
                                        <Bird data={data} isFetchingFullData={isFetchingFullData} setActiveTaxonomy={setActiveTaxonomy} />
                                        :
                                        <TaxonomyGroup data={data} taxonomies={{ [nextLayer]: name }} setActiveTaxonomy={setActiveTaxonomy} />
                                }
                            </li>
                        ))}
                    </ul>
                }
            </RoundedBlock>
            {navTagsStickyTo === 'bottom' && currentLevel.hasOwnProperty('order') && <TempFloatingTaxonomyNavigation taxonomies={Object.entries(currentLevel)} setActiveTaxonomy={setActiveTaxonomy} />}
        </section >
    )
}

export default BirdsGlossary