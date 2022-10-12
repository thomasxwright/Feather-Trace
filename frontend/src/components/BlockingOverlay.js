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
        display: isExpanded ? 'inherit' : 'inherit',
        pointerEvents: isExpanded ? 'none' : 'auto',
        opacity: isExpanded ? '0' : '1',
        transition: 'opacity 0.25s',
        background: `linear-gradient(to top, rgba(${r}, ${g}, ${b}, 1) 3%, rgba(${r}, ${g}, ${b}, 0.2) 50%, rgba(${r}, ${g}, ${b}, 0) 80% )`,
        zIndex: zIndex
    }

    const handleClick = e => {
        expandContract(e, isExpanded, setIsExpanded)
        // if (e.classList.contains('species'))
        e.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="overlay" style={styling} onClick={e => handleClick(e.currentTarget.parentElement)}></div>
    )
}

export default BlockingOverlay