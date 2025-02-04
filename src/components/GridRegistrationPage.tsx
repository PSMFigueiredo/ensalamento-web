import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Importando o Axios e o tipo AxiosError
import styled from "styled-components";
import Header from "../components/Header.tsx"; // Supondo que o cabeçalho seja um componente já existente

// Definir o tipo de erro esperado da API
interface ErrorResponse {
    message: string;
}

const GradeHorarioPage: React.FC = () => {
    const [ano, setAno] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Função de envio dos dados para o backend usando Axios
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validações simples
        if (!ano || !disciplina) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await axios.post("/api/grade-horaria", {
                ano,
                disciplina,
            });

            if (response.status === 200) {
                setSuccess(true);
                setError("");  // Limpa o erro caso o envio seja bem sucedido
                console.log("Cadastro realizado:", response.data);
            }
        } catch (err) {
            // Usando AxiosError para tipar corretamente o erro
            const axiosError = err as AxiosError<ErrorResponse>; // Tipando a resposta de erro

            // Acessando corretamente a mensagem de erro
            setError(axiosError.response?.data?.message || "Erro ao cadastrar grade horária.");
            console.error("Erro ao enviar dados:", axiosError);
        }
    };

    return (
        <Container>
            <Header /> {/* Adicionando o cabeçalho */}
            <Content>
                <Title>Cadastrar Grade Horária</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>Cadastro realizado com sucesso!</SuccessMessage>}
                <Form onSubmit={handleSubmit}>
                    {/* Campo Ano */}
                    <Label htmlFor="ano">Ano</Label>
                    <Input
                        type="number"
                        id="ano"
                        placeholder="Digite o ano"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                    />

                    {/* Campo Disciplinas */}
                    <Label htmlFor="disciplinas">Disciplinas</Label>
                    <DisciplinasContainer>
                        {[
                            "Português",
                            "Matemática",
                            "História",
                            "Artes",
                            "Educação Física",
                            "Ensino Religioso",
                            "Ciências da Natureza",
                            "Inglês",
                            "Geografia",
                        ].map((disciplinaItem) => (
                            <RadioButtonLabel key={disciplinaItem}>
                                <RadioButton
                                    type="radio"
                                    name="disciplina"
                                    value={disciplinaItem}
                                    checked={disciplina === disciplinaItem}
                                    onChange={(e) => setDisciplina(e.target.value)}
                                />
                                {disciplinaItem}
                            </RadioButtonLabel>
                        ))}
                    </DisciplinasContainer>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    );
};

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  margin-top: 280px;
`;

const Content = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h1`
  fontSize: "2rem",
  text-align: center;
  margin-bottom: 20px;
  color: #8f9bb3; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #8f9bb3;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #00509e;
  }
`;

const DisciplinasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioButtonLabel = styled.label`
  font-size: 16px;
  color: #000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RadioButton = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #8f9bb3;
  border-radius: 50%;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #00509e;
  border: none;
  border-radius: 8px;
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

export default GradeHorarioPage;
