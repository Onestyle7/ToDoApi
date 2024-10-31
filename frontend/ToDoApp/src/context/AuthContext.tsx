import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";


interface User {
    name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>; // Zmiana typów
    logout: () => void;
    isAuthenticated: () => boolean;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post("http://localhost:5287/api/Auth/login", {
                username,
                password,
            });
            const { token } = response.data;
            setUser({ name: username });
            setToken(token);
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = () => !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
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
