import { useContext } from 'react'
import useAuth from '../../../utils/auth/useAuth'
import { ThemeContext } from '../../../utils/ThemeContextManagement'

const SignOut = ({ setMessage, user }) => {
    const { handleLogout } = useAuth()
    const { theme } = useContext(ThemeContext)
    const styling = {
        backgroundColor: theme.filters.applyButton,
        color: theme.text,
        cursor: 'pointer'
    }

    const logOut = () => {
        try {
            handleLogout()
            setMessage(null)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span>Username: {user.userName}</span>
            <span>Email: {user.email}</span>
            <button type='button' onClick={logOut} style={styling}>
                Sign Out
            </button>
        </div>
    )
}

export default SignOut