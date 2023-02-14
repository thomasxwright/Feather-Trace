const BirdPhoto = ({ img }) => {

    const styling = {
        normal: {
            borderRadius: '6px',
            width: '100%',
            zIndex: '1',
            position: 'relative'
        },
        masked: {
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%,rgba(0,0,0,1) 20%)'
        }
    }

    return (
        <img src={img.src} alt={img.alt} style={{ ...styling.normal, ...styling.masked }} />
    )
}

export default BirdPhoto