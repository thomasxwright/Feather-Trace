import themes from '../utils/themes'
import ThemeSwatch from './folders/ThemeSwatch'

const ThemePicker = ({ setMessage }) => {

    const styling = {
        listStyle: 'none',
        margin: '4px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '200px',
        justifyContent: 'center'
        // alignItems: 'center'
    }
    return (
        <ul style={styling}>
            {Object.entries(themes).map((themeFull, i) => (
                <li key={i}
                >
                    <ThemeSwatch themeFull={themeFull} />
                </li>
            ))}
        </ul>
    )
}

export default ThemePicker