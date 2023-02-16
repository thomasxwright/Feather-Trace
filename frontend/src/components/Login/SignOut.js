import { useContext } from 'react'
import useAuth from '../../auth/useAuth'
import { ThemeContext } from '../../utils/ThemeContextManagement'

const SignOut = () => {
    const { authed, handleLogout } = useAuth()
    const { theme } = useContext(ThemeContext)
    const styling = {
        backgroundColor: theme.filters.inactive,
        color: theme.text
    }

    return (
        <button type='button' onClick={handleLogout} style={styling}>
            Sign Out
        </button>
    )
}

export default SignOut