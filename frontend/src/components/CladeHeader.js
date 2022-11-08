import expandContract from "../utils/expandContract"
import arrow from "../images/arrow down.svg"
import { useState } from "react"
const cladeNumbers = require('../utils/cladeNumbers.json')

const CladeHeader = ({ isExpanded, setIsExpanded, cladeName, cladeType, hoverColor }) => {

    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }


    const styling = {
        frame: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            paddingLeft: '12px',
            marginBottom: '12px'
        },
        image: {
            height: '23px',
            opacity: '0.25'
        },
        tally: {
            // marginLeft: '35px',
            opacity: isExpanded ? '0.12' : '0.5',
            // position: 'absolute',
            // left: '20%',
            transition: 'opacity 0.3s'
        }
    }

    return (
        <section
            style={isHovered ? { ...styling.frame, backgroundColor: hoverColor } : styling.frame}
            onClick={e => expandContract(e.currentTarget.parentElement, isExpanded, setIsExpanded)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <img src={arrow} style={isExpanded ? styling.image : { ...styling.image, transform: 'rotate(-90deg)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>{cladeName}</span>
                {cladeNumbers[cladeType] && <span style={isHovered ? { ...styling.tally, opacity: 0.6 } : styling.tally}>{cladeNumbers[cladeType][cladeName]} bird{cladeNumbers[cladeType][cladeName] > 1 && 's'}</span>}
            </div>
        </section>
    )
}

export default CladeHeader