import { useContext, useState } from 'react'
import AccountSection from './Login/AccountSection'
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import useAuth from '../auth/useAuth'
import { useScreenModeContext } from '../auth/useScreenMode'
import ThemePicker from './ThemePicker'
import { ThemeContext } from '../utils/ThemeContextManagement'
import { ReactComponent as Logo } from '../images/feather logo scarlet.svg'
import { ReactComponent as WhiteLogo } from '../images/feather logo white.svg'

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
            alignItems: 'center',
            marginTop: '8px',
            ...screenMode !== 'desktop' && {marginRight: '12px'}
        },
        logoImage: {
            width: screenMode !== 'narrow' ? '40px' : '36px',
            marginRight: '5px',
            // transform: 'scale(-1, 1) rotate(-100deg)'
            // ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        },
        logoText: {
            margin: '-4px 0 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingTop: '8px',
            fontSize: '1.4em',
            color: theme.dark ? 'white' : 'black', //'#682145',
            // fontFamily: " 'Signika', 'Jumper', 'Zabal', 'Uni Neue', 'Adlinnaka', 'Gontserrat', 'Tango sans', 'Proxima Nova', 'Roboto', 'Nunito', 'Helvetica Neue', sans-serif",
            fontFamily: " 'Jumper', 'Roboto', 'Helvetica Neue', sans-serif", //Signika
            fontWeight: theme.dark ? '400' : '600'
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
                    <ThemePicker />
                </div>
                <section style={styling.siteLogo}>
                    {theme.dark ? <WhiteLogo style={styling.logoImage} title='Feather Trace' /> : <Logo style={styling.logoImage} title='Feather Trace' />}
                    {screenMode !== 'narrow' && <h1 style={styling.logoText}>
                        <span style={{ marginLeft: '-16px' }}>
                            Feather
                        </span>
                        <span style={{ marginTop: '-4px' }}>
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