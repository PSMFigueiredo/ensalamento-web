import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import Header from "../components/Header.tsx";
import styled from "styled-components";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const success = await login(email, password);
            if (success) {
                navigate("/dashboard");
            } else {
                setError("Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError("Ocorreu um erro ao tentar logar.");
        }
    };

    return (
        <Container>
            <Header />
            <Card>
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">Entrar</Button>
                </Form>
            </Card>
        </Container>
    );
};

// Estilos
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
    width: 100%;
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

export default LoginPage;
