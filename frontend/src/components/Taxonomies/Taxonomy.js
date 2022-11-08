import { useState } from "react"
import { useScreenModeContext } from "../../auth/useScreenMode"
import BlockingOverlay from "../BlockingOverlay"
import CladeHeader from "../CladeHeader"

const Taxonomy = ({values, children}) => {
    const { cladeName, cladeType, isExpanded, setIsExpanded, zIndex, backgroundColor, headerColor, additionalStyle } = values
    // console.log(values)
    // const [isExpanded, setIsExpanded] = useState(true)
    const screenMode = useScreenModeContext()

    const styling = {
        hoverColor: 'rgba(255, 255, 255, 0.15)',
        outer: {
            cursor: isExpanded ? 'auto' : 'pointer',
            maxHeight: isExpanded ? 'none' : '550px',
            // height: 'fit-content',
            overflow: isExpanded ? 'visible' : 'hidden',
            position: 'relative',
            padding: '16px 8px 8px',
            margin: '8px 4px 10px',
            // listStyle: 'none',
            borderRadius: '13px',
            backgroundColor,
            narrow: {
                padding: '16px 2px 4px',
                margin: '8px 4px 4px',
            }
        }
    }

    return (
        <section style={{ ...styling.outer, ...styling.outer[screenMode], ...additionalStyle }}>
            <BlockingOverlay isExpanded={isExpanded} setIsExpanded={setIsExpanded} colors={headerColor} zIndex={zIndex} />
            <CladeHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} cladeName={cladeName} cladeType={cladeType} hoverColor={styling.hoverColor} />
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                {children}
            </ul>
        </section>
    )
}

export default Taxonomy