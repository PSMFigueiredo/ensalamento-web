import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

const DashboardPage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Dashboard</h1>
            <button onClick={logout} style={styles.button}>Sair</button>
            <p style={styles.subtitle}>Bem-vindo ao sistema de ensalamento! Escolha uma funcionalidade:</p>

            <div style={styles.cardContainer}>
                <div style={styles.card} onClick={() => navigate("/classrooms")}>
                    <h2 style={styles.cardTitle}>Listar Turmas</h2>
                    <p style={styles.cardText}>Veja todas as turmas cadastradas e suas informações.</p>
                </div>

                <div style={styles.card} onClick={() => navigate("/teachers")}>
                    <h2 style={styles.cardTitle}>Listar Professores</h2>
                    <p style={styles.cardText}>Veja todos os professores cadastrados e suas disciplinas.</p>
                </div>

                <div style={styles.card} onClick={() => navigate("/schedule-builder")}>
                    <h2 style={styles.cardTitle}>Montar Grade</h2>
                    <p style={styles.cardText}>Monte a grade horária para as turmas.</p>
                </div>

                <div style={styles.card} onClick={() => navigate("/register")}>
                    <h2 style={styles.cardTitle}>Cadastrar Usuário</h2>
                    <p style={styles.cardText}>Cadastre um novo usuário no sistema.</p>
                </div>
            </div>
        </div>
    );
};

// Estilos inline
const styles = {
    container: {
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center" as const,
    },
    title: {
        fontSize: "2rem",
        color: "#333",
    },
    subtitle: {
        marginTop: "10px",
        marginBottom: "30px",
        color: "#555",
        fontSize: "1.2rem",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
    card: {
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    cardTitle: {
        fontSize: "1.5rem",
        color: "#4CAF50",
    },
    cardText: {
        fontSize: "1rem",
        color: "#555",
        marginTop: "10px",
    },
    cardHover: {
        transform: "scale(1.05)",
        boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    },
    button: {
        padding: "10px",
        backgroundColor: "#F44336",
        color: "#fff",
        border: "none",
        borderRadius: "4px"
    },
};

export default DashboardPage;