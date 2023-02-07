import GainAccess from "./GainAccess"
import useAuth from '../../auth/useAuth'
import SignOut from "./SignOut"

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
    }
  }

  return (authed ?
    (<section style={styling.outer}>
      <span style={styling.name}>{user.userName}</span>
      < SignOut />
    </section>
    )
    :
    <GainAccess accountControls={accountControls} />)

}

export default AccountSection