import styled from "styled-components";
import Header from "../components/Header.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

const GridPage: React.FC = () => {
    const location = useLocation();
    const [grade, setGrade] = useState(location.state?.grade || []);    const [error, setError] = useState("");


    useEffect(() => {
        fetchGrade();
    }, []);

    const fetchGrade = async () => {
        try {
            const response = await axios.get("http://localhost:3000/gerar-grade", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            console.log("Resposta da API:", response.data);

            if (response.data && typeof response.data === "object") {
                setGrade(response.data.grade);
            } else {
                setError("Formato de resposta inesperado da API.");
            }
        } catch (error) {
            console.error("Erro ao buscar grade horária:", error);
            setError("Erro ao carregar a grade horária.");
        }
    };

    return (
        <Container>
            <Header />
            <Title>Grade Horária</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {grade ? (
                <Table>
                    <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Segunda</th>
                        <th>Terça</th>
                        <th>Quarta</th>
                        <th>Quinta</th>
                        <th>Sexta</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i}>
                            <td>{i + 1}º Horário</td>
                            {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"].map((dia) => (
                                <td key={dia}>
                                    <span>{grade?.[dia]?.[i]?.disciplina || "Sem disciplina"}</span>
                                    <br />
                                    <small>{grade?.[dia]?.[i]?.professor || "Sem professor"}</small>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>Carregando...</p>
            )}
        </Container>
    );
};

// Estilos
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    //min-height: 100vh;
    padding: 20px;
    margin-top: 200px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 90%;
    border-collapse: collapse;
    margin-top: 20px;
    padding: 10px;

    th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #00509E;
        color: white;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

export default GridPage;
