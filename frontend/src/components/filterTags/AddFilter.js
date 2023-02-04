import { useScreenModeContext } from "../../auth/useScreenMode"

const AddFilter = () => {

    const screenMode = useScreenModeContext()
    const styling = {
        display: 'flex',
        alignItems: 'center',
        height: screenMode === 'narrow' ? '32px' : '45px',
        backgroundColor: 'rgb(41, 167, 167)', // rgb(41, 167, 167)  or rgb(114, 214, 214)
        borderRadius: '8px',
        margin: '7px 12px',
        padding: '5px 12px',
    }


    return <span style={styling}>Apply the changes</span>
}

export default AddFilter