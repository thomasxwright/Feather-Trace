import { useContext } from 'react'
import { useScreenModeContext } from '../../auth/useScreenMode'
import { ThemeContext } from '../../utils/ThemeContextManagement'
import { ReactComponent as CloseIcon } from '../../images/close.svg'

const FilterTag = ({ filterValue, children, resetFilterValue }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)
    const styling = {
        outermostBox: {
            borderRadius: filterValue ? '0 8px 8px 0' : '8px',
            backgroundColor: filterValue ? theme.filters.active : theme.filters.inactive,
            display: 'flex',
            height: screenMode !== 'narrow' ? '55px' : '38px',
            margin: screenMode !== 'narrow' ? '7px 15px' : '4px 8px'
        },
        outerBox: {
            display: 'flex',
            padding: filterValue ? '5px 16px 5px 16px' : '5px 12px',
        },
        image: {
            height: '70%',
            alignSelf: 'center',
            backgroundColor: theme.filters.x,
            padding: screenMode !== 'narrow' ? '12px 4px' : '12px 0px',
            opacity: '0.6',
            cursor: 'pointer',
        },
        words: {
            padding: '0 10px',
            textAlign: 'center',
        }
    }

    return (
        <div style={styling.outermostBox}>

            {filterValue && <CloseIcon style={styling.image} onClick={resetFilterValue} />}
            <div style={styling.outerBox}>
                {children}
            </div>
        </div>
    )
}

export default FilterTag