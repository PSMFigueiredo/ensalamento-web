import React, { useState, useEffect } from "react";
import axios from "axios"; // Usando Axios para as requisições
import styled from "styled-components";
import Header from "../components/Header"; // Cabeçalho

const SubjectPage: React.FC = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Carregar professores ao montar o componente
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get("/professors");
        setProfessors(response.data.data.professores);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };
    fetchProfessors();
  }, []);

  // Função de envio dos dados para o backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Resetando erros

    // Validar se o professor e as disciplinas estão selecionados
    if (!selectedProfessor || selectedDisciplines.length === 0) {
      setError("Por favor, selecione um professor e ao menos uma disciplina.");
      return;
    }

    const data = {
      professorId: selectedProfessor,
      disciplinas: selectedDisciplines,
    };

    try {
      const response = await axios.post("/subject", data);
      if (response.status === 201) {
        setSuccess("Disciplinas atribuídas com sucesso!");
        console.log("Dados enviados:", data);
      }
    } catch (error) {
      console.error("Erro ao atribuir disciplinas:", error);
      setError("Erro ao atribuir disciplinas.");
    }
  };

  // Função para lidar com a seleção das disciplinas
  const handleDisciplineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDisciplines((prev) => [...prev, value]);
    } else {
      setSelectedDisciplines((prev) => prev.filter((disciplina) => disciplina !== value));
    }
  };

  return (
    <Container>
      <Header /> {/* Cabeçalho */}
      <Content>
        <Title>Atribuir Disciplinas</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        <Form onSubmit={handleSubmit}>
          {/* Campo Professor */}
          <Select value={selectedProfessor} onChange={(e) => setSelectedProfessor(e.target.value)} required>
            <option value="">Selecione um professor</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </Select>

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
              <CheckboxLabel key={disciplinaItem}>
                <Checkbox
                  type="checkbox"
                  name="disciplina"
                  value={disciplinaItem}
                  checked={selectedDisciplines.includes(disciplinaItem)}
                  onChange={handleDisciplineChange}
                />
                {disciplinaItem}
              </CheckboxLabel>
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
  font-size: 2rem;
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

const Select = styled.select`
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

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #8f9bb3;
  border-radius: 4px;
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

export default SubjectPage;
