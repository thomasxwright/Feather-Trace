import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import Dialog from './Dialog'

const Contact = ({ setMessage }) => {
    const { theme } = useContext(ThemeContext)
    const styling = {
        color: theme.link,
        margin: '20px 0',

    }
    return (
        <Dialog>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '350px' }}>
                <img src={require('../../images/fraug.png')} style={{ width: '150px', borderRadius: '8px' }} />
                <div>Howdy! I'm Thomas. I made FeatherTrace.</div>
                <a target="_blank" style={styling} href="https://thomaswright.netlify.app/">Portfolio</a>
                <a target="_blank" style={styling} href="https://www.linkedin.com/in/thomasxwright/">LinkedIn</a>
                <p style={{ textAlign: 'center' }}>Feedback/questions? Email me! <a style={{ color: theme.link }} href="mailto:admin@feathertrace.com">admin@feathertrace.com</a></p>

                <button style={{ color: theme.text, backgroundColor: theme.filters.applyButton, cursor: 'pointer' }}
                    onClick={() => setMessage(null)}
                >
                    OK, cool
                </button>
            </div>
        </Dialog>
    )
}

export default Contact