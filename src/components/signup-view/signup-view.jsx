import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignupView = () => {

    const [usernameSignup, setUsernameSignup] = useState("");
    const [passwordSignup, setPasswordSignup] = useState("");
    const [emailSignup, setEmailSignup] = useState("");
    const [birthdaySignup, setBirthdaySignup] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: usernameSignup,
            Password: passwordSignup,
            Email: emailSignup,
            Birthday: birthdaySignup
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("https://myflix-api-mahir-941afb3e93ba.herokuapp.com/users", settings)
        .then(response => {
            if(response.ok){
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        })
        
    }

    return (
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group controlId="username-signup">
                <Form.Label className='w-100'>Username:
                    <Form.Control
                        type="text"
                        name="username-signup"
                        value={usernameSignup}
                        onChange={e => setUsernameSignup(e.target.value)}
                        required
                        minLength={5}
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group controlId="password-signup">
                <Form.Label className='w-100'>Password:
                    <Form.Control
                        type="password"
                        name="password-signup"
                        value={passwordSignup}
                        onChange={e => setPasswordSignup(e.target.value)}
                        required
                        minLength={5}
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group controlId="email-signup">
                <Form.Label className='w-100'>Email:
                    <Form.Control
                        type="email"
                        name="email-signup"
                        value={emailSignup}
                        onChange={e => setEmailSignup(e.target.value)}
                        required
                    />
                </Form.Label>
            </Form.Group>
            <Form.Group controlId="birthday-signup">
                <Form.Label className='w-100'>Birthday:
                    <Form.Control
                        type="date"
                        name="birthday-signup"
                        value={birthdaySignup}
                        onChange={e => setBirthdaySignup(e.target.value)}
                        required
                    />
                </Form.Label>
            </Form.Group>
            <br />
            <Button type="submit" variant="primary" className='w-100'>Sign Up</Button>
        </Form>
    )
}

export default SignupView;