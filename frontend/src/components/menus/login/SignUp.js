import { useContext, useState } from 'react';
import useAuth from '../../../utils/auth/useAuth'
import axios from 'axios';
import { ThemeContext } from '../../../utils/ThemeContextManagement';

function SignUp({ setMessage, toggleForm }) {

    const { theme } = useContext(ThemeContext)

    const { handleLogin } = useAuth()
    const [msg, setMsg] = useState({
        text: '',
        success: false,
    });

    const [signUpData, setSignUpData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    function handleFormChange(event) {
        const { name, value, type, checked } = event.target;
        setSignUpData(prevSignUpData => ({
            ...prevSignUpData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = async event => {
        event.preventDefault();
        // console.log(signUpData, 'Sign Up Attempt Sent');
        try {
            const response = await axios({
                method: 'POST',
                data: {
                    userName: signUpData.userName,
                    email: signUpData.email,
                    password: signUpData.password,
                    confirmPassword: signUpData.confirmPassword,
                },
                url: '/signup',
                withCredentials: true,
            });
            setMsg({
                text: response.data.message.msgBody,
                success: true,
            });
            handleLogin(response.data.user)
            setMessage(null)
            // setShowSignUp(false) 
        } catch (err) {
            setMsg({
                text: err.response.data.message.msgBody,
                success: false,
            });
            console.log(err.response);
        }
    }

    const styling = {
        width: '100%',
        alignSelf: 'flex-start',
        color: theme.text,
        input: {
            backgroundColor: theme.filters.inner,
            color: theme.text,
            border: `1px solid ${theme.filters.border}`,
            borderRadius: '4px',
            margin: '2px',
            fontFamily: "Roboto Slab, 'Roboto', 'Helvetica Neue', sans-serif"
        },
        button: {
            backgroundColor: theme.filters.applyButton,
            color: theme.text,
            cursor: 'pointer'
        }
    }

    return (
        <div style={styling}>
            <h2 style={{ margin: '0 0 8px' }}>Create an Account</h2>
            <button style={{ ...styling.button, marginLeft: '0px' }}
                onClick={toggleForm}>
                Log in to an account
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='userName'
                    placeholder='Username'
                    onChange={handleFormChange}
                    style={styling.input}
                />
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={handleFormChange}
                    style={styling.input}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleFormChange}
                    style={styling.input}
                />
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    onChange={handleFormChange}
                    style={styling.input}
                />
                <button style={styling.button} type='submit' >Create User</button>
                <button onClick={() => { setMessage(null) }} style={styling.button}>Cancel</button>
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
        </div>
    );
}

export default SignUp;
