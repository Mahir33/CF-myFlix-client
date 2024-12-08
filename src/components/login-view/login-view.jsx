import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LoginView = ({ onLoggedIn }) => {
    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: usernameLogin,
            Password: passwordLogin
        }
    
        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        fetch("https://myflix-api-mahir-941afb3e93ba.herokuapp.com/login", settings)
        .then(response => response.json())
        .then(data => {
            console.log('Login response: ', data);
            console.log("Token is: ", data.token);
            if(data.user){
                onLoggedIn(data.user, data.token);
            } else{
                console.log('User not found');
            }
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Login failed");
        });
    }
    
    if(logout){
        setUsernameLogin("");
        setPasswordLogin("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username-login">Username:
                    <input 
                        type="text" 
                        id='username-login'
                        onChange={e => setUsernameLogin(e.target.value)}
                        value={usernameLogin}
                        required
                        min={6}
                        placeholder='Username'
                        />
                </label>
                <label htmlFor="password-login">Password:
                    <input 
                        type="password" 
                        id='password-login'
                        onChange={e => setPasswordLogin(e.target.value)}
                        value={passwordLogin}
                        required
                        minLength={6}
                        placeholder='Password'
                        />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}

export default LoginView;