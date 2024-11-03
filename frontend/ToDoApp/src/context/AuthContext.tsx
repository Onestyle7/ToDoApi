import React, { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "../services/axiosConfig";

interface User {
    name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean;
    error: string | null;
    successMessage: string | null;
    register: (username: string, email: string, password: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Dodanie successMessage

    const login = async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post("/api/Auth/login", {
                username,
                password,
            });
            const { token } = response.data;
            setUser({ name: username });
            setToken(token);
            localStorage.setItem("token", token);
            setError(null);
            setSuccessMessage(null); // Reset successMessage po zalogowaniu
        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid credentials or server error");
        }
    };

    const register = async (username: string, email: string, password: string, role: string) => {
        try {
            const response = await axiosInstance.post("/api/Auth/register", { username, email, password, role });
            setSuccessMessage("Rejestracja zakończona sukcesem. Możesz się teraz zalogować.");
            setError(null); // Reset błędu po pomyślnej rejestracji
        } catch (error) {
            console.error("Registration failed:", error);
            setError("Registration failed");
            setSuccessMessage(null); // Reset successMessage w przypadku błędu
        }
    };
    
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = () => !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, error, successMessage, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
