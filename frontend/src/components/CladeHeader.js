import expandContract from "../utils/expandContract"
import arrow from "../images/arrow down.svg"
import { useState } from "react"

const CladeHeader = ({ isExpanded, setIsExpanded, cladeName, hoverColor }) => {

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
            cursor: 'pointer'
        },
        image: {
            height: '23px',
            opacity: '0.25'
        }
    }
    return (
        <section
            style={isHovered ? { ...styling.frame, backgroundColor: hoverColor } : styling.frame}
            onClick={e => expandContract(e.currentTarget.parentElement, isExpanded, setIsExpanded)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <img src={arrow} style={isExpanded ? styling.image : { ...styling.image, transform: 'rotate(-90deg)' }} />
            <span>{cladeName}</span>
        </section>
    )
}

export default CladeHeader