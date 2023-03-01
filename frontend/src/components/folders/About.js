import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import Dialog from './Dialog'
import Logo from './Logo'

const About = ({ setMessage }) => {

    const { theme } = useContext(ThemeContext)
    const styling = {
        text: {
            margin: '8px 0'
        }
    }
    return (
        <Dialog>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ alignSelf: 'center' }}><Logo /></div>
                <div style={styling.text}>Welcome! At FeatherTrace you can explore North American birds.</div>
                <div style={styling.text}>Tap a taxonomy to step into it, and then use the taxonomy path to step back out.</div>
                <div style={styling.text}>Keep going until you click into a specific bird -- then check out photos, facts, and bird calls.</div>
                <div style={styling.text}>You can track your bird sightings if you make an account.</div>
                <div style={styling.text}>Set your home state:</div>
                <div style={styling.text}>Set your theme: </div>
                <button style={{ alignSelf: 'center', cursor: 'pointer', backgroundColor: theme.filters.applyButton, color: theme.text }} onClick={() => setMessage(null)}>Get started</button>
            </div>
        </Dialog>
    )
}

export default About