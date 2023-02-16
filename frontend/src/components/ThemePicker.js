import { useContext } from 'react'
import themes from '../utils/themes'
import { ThemeContext } from '../utils/ThemeContextManagement'

const ThemePicker = () => {

    const styling = {
        margin: '0 4px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        cursor: 'pointer'
    }

    const { theme, setTheme } = useContext(ThemeContext)

    const handleClick = themeName => e => {
        localStorage.setItem('theme', themeName)
        setTheme(themeName)
    }

    return (
        <ul style={{ listStyle: 'none', margin: '4px', display: 'flex', flexWrap: 'wrap' }}>
            {Object.entries(themes).map(([name, content]) => (
                <li
                    style={{ ...styling, backgroundColor: content.taxonomies.order }}
                    onClick={handleClick(name)}
                    key={name}
                ></li>
            ))}
        </ul>
    )
}

export default ThemePicker