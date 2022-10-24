import GainAccess from "./GainAccess"
import useAuth from '../../auth/useAuth'
import SignOut from "./SignOut"

const AccountSection = () => {

  const { authed, user } = useAuth()

  return (authed ?
    (<>
      <div>{user.userName}</div>
      < SignOut />
    </>
    )
    :
    <GainAccess />)

}

export default AccountSection