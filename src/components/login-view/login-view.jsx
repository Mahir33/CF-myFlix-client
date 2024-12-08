import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    

    return (
        <div>
            <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group controlId="username-login">
                    <Form.Label className='w-100'>Username:
                        <Form.Control 
                            type="text" 
                            onChange={e => setUsernameLogin(e.target.value)}
                            value={usernameLogin}
                            required
                            min={6}
                            placeholder='Username'
                            />
                    </Form.Label>
                </Form.Group>
                <Form.Group controlId="password-login">
                    <Form.Label className='w-100'>Password:
                        <Form.Control 
                            type="password" 
                            onChange={e => setPasswordLogin(e.target.value)}
                            value={passwordLogin}
                            required
                            minLength={6}
                            placeholder='Password'
                            />
                    </Form.Label>
                </Form.Group>
                <br />
                <Button type="submit" variant="primary" className='w-100'>Login</Button>
            </Form>
        </div>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}

export default LoginView;