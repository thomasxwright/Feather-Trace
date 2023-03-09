import { useContext } from "react"
import { useScreenModeContext } from "../../utils/useScreenMode"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const AddFilter = () => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)
    const styling = {
        display: 'flex',
        alignItems: 'center',
        height: screenMode === 'narrow' ? '32px' : '45px',
        backgroundColor: theme.filters.applyButton,//'rgb(41, 167, 167)', // rgb(41, 167, 167)  or rgb(114, 214, 214),
        color: theme.text,
        borderRadius: '8px',
        margin: '7px 12px',
        padding: '5px 12px',
    }


    return <span style={styling}>Apply the changes</span>
}

export default AddFilter