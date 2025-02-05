import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.tsx";

const CadastroTurmaPage: React.FC = () => {
    const [nome, setNome] = useState("");
    const [message, setMessage] = useState("");

    const handleCadastrar = async () => {
        setMessage("");

        if (!nome) {
            setMessage("Por favor, preencha o nome da turma.");
            return;
        }

        try {
            const turma = { nome };
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Usuário não autenticado. Faça login novamente.");
                return;
            }

            const response = await axios.post(
                "http://localhost:3000/turmas",
                turma,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setMessage("Turma cadastrada com sucesso!");
                setNome("");
            } else {
                setMessage("Erro ao cadastrar turma.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar turma:", error);
            setMessage("Ocorreu um erro ao cadastrar a turma.");
        }
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Cadastrar Turma</h1>

                    <div style={styles.filters}>
                        <input
                            type="text"
                            placeholder="Nome da Turma"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={styles.input}
                        />
                        <button onClick={handleCadastrar} style={styles.button}>
                            Cadastrar
                        </button>
                    </div>

                    {message && <p style={styles.message}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

// Estilos
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
        backgroundColor: "#f5f5f5",
        marginTop: "280px",
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#8f9bb3",
        textAlign: "center",
    },
    filters: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "20px",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 15px",
        fontSize: "14px",
        backgroundColor: "#00509E",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    message: {
        textAlign: "center",
        fontSize: "14px",
        color: "green",
        marginTop: "10px",
    },
};

export default CadastroTurmaPage;
