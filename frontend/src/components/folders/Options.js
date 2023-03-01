import { useContext } from "react"
import { ThemeContext } from "../../utils/ThemeContextManagement"
import About from "./About"
import Contact from "./Contact"
import Dialog from "./Dialog"
import Logo from "./Logo"
import {ReactComponent as HelpLogo} from "../../images/help.svg"
import {ReactComponent as SettingsLogo} from "../../images/settings.svg"
import {ReactComponent as ContactLogo} from "../../images/mail.svg"
import Settings from "./Settings"

const Options = ({ setMessage }) => {
    const { theme } = useContext(ThemeContext)

    console.log(setMessage)
    const styling = {
        list: {
            listStyle: 'none'
        },
        option: {
            cursor: 'pointer',
            margin: '16px 0',
            display: 'flex',
            alignItems: 'center'
        }
    }

    return (
        <Dialog>
            <section onClick={e => e.stopPropagation()}>
                <Logo />

                <ul style={styling.list}>
                    <li style={styling.option} onClick={() => setMessage(<About setMessage={setMessage} />)}>
                        <HelpLogo color={theme.text} width='28px' height='28px' style={{marginRight: '8px'   }} title='help' />
                        <span>Intro to FeatherTrace</span>
                    </li>
                    <li style={styling.option} onClick={() => setMessage(<Settings setMessage={setMessage} />)}>
                        <SettingsLogo color={theme.text} width='28px' height='28px' style={{marginRight: '8px'   }} title='settings' />
                        <span>Settings</span>
                    </li>
                    <li style={styling.option} onClick={() => setMessage(<Contact setMessage={setMessage} />)}>
                        <ContactLogo color={theme.text} width='28px' height='28px' style={{marginRight: '8px'   }} title='contact' />
                        <span>Contact</span>
                    </li>
                </ul>
            </section>
        </Dialog>
    )
}

export default Options