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

        console.log(`loaded family ${familyName}  ${new Date().getSeconds()}`)


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
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', justifyContent: 'center', maxWidth: condensedWidth, paddingRight: '4px' }}>
                    {Object.entries(familyData).map(genus => {
                        return (
                            <li key={genus[0]}>
                                <div style={{lineHeight: '0'}}>
                                    <img src={Object.values(genus[1])[0].images[0]} style={{ height: '150px', outline: '4px solid white', margin: '4px 0 0 4px', maxWidth: '320px' }} loading='lazy'
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