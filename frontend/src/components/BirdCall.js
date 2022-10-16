const BirdCall = ({ calls }) => {
    let vor = [{ src: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/f/f…sserculus_sandwichensis_-_Savannah_Sparrow_-_XC82760.ogg.mp3', fileType: 'audio/ogg' }]
    return (

        <audio
            controls
            src={calls[0].src}>
        </audio>
    )
}

export default BirdCall