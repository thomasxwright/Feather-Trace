import { useState } from "react"
import BlockingOverlay from "../BlockingOverlay"
import CladeHeader from "../CladeHeader"
import Bird from "./Bird"
import Taxonomy from "./Taxonomy"
import expandContract from "../../utils/expandContract"

const Genus = ({ genusData, genusName, setGenusData, order, family }) => {

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.2)',
        bgColor: 'rgb(217, 230, 234)'
    }
    const speciesIds = genusData.map(species => species._id)

    const howManySubgroups = Object.values(genusData).length
    const isAbbreviated = !Boolean(genusData[0].wikiUrl)
    // const [isExpanded, setIsExpanded] = useState(howManySubgroups === 1)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isLoading, setIsLoading] = useState(isAbbreviated)

    // TODO: possibly just have it do the request and then call the existing function for expandgroup?
    const expandGroup = (target, isExpanded, setIsExpanded) => {
        if (!isExpanded && isAbbreviated) {    //Fetch the bird data!

            const findSpeciesData = async () => {
                const res = await fetch(`/birds/completeData?ids=${speciesIds.join(',')}`, { credentials: 'include' })
                const data = await res.json()
                setGenusData(order, family, genusName, data)
                setIsLoading(false)
                return data
            }
            const birds = findSpeciesData()
        }
        expandContract(target, isExpanded, setIsExpanded)
    }

    const values = {
        expandGroup,
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
                            <Bird bird={species[1]} isLoading={isLoading} />
                        </li>
                    )
                })
                :
                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', justifyContent: 'center', maxWidth: condensedWidth, paddingRight: '4px' }}>
                    {genusData.map(species => {
                        return (
                            <li key={species._id}>
                                <div style={{ lineHeight: '0' }}>
                                    <img src={species.images[0]} style={{ height: '90px', outline: '4px solid white', margin: '4px 0 0 4px', maxWidth: '320px' }} loading='lazy'
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