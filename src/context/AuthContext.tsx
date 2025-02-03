import React, { createContext, useContext, useEffect, useState } from "react";
import { login as authLogin } from "../services/authService";
import { logout as authLogout } from "../services/authService";



interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);


    const login = async (email: string, senha: string): Promise<boolean> => {
        try {
            const response = await authLogin(email, senha); // Usando a função do authService.ts

            if (response.success) {
                console.log("Token salvo no localStorage:", localStorage.getItem("token"));
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

const logout = () => {
    authLogout();
    setIsAuthenticated(false);
};
