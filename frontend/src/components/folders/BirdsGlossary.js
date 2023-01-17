import { useState } from "react"
import Order from "../Taxonomies/Order"
import BirdGroup from "./BirdGroup"
import TaxonomyGroup from "./TaxonomyGroup"
import TaxonomyNavigation from "./TaxonomyNavigation"
// import Order from "./Order"

const BirdsGlossary = ({ cladisticData, setCladisticData }) => {

    const styling = {
        outer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            listStyleType: 'none',
            padding: '0'
        }
    }

    const [currentLevel, setCurrentLevel] = useState({})
    const setOrder = order => {
        setCurrentLevel({ order: order })
    }
    const setFamily = family => {
        setCurrentLevel({ order: currentLevel.order, family: family })
    }
    const setGenus = genus => {
        setCurrentLevel({ order: currentLevel.order, family: currentLevel.family, genus: genus })
    }
    const depth = (currentLevel.genus && 'genus') || (currentLevel.family && 'family') || (currentLevel.order && 'order') || 'class'

    const activeData =
        cladisticData?.[currentLevel.order]?.[currentLevel.family]?.[currentLevel.genus]
        || cladisticData?.[currentLevel.order]?.[currentLevel.family]
        || cladisticData?.[currentLevel.order]
        || cladisticData

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

        <>
            {/* <TaxonomyNavigation /> */}

            <ul>
                {Object.entries(activeData).map(([name, data]) => (
                    <li key={name}>
                        {depth === 'genus' ?
                            <BirdGroup data={data} genusName={name} />
                            :
                            <TaxonomyGroup data={data} taxonomyName={name} />
                        }
                    </li>
                ))}
            </ul>

        </>


        // <ul style={styling.outer}>
        //     {Object.entries(cladisticData).map(order => {
        //         return (
        //             <li key={order[0]}>
        //                 <Order orderData={order[1]} orderName={order[0]} setGenusData={setGenusData} />
        //             </li>
        //         )
        //     })}
        // </ul>
    )
}

export default BirdsGlossary