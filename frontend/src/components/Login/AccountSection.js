import GainAccess from "./GainAccess"
import useAuth from '../../auth/useAuth'
import SignOut from "./SignOut"
import {useScreenModeContext} from '../../auth/useScreenMode'

const AccountSection = () => {

  const { authed, user } = useAuth()
  const hamObj = useScreenModeContext()
  // console.log(hamObj, new Date().getMilliseconds())

  // const ham = useScreenMode()
  // console.log(ham)

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