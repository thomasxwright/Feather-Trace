import { useContext, useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import useAuth from '../../auth/useAuth'
import { ThemeContext } from "../../utils/ThemeContextManagement"

const GainAccess = ({ accountControls }) => {

    const { theme } = useContext(ThemeContext)
    const styling = {
        backgroundColor: theme.filters.inactive,
        color: theme.text
    }
    const { showLogin, setShowLogin, showSignUp, setShowSignUp } = accountControls

    const handleShowSignUp = () => {
        setShowLogin(false)
        setShowSignUp(true)
    }

    const handleShowLogin = () => {
        setShowLogin(true)
        setShowSignUp(false)
    }

    return (
        <section>
            <button onClick={handleShowLogin} style={styling}>Login</button>
            <button onClick={handleShowSignUp} style={styling}>Sign up</button>
        </section>
    )
}

export default GainAccess