import { useScreenModeContext } from "../../utils/useScreenMode"
import {ReactComponent as AddButton} from "../../images/add new.svg"
const StartNewSighting = ({ showForm }) => {

    const screenMode = useScreenModeContext()

    const styling = {
        outer: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },
        large: {
            fontSize: '160%',
            fontWeight: 'bold'
        },
        icon: {
            margin: screenMode === 'narrow' ? '25px' : '40px'
        }
    }
    return (
        <div style={styling.outer} onClick={() => showForm(true)}>
            <AddButton style={styling.icon} />
            <span style={styling.large}>Add new sighting</span>
        </div>
    )
}

export default StartNewSighting