import React, { useState } from 'react';

const LoginView = ({ onLogin }) => {
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
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                onLogin(data.user, data.token);
            } else{
                console.log('User not found');
            }
        })
        .catch(err => console.log(err));
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:
                    <input 
                        type="text" 
                        id="username-login" 
                        name="username"
                        onChange={e => setUsernameLogin(e.target.value)}
                        value={usernameLogin}
                        required
                        min={6}
                        maxLength={12}
                        placeholder='Username'
                        />
                </label>
                <label htmlFor="password">Username:
                    <input 
                        type="password" 
                        id="password-login" 
                        name="password"
                        onChange={e => setPasswordLogin(e.target.value)}
                        value={passwordLogin}
                        required
                        minLength={6}
                        maxLength={30}
                        placeholder='Password'
                        />
                </label>
                <br />
                <button onClick={onLogin} type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginView;