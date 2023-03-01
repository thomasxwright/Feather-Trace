import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import RoundedBlock from './RoundedBlock'

const Dialog = ({ children }) => {
    const { theme } = useContext(ThemeContext)

    const stylingAdjust = {
        backgroundColor: theme.dark ? theme.taxonomies.family : theme.background,
        color: theme.text,
        zIndex: 4,
        height: 'fit-content',
        maxWidth: 'calc(90%-40px)',
        width: 'fit-content',
        margin: '20px',
        cursor: 'auto',
        overflow: 'scroll',
        maxHeight: 'calc(90vh - 40px)',
        scrollbarWidth: 'none'
    }

    return (
        <RoundedBlock stylingAdjustments={stylingAdjust} handleClick={e=> e.stopPropagation()} hideScroll={true}>
            {children}
        </RoundedBlock>
    )
}

export default Dialog