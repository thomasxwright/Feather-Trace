import { useState } from 'react'
import useAuth from '../../../utils/auth/useAuth'
import Login from './Login'
import SignUp from './SignUp'
import SignOut from './SignOut'
import Dialog from '../Dialog'

const AccountSection = ({ setMessage }) => {
    const { authed, user } = useAuth()

    const [showNewAccountForm, setShowNewAccountForm] = useState(false)

    const toggleForm = () => {
        setShowNewAccountForm(!showNewAccountForm)
    }
    return (
        <Dialog>
            <section onClick={e => e.stopPropagation()}>
                {authed ? <SignOut setMessage={setMessage} user={user} /> :
                    (
                        showNewAccountForm ?
                            <SignUp setMessage={setMessage} toggleForm={toggleForm} />
                            :
                            <Login setMessage={setMessage} toggleForm={toggleForm} />
                    )
                }
            </section>
        </Dialog>
    )
}

export default AccountSection