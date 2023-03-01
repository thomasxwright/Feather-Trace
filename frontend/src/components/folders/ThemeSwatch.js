import React, { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeContextManagement'

const ThemeSwatch = ({themeFull}) => {

    const [name, content] = themeFull
    const { theme, setTheme } = useContext(ThemeContext)
    const styling = {
        outer: {
            display: 'flex',
            borderRadius: '15px',
            overflow: 'hidden',
            width: '80px',
            height: '25px',
            margin: '4px 4px',
            cursor: 'pointer',
            boxShadow: '1px 1px 3px rgb(0 0 0 / 0.15)',//`1px 1px 3px ${content.text}`,
            position: 'relative'
        },
        diagonalCrop: {
            transform: 'skew(30deg)',
            position: 'absolute',
            left: '0',
            height: '30px',
            margin: '-2px 0 0 -5px',
            overflow: 'hidden'
        },
        colorLayer: {
            height: '100%',
            width: '100%'
        }
    }

    const handleClick = e => {
        localStorage.setItem('theme', name)
        setTheme(name)
    }

    return (
        <div style={styling.outer} onClick={handleClick}>
            <div style={{ ...styling.diagonalCrop, width: '90px'}}>
                <div style={{...styling.colorLayer, backgroundColor: content.taxonomies.species}}></div>
            </div>
            <div style={{ ...styling.diagonalCrop, width: '65px'}}>
                <div style={{...styling.colorLayer, backgroundColor: content.taxonomies.genus}}></div>
            </div>
            <div style={{ ...styling.diagonalCrop, width: '45px'}}>
                <div style={{...styling.colorLayer, backgroundColor: content.taxonomies.family}}></div>
            </div>
            <div style={{ ...styling.diagonalCrop, width: '25px'}}>
                <div style={{...styling.colorLayer, backgroundColor: content.taxonomies.order}}></div>
            </div>
            {/* <div style={{ ...styling.inner, backgroundColor: content.filters.inactive, width: '10px' }}></div>
            <div style={{ ...styling.inner, backgroundColor: content.filters.active, width: '10px' }}></div>
            <div style={{ ...styling.inner, backgroundColor: content.filters.applyButton, width: '10px' }}></div> */}
        </div>
    )
}

export default ThemeSwatch