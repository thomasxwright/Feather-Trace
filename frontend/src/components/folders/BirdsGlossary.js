import { useState } from "react"
import Order from "../Taxonomies/Order"
import Bird from "./Bird"
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

    const levels = ['class', 'order', 'family', 'genus', 'species']
    const depth = (currentLevel.genus && 'genus') || (currentLevel.family && 'family') || (currentLevel.order && 'order') || 'class'
    const nextLayer = levels[levels.indexOf(depth) + 1]
    const colors = {
        order: 'rgb(180, 167, 197)',
        family: 'rgb(194, 196, 216)',
        genus: 'rgb(217, 230, 234)',
        species: 'white'
    }
    
    const activeData =
        cladisticData?.[currentLevel.order]?.[currentLevel.family]?.[currentLevel.genus]
        || cladisticData?.[currentLevel.order]?.[currentLevel.family]
        || cladisticData?.[currentLevel.order]
        || cladisticData

    const validateGenusData = genus => {
        const birdsOfGenus = Object.values(cladisticData[currentLevel.order][currentLevel.family][genus])
        if (!birdsOfGenus[0].wikiUrl){
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
            setCurrentLevel(outOneLayer)
        },
        order: order => {
            setCurrentLevel({ order })
        },
        family: family => {
            setCurrentLevel({ order: currentLevel.order, family })
        },
        genus: genus => {
            validateGenusData(genus)
            setCurrentLevel({ order: currentLevel.order, family: currentLevel.family, genus })
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

    return (
        <section>
            <TaxonomyNavigation taxonomies={Object.entries(currentLevel)} zIndex={0} setActiveTaxonomy={setActiveTaxonomy} />
            <RoundedBlock
                color={colors[depth]}
                stylingAdjustments={{ zIndex: 1 }}
            >

                <ul style={styling.outer}>
                    {Object.entries(activeData).map(([name, data]) => (
                        <li key={name} style={{ margin: '0 10px 20px' }}>
                            {
                                !currentLevel.genus ?
                                    <TaxonomyGroup data={data} taxonomies={{ [nextLayer]: name }} setActiveTaxonomy={setActiveTaxonomy} />
                                    :
                                    <Bird data={data} isLoading={isLoading}/>
                            }
                        </li>
                    ))}
                </ul>

            </RoundedBlock>
        </section>
    )
}

export default BirdsGlossary