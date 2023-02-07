import GainAccess from "./GainAccess"
import useAuth from '../../auth/useAuth'
import SignOut from "./SignOut"
import userIcon from '../../images/account circle.svg'

const AccountSection = ({ accountControls }) => {

  const { authed, user } = useAuth()

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
        <img src={userIcon} style={{width: '25px'}} alt={user.userName} />
        <span style={styling.name}>{user.userName}</span>
      </div>
      < SignOut />
    </section>
    )
    :
    <GainAccess accountControls={accountControls} />)

}

export default AccountSection