import { useState } from "react"
import BlockingOverlay from "../BlockingOverlay"
import CladeHeader from "../CladeHeader"
import Family from "./Family"
import Taxonomy from "./Taxonomy"

const Order = ({ orderData, orderName }) => {
    const howManySubgroups = Object.values(orderData).length
    const [isExpanded, setIsExpanded] = useState(true)

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.15)'
    }

    const values = {
        isExpanded,
        setIsExpanded,
        zIndex: 4,
        cladeName: orderName,
        cladeType: 'order',
        backgroundColor: '#B4A7C5',
        headerColor: [180, 167, 197]
    }

    let condensedWidth = 'auto'
    if (howManySubgroups > 3 && howManySubgroups < 8)
        condensedWidth = '450px'
    else if (howManySubgroups < 18)
        condensedWidth = '650px'
    else if (howManySubgroups >= 18)
        condensedWidth = '100%'

        console.log(`loaded order ${orderName}   ${new Date().getSeconds()}`)

    return (
        <Taxonomy values={values}>
            {isExpanded ?
                Object.entries(orderData).map(family => {
                    return (
                        <li key={family[0]}>
                            <Family familyData={family[1]} familyName={family[0]} />
                        </li>
                    )
                })
                :
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', justifyContent: 'center', maxWidth: condensedWidth, paddingRight: '4px' }}>
                    {Object.entries(orderData).map(family => {
                        return (
                            <li key={family[0]}>
                                <div style={{lineHeight: '0'}}>
                                    <img src={Object.values(family[1])[0][0].images[0]} style={{ height: '150px', outline: '4px solid white', margin: '4px 0 0 4px' }} loading='lazy'
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

export default Order