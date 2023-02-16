import { useContext, useState } from 'react';
import useAuth from '../../auth/useAuth'
import axios from 'axios';
import { ThemeContext } from '../../utils/ThemeContextManagement';

function SignUp({ setShowSignUp }) {

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
        console.log(signUpData, 'Sign Up Attempt Sent');
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
            console.log('From Server:', response);
            setMsg({
                text: response.data.message.msgBody,
                success: true,
            });
            handleLogin(response.user)
            setShowSignUp(false)
        } catch (err) {
            setMsg({
                text: err.response.data.message.msgBody,
                success: false,
            });
            console.log(err.response);
        }
    };

    const hideSignUp = (event) => {
        event.preventDefault()
        setShowSignUp(false)
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
            backgroundColor: theme.filters.inactive,
            color: theme.text
        }
    }

    return (
        <div style={styling}>
            <h1>Sign Up</h1>
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
                <button style={styling.button}>Create User</button>
                <button onClick={hideSignUp} style={styling.button}>Cancel</button>
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
