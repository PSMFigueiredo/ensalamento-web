import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);


    const login = async (email: string, senha: string): Promise<boolean> => {
        try {
            const response = await api.post("/usuarios/login", { email, senha });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("token", token);
                setIsAuthenticated(true);
                return true;
            }
        } catch (error) {
            console.error("Erro ao autenticar:", error);
        }

        return false;
    };


    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
