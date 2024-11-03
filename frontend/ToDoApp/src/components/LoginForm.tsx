import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        login(username, password);
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Zaloguj</Button>
        </Form>
    );
};

export default LoginForm;
