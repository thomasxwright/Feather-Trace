import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import Dialog from './Dialog'

const Contact = ({setMessage}) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Dialog>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>it's me again.</div>
                <img src={require('../../images/whale.jpg')} style={{ width: '200px' }} />
                <button style={{ color: theme.text, backgroundColor: theme.filters.applyButton, cursor: 'pointer' }}
                    onClick={() => setMessage(null)}
                >
                    Very cool
                </button>
            </div>
        </Dialog>
    )
}

export default Contact