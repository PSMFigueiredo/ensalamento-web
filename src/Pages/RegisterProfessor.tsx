import React, { useState } from "react";
import styled from "styled-components";
import api from "../services/api.ts";
import Header from "../components/Header.tsx";

const ProfessorRegister: React.FC = () => {
    const [name, setName] = useState("");
    const [matricula, setMatricula] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!name || !matricula || !cargaHoraria) {
            setMessage("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await api.post("/professors", {
                nome: name,
                matricula: matricula,
                cargaHoraria: Number(cargaHoraria),
            });

            if (response.status === 201) {
                setMessage("Professor cadastrado com sucesso!");


                setName("");
                setMatricula("");
                setCargaHoraria("");
            } else {
                setMessage("Erro ao cadastrar professor.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar professor:", error);
            setMessage("Ocorreu um erro ao cadastrar o professor.");
        }
    };

    return (
        <Container>
            <Header />
            <Card>
                <Title>Cadastrar Professor</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Matrícula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Carga Horária"
                        value={cargaHoraria}
                        onChange={(e) => setCargaHoraria(e.target.value)}
                    />
                    <Button type="submit">Cadastrar</Button>
                    {message && <Message>{message}</Message>}
                </Form>
            </Card>
        </Container>
    );
};


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    margin-top: 80px;
`;

const Card = styled.div`
    margin-top: 100px;
    background: #fff;
    border: 30px;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #00509E;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #007bff;
    }
`;

const Message = styled.p`
    font-size: 14px;
    text-align: center;
    color: ${({ children }) => (children === "Professor cadastrado com sucesso!" ? "green" : "red")};
    margin-top: 10px;
`;

export default ProfessorRegister;
