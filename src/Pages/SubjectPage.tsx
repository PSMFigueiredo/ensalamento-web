import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";

const SubjectPage: React.FC = () => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [disciplines, setDisciplines] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorResponse = await axios.get("http://localhost:3000/professors", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        if (professorResponse.data?.data?.professores) {
          setProfessors(professorResponse.data.data.professores);
        } else {
          throw new Error("Formato inesperado para professores.");
        }

        const disciplineResponse = await axios.get("http://localhost:3000/disciplinas", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        if (disciplineResponse.data?.data?.disciplinas) {
          setDisciplines(disciplineResponse.data.data.disciplinas);
        } else {
          throw new Error("Formato inesperado para disciplinas.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setError("Erro ao carregar dados do servidor.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedProfessor || selectedDisciplines.length === 0) {
      setError("Por favor, selecione um professor e ao menos uma disciplina.");
      return;
    }

    try {
      const requests = selectedDisciplines.map((disciplinaId) =>
          axios.post(
              "http://localhost:3000/disciplinas-professores",
              { disciplinaId, professorId: selectedProfessor },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          )
      );

      await Promise.all(requests);

      setSuccess("Disciplinas atribuídas com sucesso!");
      setSelectedDisciplines([]);
      setSelectedProfessor("");
    } catch (error) {
      console.error("Erro ao atribuir disciplinas:", error);
      setError("Erro ao atribuir disciplinas.");
    }
  };

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
        <Header />
        <Content>
          <Title>Atribuir Disciplinas</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <Form onSubmit={handleSubmit}>
            <Label>Professor:</Label>
            <Select value={selectedProfessor} onChange={(e) => setSelectedProfessor(e.target.value)} required>
              <option value="">Selecione um professor</option>
              {professors.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </option>
              ))}
            </Select>

            <Label>Disciplinas:</Label>
            <DisciplinasContainer>
              {disciplines.map((subject) => (
                  <CheckboxLabel key={subject.id}>
                    <Checkbox
                        type="checkbox"
                        name="disciplina"
                        value={subject.id}
                        checked={selectedDisciplines.includes(subject.id)}
                        onChange={handleDisciplineChange}
                    />
                    {subject.nome}
                  </CheckboxLabel>
              ))}
            </DisciplinasContainer>

            <Button type="submit">Atribuir</Button>
          </Form>
        </Content>
      </Container>
  );
};

// Estilização
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  margin-top: 350px
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

export default SubjectPage;
