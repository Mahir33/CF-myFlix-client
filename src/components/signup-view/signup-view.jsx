import { useState } from 'react';

const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Attempt to register");

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
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
            <label htmlFor="username">Username:
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    minLength={5}
                />
            </label>
            <label htmlFor="password">Password:
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={5}
                />
            </label>
            <label htmlFor="email">Email:
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="birthday">Birthday:
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignupView;