import React from "react"
import axios from 'axios'
import useAuth from '../../auth/useAuth'
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate()

    const { handleLogin } = useAuth()

    const [msg, setMsg] = React.useState({
        text: '',
        success: false,
    })

    const [loginData, setLoginData] = React.useState({
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
        } catch (err) {
            console.log(err)
            setMsg({
                text: err.response.data.message.msgBody,
                success: false,
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={handleFormChange} name='email' placeholder='Email'/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={handleFormChange} name='password' placeholder='Password' />
                </label>
                <div>
                    <button type="submit">Log in</button>
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
        </>
    )
}

export default Login