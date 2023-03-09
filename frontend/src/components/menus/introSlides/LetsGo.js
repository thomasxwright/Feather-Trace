import { useContext } from "react"
import { ThemeContext } from "../../../utils/ThemeContextManagement"
import Logo from "../../Logo"
import Slide from "./Slide"

const LetsGo = ({ setMessage }) => {

    const confirmFinished = () => {
        localStorage.setItem('veteran', 'true')
        setMessage(null)
    }

    const { theme } = useContext(ThemeContext)
    const styling = {
        text: {
            margin: '12px 0',
            textAlign: 'center'
        },
        button: {
            cursor: 'pointer',
            backgroundColor: theme.filters.applyButton,
            color: theme.text
        }
    }
    return (
        <Slide>
            <Logo />
            <div style={styling.text}>That's the gist of it!</div>
            <div style={styling.text}>You can set your home state or change your theme in the settings.</div>
            <button tabIndex={-1} style={styling.button} onClick={confirmFinished}>Let's go!</button>
        </Slide>
    )
}

export default LetsGo