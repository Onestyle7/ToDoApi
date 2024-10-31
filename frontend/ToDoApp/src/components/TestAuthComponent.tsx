import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const TestComponent: React.FC = () => {
    const { user, login, logout, isAuthenticated } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        login(username, password);
    };

    return (
        <div>
            <h2>Test Auth Component</h2>
            <p>Zalogowany użytkownik: {user ? user.name : "Brak"}</p>
            <p>Token: {user ? "TOKEN!@##!" : "Brak"}</p>
            <p>Czy zalogowany: {isAuthenticated() ? "Tak" : "Nie"}</p>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Zaloguj</button>
            <button onClick={logout}>Wyloguj</button>
        </div>
    );
};

export default TestComponent;
