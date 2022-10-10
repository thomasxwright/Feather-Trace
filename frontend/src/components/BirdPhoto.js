const BirdPhoto = ({ src, isExpanded }) => {

    const styling = {
        normal: {
            borderRadius: '6px',
            width: '100%',
            zIndex: '1',
            position: 'relative'
        },
        masked: {
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%,rgba(0,0,0,1) 20%)'
        }
    }

    return (
        <section><img src={src} style={isExpanded ? styling.normal : { ...styling.normal, ...styling.masked }} /></section>
    )
}

export default BirdPhoto