import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import { ReactComponent as ColoredLogo } from '../../images/feather logo scarlet.svg'
import { ReactComponent as WhiteLogo } from '../../images/feather logo white.svg'
import { ThemeContext } from '../../utils/ThemeContextManagement'

const Logo = () => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const styling = {
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
        }
    }
    return (
        <section style={styling.siteLogo}>
            {theme.dark ? <WhiteLogo style={styling.logoImage} title='Feather Trace' /> : <ColoredLogo style={styling.logoImage} title='Feather Trace' />}
            <h1 style={styling.logoText}>
                <span>
                    Feather
                </span>
                <span>
                    Trace
                </span>
            </h1>
        </section>
    )
}

export default Logo