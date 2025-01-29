import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.tsx";
import Header from "../components/Header.tsx";
import seta from "../assets/seta.png";
import icon1B from "../assets/icon1B.png";
import icon2B from "../assets/icon2B.png";
import icon3B from "../assets/icon3B.png";
import icon4B from "../assets/icon4B.png";

const DashboardPage: React.FC = () => {
    // const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Bem-vindo ao sistema de ensalamento!</h1>
                {/* <button onClick={logout} style={styles.button}>Sair</button> */}

                <div style={styles.cardContainer}>
                    <div style={styles.card} onClick={() => navigate("/classrooms")}>
                        <img src={seta} alt="Icon 1" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Cadastrar Professor</h2>
                        <p style={styles.cardText}>Veja todas as turmas cadastradas e suas informações.</p>
                        <img src={icon1B} alt="Icon 1B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/teachers")}>
                        <img src={seta} alt="Icon 2" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Cadastrar Turma</h2>
                        <p style={styles.cardText}>Veja todos os professores cadastrados e suas disciplinas.</p>
                        <img src={icon2B} alt="Icon 2B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/schedule-builder")}>
                        <img src={seta} alt="Icon 3" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Cadastrar Grade</h2>
                        <p style={styles.cardText}>Monte a grade horária para as turmas.</p>
                        <img src={icon3B} alt="Icon 3B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/register")}>
                        <img src={seta} alt="Icon 4" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Visão Geral</h2>
                        <p style={styles.cardText}>Cadastre um novo usuário no sistema.</p>
                        <img src={icon4B} alt="Icon 4B" style={styles.iconBottom} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        paddingTop: "210px",
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
        marginTop: "40px",
    },
    card: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center" as const,
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    cardTitle: {
        fontSize: "1.5rem",
        color: "#8F9BB3",
        marginTop: "15px",
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
    iconTop: {
        width: "40px",
        height: "40px",
        marginBottom: "15px",
    },
    iconBottom: {
        width: "40px",
        height: "40px",
        marginTop: "15px",
    },
};

export default DashboardPage;