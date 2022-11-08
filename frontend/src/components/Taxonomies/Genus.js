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
console.log(isExpanded, genusData)
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
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', alignItems: 'center', justifyContent: 'center' }}>
                    {genusData.map(species => {
                        return (
                            <li key={species._id}>
                                <div>
                                    <img src={species.images[0]} style={{ height: '150px' }}
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