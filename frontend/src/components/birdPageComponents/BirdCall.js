const BirdCall = ({ calls }) => {
    let vor = [{ src: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/f/f…sserculus_sandwichensis_-_Savannah_Sparrow_-_XC82760.ogg.mp3', fileType: 'audio/ogg' }]
    return (

        <audio
            controls
            preload='none'
            src={calls[0].src}
            style={{borderRadius: '0 0 8px 8px', width: '100%'}}>
        </audio>
    )
}

export default BirdCall