import React, { useState } from "react";
import { Form as RouterForm, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import Header from "../components/Header.tsx";
import styled from "styled-components";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    console.log("AuthContext:", useAuth());

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await login(email, password);
        console.log("Sucesso no login:", success)
        if (success) {
            console.log("Redirecionando para a pagina inicial...")
            navigate("/")
        } else {
            console.log("Falha no login")
            setError("Credenciais inválidas. Tente novamente.");
        }

    };

    return (
        <Container>
            <Header />
            <Card>
                <Title>Login</Title>
                <Form onSubmit={handleLogin}>
                    <Input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Senha" value={password}
                        onChange={(e) => setpassword(e.target.value)} />
                    <Button type="submit">Entrar</Button>
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
    margin-top: 80px;
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
`




export default LoginPage;