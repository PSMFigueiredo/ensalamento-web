import React, { useState } from "react";
import styled from "styled-components";
import api from "../services/api.ts";

const ProfessorRegister: React.FC = () => {
    const [name, setName] = useState("");
    const [registration, setRegistration] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       setError("");
       setSuccess(false);

       try  {
           const response = await api.post("/professors", {
               nome: name,
               matricula: registration,
               cargaHoraria: Number (cargaHoraria),
           });

           console.log("Professor cadastrado com sucesso:", response.data);
           setSuccess(true);
       } catch (error:any) {
           console.error("Erro ao cadastrar professor:", error);
           setError(error.response?.data?.message || "Erro ao cadastrar professor.");
       }
    };

    return (
        <Container>
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
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Carga Horária"
                        value={cargaHoraria}
                        onChange={(e) => setCargaHoraria(e.target.value)}
                    />
                    <Button type="submit">Cadastrar</Button>
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

export default ProfessorRegister;
