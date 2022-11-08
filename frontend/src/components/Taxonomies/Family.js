import { useState } from "react"
import BlockingOverlay from "../BlockingOverlay"
import CladeHeader from "../CladeHeader"
import Genus from "./Genus"
import Taxonomy from "./Taxonomy"

const Family = ({ familyData, familyName }) => {

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.2)'
    }
    const howManySubgroups = Object.values(familyData).length
    const [isExpanded, setIsExpanded] = useState(howManySubgroups < 2)

    const values = {
        isExpanded,
        setIsExpanded,
        zIndex: 3,
        cladeName: familyName,
        cladeType: 'family',
        backgroundColor: '#C2C4D8',
        headerColor: [194, 196, 216]
    }

    let condensedWidth = 'auto'
    if (howManySubgroups > 3 && howManySubgroups < 8)
        condensedWidth = '450px'
    else if (howManySubgroups < 18)
        condensedWidth = '650px'
    else if (howManySubgroups >= 18)
        condensedWidth = '100%'


    return (
        <Taxonomy values={values}>
            {isExpanded ?
                Object.entries(familyData).map(genus => {
                    return (
                        <li key={genus[0]}>
                            <Genus genusData={genus[1]} genusName={genus[0]} />
                        </li>
                    )
                })
                :
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', alignItems: 'center', justifyContent: 'center', width: condensedWidth }}>
                    {Object.entries(familyData).map(genus => {
                        return (
                            <li key={genus[0]}>
                                <div>
                                    <img src={Object.values(genus[1])[0].images[0]} style={{ height: '150px' }}
                                    />
                                </div>
                                {/* <img src={Object.entries(family[0])[0][0].images[0]} /> */}
                            </li>
                        )
                    })}
                </ul>
            }
        </Taxonomy>
    )
}

export default Family