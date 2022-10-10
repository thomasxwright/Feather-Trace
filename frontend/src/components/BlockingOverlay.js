import expandContract from "../utils/expandContract"

const BlockingOverlay = ({ styling, isExpanded, setIsExpanded, colors, zIndex }) => {

    const [r, g, b] = colors
    styling = {
        ...styling,
        width: '100%',
        height: '100%',
        bottom: '0px',
        left: '0px',
        position: 'absolute',
        display: isExpanded ? 'none' : 'inherit',
        background: `linear-gradient(to top, rgba(${r}, ${g}, ${b}, 1) 3%, rgba(${r}, ${g}, ${b}, 0.2) 50%, rgba(${r}, ${g}, ${b}, 0) 80% )`,
        zIndex: zIndex
    }
    return (
        <div className="overlay" style={styling} onClick={e => expandContract(e.currentTarget.parentElement, isExpanded, setIsExpanded)}></div>
    )
}

export default BlockingOverlay