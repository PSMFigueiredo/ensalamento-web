import React, { useState, useEffect } from "react";
import Header from "./Header.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Para realizar requisições HTTP
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
// Ícones para edição e remoção

const TeachersListPage: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teachers, setTeachers] = useState<any[]>([]); // Definindo a lista de professores
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Carregar os dados dos professores do backend
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('/api/teachers'); // API fictícia para obter os professores
        console.log("Teachers data:", response.data); // Verifique os dados aqui
        setTeachers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = (teacherId: string) => {
    // Navegar para a página de edição, passando o ID do professor
    navigate(`/edit-teacher/${teacherId}`);
  };

  const handleDelete = async (teacherId: string) => {
    // Remover o professor do backend
    try {
      await axios.delete(`/api/teachers/${teacherId}`);
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId)); // Atualizar a lista local após exclusão
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
    }
  };

  return (
    <Container>
      <Header />
      <Card>
        <Title>Lista de Professores</Title>
        {loading ? (
          <LoadingMessage>Carregando...</LoadingMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Selecionar</th>
                <th>Editar</th>
                <th>Nome</th>
                <th>Turno</th>
                <th>Disciplina</th>
                <th>ID</th>
                <th>Turmas</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td><input type="checkbox" /></td>
                  <td><EditIcon onClick={() => handleEdit(teacher.id)} /></td>
                  <td>{teacher.name}</td>
                  <td>{teacher.shift}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.id}</td>
                  <td>
                    {teacher.classes.map((classItem: string) => (
                      <ClassButton key={classItem}>{classItem}</ClassButton>
                    ))}
                  </td>
                  <td><DeleteIcon onClick={() => handleDelete(teacher.id)} /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

// Estilos

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f5f5f5;
  width: 100%;
  min-height: calc(100vh - 230px);  
  padding: 0 20px;
`;

const Card = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px; 
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color: #00509E;
    color: #fff;
  }

  td {
    background-color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    th, td {
      padding: 8px;
    }
  }
`;

const EditIcon = styled(FaEdit)`
  cursor: pointer;
  color: #00509E;
  &:hover {
    color: #007bff;
  }
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #ff4d4d;
  &:hover {
    color: #ff1a1a;
  }
`;

const ClassButton = styled.button`
  background-color: #8F9BB3;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;

  &:hover {
    background-color: #5d6b8e;
  }
`;

export default TeachersListPage;
