import { useContext } from 'react'
import { useScreenModeContext } from '../utils/useScreenMode'
import { ThemeContext } from '../utils/ThemeContextManagement'
import { ReactComponent as Menu } from '../images/menu.svg'
import { ReactComponent as UserIcon } from '../images/account circle.svg'
import useAuth from '../utils/auth/useAuth'
import AccountSection from './menus/login/AccountSection'
import Options from './menus/Options'
import Logo from './Logo'

const HeaderBar = ({ setMessage }) => {
    const { authed, user } = useAuth()
    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const openSignIn = () => {
        setMessage(<AccountSection setMessage={setMessage} />)
    }

    const openOptions = () => {
        setMessage(
        <Options setMessage={setMessage}/>
        )
    }

    const styling = {
        color: theme.text,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        siteLogo: {
            display: 'flex',
            alignItems: 'center',
            ...screenMode !== 'desktop' && { marginRight: '12px' }
        },
        logoImage: {
            width: screenMode !== 'narrow' ? '40px' : '22px',
            marginRight: '5px',
            // transform: 'scale(-1, 1) rotate(-100deg)'
            // ...theme.dark && { filter: 'brightness(.85) contrast(1.1)' }
        },
        logoText: {
            margin: screenMode !== 'narrow' ? '4px 0 0 -16px' : '2px 0 0 -10px',
            display: 'flex',
            lineHeight: '1',
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: screenMode !== 'narrow' ? '1.4em' : '0.8em',
            color: theme.dark ? 'white' : 'black', //'#682145',
            // fontFamily: " 'Signika', 'Jumper', 'Zabal', 'Uni Neue', 'Adlinnaka', 'Gontserrat', 'Tango sans', 'Proxima Nova', 'Roboto', 'Nunito', 'Helvetica Neue', sans-serif",
            fontFamily: " 'Jumper', 'Roboto', 'Helvetica Neue', sans-serif", //Signika
            fontWeight: theme.dark ? '400' : '600'
        },
        hamburger: {
            padding: '0 12px',
            ...screenMode !== 'narrow' && { margin: '0 20px' },
            width: screenMode !== 'narrow' ? '32px' : '24px',
            height: screenMode !== 'narrow' ? '32px' : '24px',
            color: theme.text,
            cursor: 'pointer'
        },
        button: {
            backgroundColor: theme.filters.inactive,
            color: theme.text,
            height: '32px',
            cursor: 'pointer'
        },
        user: {
            display: 'flex',
            alignItems: 'center'
        }
    }

    return (
        <header style={styling}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Menu style={styling.hamburger} onClick={openOptions} />
                <Logo />
            </div>

            <div onClick={openSignIn} style={{cursor: 'pointer'}}>
                {authed ?
                    <div style={styling.user}>
                        <UserIcon color={theme.text} width='28px' title={user.userName} />
                        <span style={styling.name}>{user.userName}</span>
                    </div>
                    :
                    <button style={styling.button} onClick={openSignIn}>Sign in</button>
                }
            </div>

        </header>
    )
}

export default HeaderBar