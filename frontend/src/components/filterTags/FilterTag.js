import { useScreenModeContext } from '../../auth/useScreenMode'

const FilterTag = ({ filterValue, children, resetFilterValue }) => {

    const screenMode = useScreenModeContext()
    const styling = {
        outerBox: {
            display: 'flex',
            alignItems: 'stretch',
            height: '45px',
            backgroundColor: filterValue ? 'rgb(140, 222, 199)' : '#F0E7F5',
            margin: '7px 15px',
            padding: filterValue ? '5px 16px 5px 0' : '5px 20px',
            borderRadius: filterValue ? '0 8px 8px 0' : '8px',
            narrow: {
                height: '28px',
                margin: '4px 8px',
                padding: filterValue ? '5px 12px 5px 0' : '5px 12px'
            }
        },
        image: {
            height: '35px',
            backgroundColor: 'rgba(255,255,255, 0.8)',
            padding: '10px',
            marginTop: '-5px',
            marginRight: '16px',
            opacity: '0.6',
            cursor: 'pointer',
            narrow: {
                height: '20px'
            }
        },
        words: {
            padding: '0 10px',
            textAlign: 'center',
        }
    }

    return (
        <div style={{ ...styling.outerBox, ...styling.outerBox[screenMode] }}>
            {filterValue && <img style={{ ...styling.image, ...styling.image[screenMode] }} src={require('../../images/close_FILL0_wght400_GRAD0_opsz48.png')} onClick={resetFilterValue} />}
            {children}
        </div>
    )
}

export default FilterTag