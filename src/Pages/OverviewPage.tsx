import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProfessorModal from "../components/EditProfessorModal";
import Header from "../components/Header";

const OverviewPage: React.FC = () => {
    const [professors, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        try {
            const responseProfessors = await axios.get("http://localhost:3000/professors", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const responseDisciplines = await axios.get("http://localhost:3000/disciplinas-professores", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            console.log("Professores da API:", responseProfessors.data);
            console.log("Disciplinas-Professores da API:", responseDisciplines.data);

            const professorsMap = responseProfessors.data.data.professores.reduce((acc, professor) => {
                acc[professor.id] = {
                    id: professor.id,
                    nome: professor.nome,
                    disciplinas: []
                };
                return acc;
            }, {});

            responseDisciplines.data.data.disciplinasProfessores.forEach(dp => {
                if (professorsMap[dp.professorId]) {
                    professorsMap[dp.professorId].disciplinas.push({
                        id: dp.disciplinaId,
                        nome: dp.disciplinaNome
                    });
                }
            });

            setProfessors(Object.values(professorsMap));
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
            setError("Erro ao carregar professores.");
            setLoading(false);
        }
    };

    const handleEdit = (professor: any) => {
        setSelectedProfessor(professor);
        setShowEditModal(true);
    };

    const handleDelete = async (professorId: string) => {
        try {
            await axios.delete(`http://localhost:3000/professors/${professorId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProfessors(professors.filter(p => p.id !== professorId));
        } catch (error) {
            console.error("Erro ao excluir professor:", error);
            setError("Erro ao excluir professor.");
        }
    };

    return (
        <Container>
            <Header />
            <Title>Visão Geral de Professores</Title>
            {loading ? <p>Carregando...</p> : error ? <ErrorMessage>{error}</ErrorMessage> : (
                <Table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Disciplinas</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {professors.map((professor) => (
                        <tr key={professor.id}>
                            <td>{professor.nome}</td>
                            <td>{professor.disciplinas.length > 0 ? professor.disciplinas.map(d => d.nome).join(", ") : "Nenhuma"}</td>
                            <td>
                                <EditIcon onClick={() => handleEdit(professor)} />
                                <DeleteIcon onClick={() => handleDelete(professor.id)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            {showEditModal && selectedProfessor && (
                <EditProfessorModal professor={selectedProfessor} onClose={() => setShowEditModal(false)} onConfirm={fetchProfessors} />
            )}
        </Container>
    );
};

// Estilos
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 250px;
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 90%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #00509E;
        color: white;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

const EditIcon = styled(FaEdit)`
    cursor: pointer;
    color: #007bff;
    margin-right: 10px;

    &:hover {
        color: #00509e;
    }
`;

const DeleteIcon = styled(FaTrash)`
    cursor: pointer;
    color: #ff4d4d;
    &:hover {
        color: #cc0000;
    }
`;

export default OverviewPage;
