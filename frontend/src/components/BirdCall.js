const BirdCall = ({ call }) => {
    call = [{ fileData: 'http://upload.wikimedia.org/wikipedia/commons/e/e1/Accipiter_gentilis_-_Northern_Goshawk_XC124806.ogg', type: 'audio/ogg' }]
    return (
        <audio controls>
            {call.map((fileData, i) => {
                <source key={i} src={fileData.src} type={fileData.fileType} />
            }
            )}
        </audio>
    )
}

export default BirdCall