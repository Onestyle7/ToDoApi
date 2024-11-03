import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const RegisterForm: React.FC = () => {
    const { register, error, successMessage } = useAuth(); // Dodanie successMessage do destrukturyzacji
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User"); 

    const handleRegister = () => {
        register(username, email, password, role);
    };

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleRegister}>Zarejestruj się</Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </Form>
    );
};

export default RegisterForm;
