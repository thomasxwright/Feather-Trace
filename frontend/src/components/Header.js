import { useContext, useState } from 'react'
import AccountSection from './Login/AccountSection'
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import useAuth from '../auth/useAuth'
import { useScreenModeContext } from '../auth/useScreenMode'
import ThemePicker from './ThemePicker'
import { ThemeContext } from '../utils/ThemeContextManagement'

const Header = () => {

    const { authed } = useAuth()
    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const styling = {
        color: theme.text,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        siteLogo: {
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '8px'
        },
        logoImage: {
            maxWidth: screenMode !== 'narrow' ? '65px' : '50px',
            marginRight: '5px'
        },
        logoText: {
            margin: '4px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }

    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    const accountControls = { showLogin, setShowLogin, showSignUp, setShowSignUp }


    return (
        <>
            <header style={styling}>
                <div style={{ display: 'flex' }}>
                    <AccountSection accountControls={accountControls} />
                    <ThemePicker/>
                </div>
                <section style={styling.siteLogo}>
                    <img src={require('../images/placeholder logo.png')} style={styling.logoImage} />
                    {
                        screenMode !== 'narrow' && <h1 style={styling.logoText}>
                            <span style={styling.header}>
                                Feather
                            </span>
                            <span style={styling.header}>
                                Trace
                            </span>
                        </h1>
                    }
                </section>
            </header>
            {showSignUp && !authed && <SignUp setShowSignUp={setShowSignUp} />}
            {showLogin && !authed && <Login setShowLogin={setShowLogin} />}
        </>
    )
}

export default Header