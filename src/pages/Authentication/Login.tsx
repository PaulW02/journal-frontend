import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

const Login = () => {
    const [keycloak, setKeycloak] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const initKeycloak = async () => {
            const kcOptions = {
                // Replace with your Keycloak server URL, realm name, and client ID
                url: 'http://localhost:8181', // Replace with your Keycloak server URL
                realm: 'Journal', // Replace with your realm name
                clientId: 'journal-frontend', // Replace with your client ID
                flow: 'custom-login'
            };
            const kc = new Keycloak(kcOptions);

            await kc.init({ onLoad: 'login-recheck' });
            setKeycloak(kc);
        };

        initKeycloak();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await keycloak.login({ username, password });
            // Handle successful login (e.g., redirect to protected routes)
            console.log('Logged in successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {keycloak ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Login;
