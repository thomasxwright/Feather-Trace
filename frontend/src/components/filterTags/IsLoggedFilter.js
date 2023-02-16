import { useContext } from "react"
import { useScreenModeContext } from "../../auth/useScreenMode"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const IsLoggedFilter = ({ isLogged, setIsLogged }) => {

    const screenMode = useScreenModeContext()
    const { theme } = useContext(ThemeContext)

    const styling = {
        height: '100%',
        margin: '0 8px',
        textAlign: 'center',
        border: 'none',
        backgroundColor: theme.filters.inner,
        color: theme.text,
        fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif",
        option: {
            fontWeight: "100",
            fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif",
        },
        span: {
            fontSize: '.8em',
            narrow: {

            }
        }
    }
    return (
        <div>
            <span style={{ ...styling.span, ...styling.span[screenMode] }}>Birds I</span>
            <select name="isLogged" style={styling} value={isLogged} onChange={e => setIsLogged(e.target.value)}>
                <option value={null} >have/haven't</option>
                <option value={true} >have</option>
                <option value={false} >haven't</option>
            </select >
            <span style={{ ...styling.span, ...styling.span[screenMode] }}>logged</span>
            {/* <input type="checkbox" defaultValue={isLogged} onChange={e => setIsLogged( isLogged)} /> */}
        </div>
    )
}

export default IsLoggedFilter