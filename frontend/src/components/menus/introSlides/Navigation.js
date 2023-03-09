import { ReactComponent as TaxonomiesLight } from '../../../images/taxonomy navigation light.svg'
import { ReactComponent as TaxonomiesDark } from '../../../images/taxonomy navigation dark.svg'
import { ReactComponent as TaxonomiesShortLight } from '../../../images/taxonomy navigation short light.svg'
import { ReactComponent as TaxonomiesShortDark } from '../../../images/taxonomy navigation short dark.svg'
import { ReactComponent as HomeLight } from '../../../images/home navbutton light.svg'
import { ReactComponent as HomeDark } from '../../../images/home navbutton dark.svg'
import Slide from './Slide'
import { useContext } from 'react'
import { ThemeContext } from '../../../utils/ThemeContextManagement'
import { useScreenModeContext } from '../../../utils/useScreenMode'

const Navigation = () => {
    const { theme } = useContext(ThemeContext)
    const screenMode = useScreenModeContext()
    const styling = {
        text: {
            margin: '8px 0'
        },
        capsuleContainer: {
            padding: '5%',
            backgroundColor: theme.dark ? 'black' : theme.background,
            width: '90%',
            borderRadius: '80px'
        }
    }
    return (
        <Slide>
            <p style={styling.text}>Tap a group of birds to see what's inside that taxonomy.</p>
            <div style={styling.capsuleContainer}>
                {screenMode !== 'narrow' ?
                    (theme.dark ? <TaxonomiesDark /> : <TaxonomiesLight />)
                    :
                    (theme.dark ? <TaxonomiesShortDark /> : <TaxonomiesShortLight />)
                }
            </div>
            <p style={styling.text}>To step out of a taxonomy, use the navigator trail.</p>
            <p style={styling.text}>The {theme.dark ? <HomeDark style={{ width: '24px' }} /> : <HomeLight style={{ width: '24px' }} />} button will take you back to the outermost layer.</p>
        </Slide>
    )
}

export default Navigation