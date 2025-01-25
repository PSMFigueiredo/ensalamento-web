import React, {useState} from "react";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState("professor");

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Usuário:", username);
        console.log("Email:", email);
        console.log("Senha:", password);
        console.log("Perfil:", profile);

        //logica de envio para o backend
    };
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Cadastro de Usuário</h1>
            <form onSubmit={handleRegister} style={styles.form}>
                <label style={styles.label}>
                    Nome de Usuário:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        placeholder="Digite seu nome de usuário"
                        required
                    />
                </label>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        placeholder="Digite seu email"
                        required
                    />
                </label>
                <label style={styles.label}>
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        placeholder="Digite sua senha"
                        required
                    />
                </label>
                <label style={styles.label}>
                    Perfil:
                    <select
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                        style={styles.select}
                    >
                        <option value="professor">Professor</option>
                        <option value="coordenador">Coordenador/Diretor</option>
                    </select>
                </label>
                <button type="submit" style={styles.button}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

// Estilos inline
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
    select: {
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

export default RegisterPage;
