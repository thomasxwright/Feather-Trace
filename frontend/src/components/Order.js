import { useState } from "react"
import BlockingOverlay from "./BlockingOverlay"
import CladeHeader from "./CladeHeader"
import Family from "./Family"

const Order = ({ orderData, orderName }) => {
    const [isExpanded, setIsExpanded] = useState(true)

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.15)'
    }

    return (
        <ul className="order" style={isExpanded ? {position: 'relative'} : {position: 'relative', cursor: 'pointer'}}>
            <BlockingOverlay styling={styling.overlay} isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[180, 167, 197]} zIndex={4}/>
            <CladeHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} cladeName={orderName} cladeType={'order'} hoverColor={styling.hoverColor}/>
            {Object.entries(orderData).map(family => {
                return (
                    <li key={family[0]}>
                        <Family familyData={family[1]} familyName={family[0]} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Order