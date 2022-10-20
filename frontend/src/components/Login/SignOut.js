import useAuth from '../../auth/useAuth'

const SignOut = () => {
    const {authed, handleLogout } = useAuth()
    
    return (
        <button type='button' onClick={handleLogout}>
            Sign Out
        </button>
    )
}

export default SignOut