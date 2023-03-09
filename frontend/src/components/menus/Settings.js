import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import ThemePicker from './ThemePicker'
import Dialog from './Dialog'

const Settings = ({ setMessage }) => {

    const { theme } = useContext(ThemeContext)
    const styling = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        button: {
            backgroundColor: theme.filters.applyButton,
            color: theme.text,
            cursor: 'pointer'
        }

    }


    return (
        <Dialog>
            <div onClick={e => e.stopPropagation()} style={styling}>
                Set yo stuff here
                <div>
                    Home State (optional)
                </div>

                <ThemePicker setMessage={setMessage} />
                <button onClick={() => setMessage(null)} style={styling.button}>All done</button>
            </div>
        </Dialog>
    )
}

export default Settings