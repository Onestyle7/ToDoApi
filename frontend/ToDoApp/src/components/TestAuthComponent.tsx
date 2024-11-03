import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchProtectedData } from "../services/authService";

const TestComponent: React.FC = () => {
    const { user, login, logout, isAuthenticated, error } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [protectedData, setProtectedData] = useState(null);

    const handleLogin = () => {
        login(username, password);
    };

    const handleFetchData = async () => {
        try {
            const data = await fetchProtectedData();
            setProtectedData(data);
        } catch (error) {
            console.error("Nie udało się pobrać danych chronionych");
        }
    };

    return (
        <div>
            <h2>Test Auth Component</h2>
            <p>Zalogowany użytkownik: {user ? user.name : "Brak"}</p>
            <p>Token: {user ? "TOKEN!@##!" : "Brak"}</p>
            <p>Czy zalogowany: {isAuthenticated() ? "Tak" : "Nie"}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
            <button onClick={handleFetchData}>Pobierz dane chronione</button>

            {protectedData && <pre>{JSON.stringify(protectedData, null, 2)}</pre>}
        </div>
    );
};

export default TestComponent;
