import GainAccess from "./GainAccess"
import useAuth from '../../auth/useAuth'
import SignOut from "./SignOut"

const AccountSection = () => {

    const {authed} = useAuth()

  return (authed ? <SignOut/> : <GainAccess/>)
  
}

export default AccountSection