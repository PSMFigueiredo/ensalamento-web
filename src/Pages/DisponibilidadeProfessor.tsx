import React, { useState, useEffect } from "react";
import api from "../services/api";
import styled from "styled-components";

const DisponibilidadeProfessor: React.FC = () => {
    const [professors, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const apiProfessors = async () => {
            try {
                const response = await api.get("/professors");
                setProfessors(response.data.data.professores);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
            }
        };
        apiProfessors();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const data = {
            diaDaSemana: dayOfWeek,
            inicioHora: startTime,
            fimHora: endTime,
            professorId: selectedProfessor
        };
        console.log("Enviando dados:", data);

        try {
            const response = await api.post("/disponibilidades-professores", data);
            if (response.status === 201) {
                setMessage("Disponibilidade cadastrada com sucesso!");
                console.log(data)
                console.log("Dados enviados para API:", JSON.stringify(data, null, 2));

            }
        } catch (error) {
            console.error("Erro ao cadastrar disponibilidade:", error);
            setMessage("Erro ao cadastrar disponibilidade.");
        }
    };

    return (
        <Container>
            <Card>
                <Title>Cadastrar Disponibilidade</Title>
                <Form onSubmit={handleRegister}>
                    <Label>Professor:</Label>
                    <Select value={selectedProfessor} onChange={(e) => setSelectedProfessor(e.target.value)} required>
                        <option value="">Selecione um professor</option>
                        {professors.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                                {prof.nome}
                            </option>
                        ))}
                    </Select>

                    <Label>Dia da Semana:</Label>
                    <Select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} required>
                        <option value="">Selecione um dia</option>
                        <option value="Segunda-feira">Segunda-feira</option>
                        <option value="Terça-feira">Terça-feira</option>
                        <option value="Quarta-feira">Quarta-feira</option>
                        <option value="Quinta-feira">Quinta-feira</option>
                        <option value="Sexta-feira">Sexta-feira</option>
                        <option value="Sábado">Sábado</option>
                    </Select>

                    <Label>Horário de Início:</Label>
                    <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

                    <Label>Horário de Fim:</Label>
                    <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

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
`;

const Card = styled.div`
    background: #fff;
    padding: 30px;
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

const Label = styled.label`
    font-size: 16px;
    color: #333;
`;

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    color: green;
    margin-top: 10px;
`;

export default DisponibilidadeProfessor;
