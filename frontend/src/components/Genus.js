import { useState } from "react"
import BlockingOverlay from "./BlockingOverlay"
import Bird from "./Bird"
import CladeHeader from "./CladeHeader"

const Genus = ({ genusData, genusName }) => {

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.37)'
    }

    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <ul className="genus" style={isExpanded ? { position: 'relative' } : { position: 'relative', cursor: 'pointer' }}>
            <BlockingOverlay isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[217, 230, 234]} zIndex={2}/>
            <CladeHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} cladeName={genusName} cladeType={'genus'} hoverColor={styling.hoverColor} />
            {Object.entries(genusData).map(species => {
                return (
                    <li key={species[1]._id}>
                        <Bird bird={species[1]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Genus