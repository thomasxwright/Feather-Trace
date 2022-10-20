import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import useAuth from '../../auth/useAuth'

const GainAccess = () => {
    const { authed, handleLogout } = useAuth()


    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    const handleShowSignUp = () => {
        setShowLogin(false)
        setShowSignUp(true)
    }

    const handleShowLogin = () => {
        setShowLogin(true)
        setShowSignUp(false)
    }

    return (<>

        <button onClick={handleShowLogin}>Login</button>
        <button onClick={handleShowSignUp}>Sign up</button>

        <div>
            {showLogin && <Login />}
            {showSignUp && <SignUp />}
        </div>
    </>
    )
}

export default GainAccess