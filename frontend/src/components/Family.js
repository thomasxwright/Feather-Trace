import { useState } from "react"
import BlockingOverlay from "./BlockingOverlay"
import CladeHeader from "./CladeHeader"
import Genus from "./Genus"

const Family = ({ familyData, familyName }) => {

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.2)'
    }

    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <ul className="family" style={isExpanded ? { position: 'relative' } : { position: 'relative', cursor: 'pointer' }}>
            <BlockingOverlay isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[194, 196, 216]} zIndex={3}/>
            <CladeHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} cladeName={familyName} cladeType={'family'} hoverColor={styling.hoverColor} />
            {Object.entries(familyData).map(genus => {
                return (
                    <li key={genus[0]}>
                        <Genus genusData={genus[1]} genusName={genus[0]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Family