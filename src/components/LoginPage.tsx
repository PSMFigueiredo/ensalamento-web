import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

const LoginPage: React.FC = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate("/")
        } else {
            setError("Credenciais inválidas. Tente novamente.");
        }

        //Aqui entra a logica de autenticacao
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            <form onSubmit={handleLogin} style={styles.form}>
                <label style={styles.label}>
                    Usuário:
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    style={styles.input}
                    placeholder="Digite seu usuário"
                    />
                </label>
                <label style={styles.label}>
                    Senha:
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    style={styles.input}
                    placeholder="Digite a sua senha"
                    />
                </label>
                <button type="submit" style={styles.button}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center" as const,
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "10px",
    },
    label: {
        display: "flex",
        flexDirection: "column" as const,
        fontWeight: "bold",
        color: "#555",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default LoginPage;