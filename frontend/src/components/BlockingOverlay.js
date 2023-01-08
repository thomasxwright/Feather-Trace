const BlockingOverlay = ({ expandGroup, isExpanded, setIsExpanded, colors, zIndex }) => {

    const [r, g, b] = colors
    const styling = {
        width: '100%',
        height: '100%',
        bottom: '0px',
        left: '0px',
        position: 'absolute',
        display: isExpanded ? 'inherit' : 'inherit',
        pointerEvents: isExpanded ? 'none' : 'auto',
        opacity: isExpanded ? '0' : '1',
        transition: 'opacity 0.25s',
        background: `linear-gradient(to top, rgba(${r}, ${g}, ${b}, 1) 2%, rgba(${r}, ${g}, ${b}, 0.2) 6%, rgba(${r}, ${g}, ${b}, 0) 80% )`,
        zIndex: zIndex
    }

    const handleClick = e => {
        expandGroup(e, isExpanded, setIsExpanded)
        // if (e.classList.contains('species'))
        e.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="overlay" style={styling} onClick={e => handleClick(e.currentTarget.parentElement)}></div>
    )
}

export default BlockingOverlay