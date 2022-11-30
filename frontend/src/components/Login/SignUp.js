import React from 'react';
import useAuth from '../../auth/useAuth'
import axios from 'axios';

function SignUp() {

    const {handleLogin } = useAuth()
    const [msg, setMsg] = React.useState({
        text: '',
        success: false,
    });

    const [signUpData, setSignUpData] = React.useState({
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
        } catch (err) {
            setMsg({
                text: err.response.data.message.msgBody,
                success: false,
            });
            console.log(err.response);
        }
    };

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='userName'
                    placeholder='Username'
                    onChange={handleFormChange}
                />
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    onChange={handleFormChange}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleFormChange}
                />
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    onChange={handleFormChange}
                />
                <button>Create User</button>
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
