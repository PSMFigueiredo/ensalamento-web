import React from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.tsx";
import Header from "../components/Header.tsx";
import seta from "../assets/seta.png";
import icon1B from "../assets/icon1B.png";
import icon2B from "../assets/icon2B.png";
import icon3B from "../assets/icon3B.png";
import icon4B from "../assets/icon4B.png";
import icon5B from "../assets/icon5B.png";
import icon6B from "../assets/icon6B.png";

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
                    <div style={styles.card} onClick={() => navigate("/RegisterProfessor")}>
                        <img src={seta} alt="Icon 1" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Professor</h2>
                        <p style={styles.cardText}>Cadastre um novo professor no sistema.</p>
                        <img src={icon1B} alt="Icon 1B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/teachers")}>
                        <img src={seta} alt="Icon 2" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Turma</h2>
                        <p style={styles.cardText}>Cadastre uma nova turma no sistema.</p>
                        <img src={icon2B} alt="Icon 2B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/grid")}>
                        <img src={seta} alt="Icon 3" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Grade</h2>
                        <p style={styles.cardText}>Monte a grade horária para as turmas.</p>
                        <img src={icon3B} alt="Icon 3B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/subject")}>
                        <img src={seta} alt="Icon 5" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Disciplinas</h2>
                        <p style={styles.cardText}>Atribua as disciplinas ao professor selecionado.</p>
                        <img src={icon5B} alt="Icon 5B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/available")}>
                        <img src={seta} alt="Icon 6" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Disponibilidades</h2>
                        <p style={styles.cardText}>Cadastre / Edite a Disponibilidade dos Professores no Sistema.</p>
                        <img src={icon6B} alt="Icon 6B" style={styles.iconBottom} />
                    </div>

                    <div style={styles.card} onClick={() => navigate("/listpage")}>
                        <img src={seta} alt="Icon 4" style={styles.iconTop} />
                        <h2 style={styles.cardTitle}>Geral</h2>
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
        margin: "250px auto",
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
        marginTop: "0px",
    },
    cardText: {
        fontSize: "1rem",
        color: "#555",
        marginTop: "0px",
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
    },
};

export default DashboardPage;