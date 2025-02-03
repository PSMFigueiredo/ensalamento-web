import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.tsx";

const CadastroTurmaPage: React.FC = () => {
    const [nome, setNome] = useState(""); // Nome da turma
    const [turno, setTurno] = useState(""); // Turno (Diurno, Noturno, Integral)

    // Função para enviar os dados ao backend
    const handleCadastrar = async () => {
        if (!nome || !turno) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const turma = { nome, turno };

            // Envia os dados para o backend via API usando axios
            const response = await axios.post("http://localhost:3000/turmas", turma);

            if (response.status === 201) {
                alert("Turma cadastrada com sucesso!");
                setNome(""); // Limpar o campo de nome após o cadastro
                setTurno(""); // Limpar o campo de turno após o cadastro
            } else {
                alert("Erro ao cadastrar turma.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar turma:", error);
            alert("Ocorreu um erro ao cadastrar a turma.");
        }
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Digite as informações abaixo:</h1>

                <div style={styles.filters}>
                    <input
                        type="text"
                        placeholder="Nome da Turma"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        style={styles.input}
                    />
                    <select
                        value={turno}
                        onChange={(e) => setTurno(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Selecione o Turno</option>
                        <option value="Diurno">Diurno</option>
                        <option value="Noturno">Noturno</option>
                        <option value="Integral">Integral</option>
                    </select>
                    <button onClick={handleCadastrar} style={styles.button}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Manter os estilos com 'as const' para corrigir problemas de tipagem.
const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center" as const // Adicionando 'as const' para que o valor seja aceito como 'center', 'left', etc.
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#8f9bb3"
    },
    form: {
        display: "flex",
        justifyContent: "space-between", // Para colocar os campos lado a lado
        gap: "20px",
        marginBottom: "20px",
    },
    filters: {
        display: "flex",
        flexDirection: "column" as const, // Adicionando 'as const' para garantir que 'flexDirection' seja tratado corretamente
        gap: "20px",
        marginBottom: "20px"
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        flex: 1 // Faz com que o campo ocupe todo o espaço disponível
    },
    select: {
        padding: "10px",
        borderRadius: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        paddingRight: "10px",
        flex: 1 // Faz com que o campo ocupe todo o espaço disponível
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
};

export default CadastroTurmaPage;
