import { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username-signup">Username:
                <input
                    type="text"
                    id="username-signup"
                    name="username-signup"
                    value={usernameSignup}
                    onChange={e => setUsernameSignup(e.target.value)}
                    required
                    minLength={5}
                />
            </label>
            <label htmlFor="password-signup">Password:
                <input
                    type="password"
                    id="password-signup"
                    name="password-signup"
                    value={passwordSignup}
                    onChange={e => setPasswordSignup(e.target.value)}
                    required
                    minLength={5}
                />
            </label>
            <label htmlFor="email-signup">Email:
                <input
                    type="email"
                    id="email-signup"
                    name="email-signup"
                    value={emailSignup}
                    onChange={e => setEmailSignup(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="birthday-signup">Birthday:
                <input
                    type="date"
                    id="birthday-signup"
                    name="birthday-signup"
                    value={birthdaySignup}
                    onChange={e => setBirthdaySignup(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignupView;