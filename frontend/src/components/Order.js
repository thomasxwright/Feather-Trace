import { useState } from "react"
import BlockingOverlay from "./BlockingOverlay"
import CladeHeader from "./CladeHeader"
import Family from "./Family"

const Order = ({ orderData, orderName }) => {
    const [isExpanded, setIsExpanded] = useState(Object.values(orderData).length < 4)
    console.log(orderName, Object.entries(orderData))
    console.log(Object.values(orderData)[0])

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.15)'
    }

    return (
        <ul className="order" style={isExpanded ? { position: 'relative' } : { position: 'relative', cursor: 'pointer' }}>
            <BlockingOverlay isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={[180, 167, 197]} zIndex={4} />
            <CladeHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} cladeName={orderName} cladeType={'order'} hoverColor={styling.hoverColor} />

            {isExpanded ?
                Object.entries(orderData).map(family => {
                    return (
                        <li key={family[0]}>
                            <Family familyData={family[1]} familyName={family[0]} />
                        </li>
                    )
                })
                :
                <div>
                    <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
                        {Object.entries(orderData).map(family => {
                            return (
                                <li key={family[0]}>
                                    <div>
                                        <img src={Object.values(family[1])[0][0].images[0]} style={{width: '120px'}}
                                        />
                                    </div>
                                    {/* <img src={Object.entries(family[0])[0][0].images[0]} /> */}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }

        </ul>
    )
}

export default Order