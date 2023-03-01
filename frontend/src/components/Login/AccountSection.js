import GainAccess from "./GainAccess"
import useAuth from '../../auth/useAuth'
import SignOut from "./SignOut"
import UserIcon from '../../images/account circle.svg'
// import { ReactComponent as UserIcon } from '../../images/account circle.svg'
import { useContext } from "react"
import { ThemeContext } from "../../utils/ThemeContextManagement"

const AccountSection = ({ accountControls }) => {

  const { authed, user } = useAuth()

  const { theme } = useContext(ThemeContext)
  const styling = {
    name: {
      fontWeight: '500',
      fontSize: '1.1em',
      margin: '4px'
    },
    outer: {
      display: 'flex',
      flexDirection: 'column',
      width: 'fit-content'
    },
    user: {
      display: 'flex',
      alignItems: 'center'
    }
  }

  return (authed ?
    (<section style={styling.outer}>
      <div style={styling.user}>
        <UserIcon color={theme.text} width='28px' title={user.userName}/>
        <span style={styling.name}>{user.userName}</span>
      </div>
      < SignOut />
    </section>
    )
    :
    <GainAccess accountControls={accountControls} />)

}

export default AccountSection