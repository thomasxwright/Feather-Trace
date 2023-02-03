const AddFilter = () => {

    const styling = {
        outerBox: {
            display: 'flex',
            alignItems: 'center',
            height: '45px',
            backgroundColor: '#E7ECF5',
            margin: '7px 15px',
            padding: '5px 5px 5px 0'
        },
        image: {
            height: '35px',
            backgroundColor: 'rgba(255,255,255, 0.8)',
            padding: '10px',
            marginRight: '5px',
            opacity: '0.6',
            cursor: 'pointer'
        },
        words: {
            padding: '0 10px',
            textAlign: 'center',
            // fontFamily: 'Impact'
        }
    }


    return (
        <div style={styling.outerBox} onClick={()=>console.log('go')}>
            <img style={styling.image} src={require('../../images/add_FILL0_wght400_GRAD0_opsz48.png')} />
            <span style={styling.words}>Apply the changes</span>
        </div>
    )
}

export default AddFilter