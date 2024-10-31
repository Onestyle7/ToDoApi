import React from "react";
import { AuthProvider } from "./context/AuthContext";
import TestAuthComponent from "./components/TestAuthComponent";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <TestAuthComponent />
        </AuthProvider>
    );
};

export default App;
