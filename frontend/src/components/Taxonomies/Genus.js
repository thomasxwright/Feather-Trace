import { useState } from "react"
import BlockingOverlay from "../BlockingOverlay"
import CladeHeader from "../CladeHeader"
import Bird from "./Bird"
import Taxonomy from "./Taxonomy"

const Genus = ({ genusData, genusName }) => {

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.2)',
        bgColor: 'rgb(217, 230, 234)'
    }
    const howManySubgroups = Object.values(genusData).length
    // const [isExpanded, setIsExpanded] = useState(howManySubgroups === 1)
    const [isExpanded, setIsExpanded] = useState(false)

    const values = {
        isExpanded,
        setIsExpanded,
        zIndex: 2,
        cladeName: genusName,
        cladeType: 'genus',
        backgroundColor: '#D9E6EA',
        headerColor: [217, 230, 234]
    }

    let condensedWidth = 'auto'
    if (howManySubgroups > 3 && howManySubgroups < 8)
        condensedWidth = '450px'
    else if (howManySubgroups < 18)
        condensedWidth = '650px'
    else if (howManySubgroups >= 18)
        condensedWidth = '100%'


        console.log(`loaded genus ${genusName}  ${new Date().getSeconds()}`)


    return (
        <Taxonomy values={values}>
            {/* {Object.entries(genusData).map(species => {
                return (
                    <li key={species[1]._id}>
                        <Bird bird={species[1]} />
                    </li>
                )
            })} */}



            {isExpanded ?
                Object.entries(genusData).map(species => {
                    return (
                        <li key={species[1]._id}>
                            <Bird bird={species[1]} />
                        </li>
                    )
                })
                :
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', justifyContent: 'center', maxWidth: condensedWidth, paddingRight: '4px' }}>
                    {genusData.map(species => {
                        return (
                            <li key={species._id}>
                                <div style={{lineHeight: '0'}}>
                                    <img src={species.images[0]} style={{ height: '150px', outline: '4px solid white', margin: '4px 0 0 4px', maxWidth: '350px' }} loading='lazy'
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

export default Genus