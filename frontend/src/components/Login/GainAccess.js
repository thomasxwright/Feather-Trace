import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import useAuth from '../../auth/useAuth'

const GainAccess = ({ accountControls }) => {
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
        <section style={{ backgroundColor: 'coral' }}>
            <button onClick={handleShowLogin}>Login</button>
            <button onClick={handleShowSignUp}>Sign up</button>
        </section>
    )
}

export default GainAccess