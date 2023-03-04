import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import RoundedBlock from './RoundedBlock'

const Dialog = ({ children, stylingAdjustments = {} }) => {
    const { theme } = useContext(ThemeContext)
    const screenMode = useScreenModeContext()

    const stylingAdjust = {
        backgroundColor: theme.dark ? theme.taxonomies.family : theme.background,
        color: theme.text,
        zIndex: 4,
        height: 'fit-content',
        maxWidth: screenMode === 'narrow' ? 'calc(90%-40px)' : '600px',
        width: 'fit-content',
        margin: '20px',
        cursor: 'auto',
        overflow: 'scroll',
        maxHeight: 'calc(90vh - 40px)',
        scrollbarWidth: 'none',
        ...stylingAdjustments
    }

    return (
        <RoundedBlock stylingAdjustments={stylingAdjust} handleClick={e=> e.stopPropagation()} hideScroll={true}>
            {children}
        </RoundedBlock>
    )
}

export default Dialog