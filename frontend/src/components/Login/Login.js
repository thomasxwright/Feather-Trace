import { useContext, useState } from "react"
import axios from 'axios'
import useAuth from '../../auth/useAuth'
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContextManagement";

const Login = ({ setShowLogin }) => {
    let navigate = useNavigate()

    const { handleLogin } = useAuth()

    const [msg, setMsg] = useState({
        text: '',
        success: false,
    })

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    function handleFormChange(event) {
        const { name, value, type, checked } = event.target
        setLoginData(prevloginData => ({
            ...prevloginData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const response = await axios({
                method: 'POST',
                data: {
                    email: loginData.email,
                    password: loginData.password,
                },
                url: '/login',
                withCredentials: true,
            })
            console.log('From Server:', response.data.user);
            setMsg({
                text: response.data.message.msgBody,
                success: true
            })
            console.log(response.data.user)
            handleLogin(response.data.user)
            setShowLogin(false)
        } catch (err) {
            console.log(err)
            setMsg({
                text: err.response.data.message.msgBody,
                success: false,
            })
        }
    }

    const hideLogin = (event) => {
        event.preventDefault()
        setShowLogin(false)
    }

    const { theme } = useContext(ThemeContext)
    const styling = {
        width: '100%',
        alignSelf: 'flex-start',
        color: theme.text,
        input: {
            backgroundColor: theme.filters.inner,
            color: theme.text,
            border: `1px solid ${theme.filters.border}`,
            borderRadius: '4px',
            fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif"
        },
        button: {
            backgroundColor: theme.filters.inactive,
            color: theme.text
        }
    }

    return (
        <section style={styling}>
            <form onSubmit={handleSubmit}>
                <label>
                    <p style={{ marginBottom: '4px' }}>Email</p>
                    <input type="text" onChange={handleFormChange} name='email' placeholder='Email' style={styling.input} />
                </label>
                <label>
                    <p style={{ marginBottom: '4px' }}>Password</p>
                    <input type="password" onChange={handleFormChange} name='password' placeholder='Password' style={styling.input} />
                </label>
                <div>
                    <button type="submit" style={styling.button}>Log in</button>
                    <button onClick={hideLogin} style={styling.button}>Cancel</button>
                </div>
            </form>
            <div
                className={
                    msg.success
                        ? 'text-success text-center'
                        : 'text-warning text-center'
                }
            >
                {msg ? msg.text : ''}
            </div>
        </section>
    )
}

export default Login