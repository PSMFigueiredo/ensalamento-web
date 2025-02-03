import React, { useState } from "react";
import Header from "../components/Header.tsx";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService.ts";
import styled from "styled-components";

const RegisterPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        setSuccess(false);

        console.log("Usuário:", name);
        console.log("Email:", email);
        console.log("Senha:", password);

        const response = await register(name, email, password);
        if (response.success) {
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000)
        } else {
            setError(response.message);
        }
    };

    return (

        <Container>
            <Header />
            <Card>
                <Title>Cadastro</Title>
                <Form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>Cadastro realizado com sucesso! Redirecionando...</SuccessMessage>}
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Card>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;  /* Alinha o conteúdo ao topo */
    background-color: #f5f5f5;
    width: 100%;
    min-height: calc(100vh - 230px);  /* Garante que o conteúdo ocupe o restante da tela */
    padding: 0 20px;  /* Adiciona algum espaçamento nas laterais */
`;

const Card = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin-top: 280px;
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

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 14px;
    text-align: center;
`;

export default RegisterPage;