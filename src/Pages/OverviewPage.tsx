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
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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

            const professoresMap = responseProfessors.data.data.professores.reduce((acc, professor) => {
                acc[professor.id] = {
                    id: professor.id,
                    nome: professor.nome,
                    disciplinas: [],
                    turmas: []
                };
                return acc;
            }, {});

            responseDisciplines.data.data.disciplinasProfessores.forEach(dp => {
                if (professoresMap[dp.professorId]) {
                    if (dp.disciplinaNome) professoresMap[dp.professorId].disciplinas.push(dp.disciplinaNome);
                    if (dp.turmaNome) professoresMap[dp.professorId].turmas.push(dp.turmaNome);
                }
            });

            setProfessors(Object.values(professoresMap));
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
        setShowConfirmDelete(true);
        setSelectedProfessor(professorId);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/professors/${selectedProfessor}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProfessors(professors.filter(p => p.id !== selectedProfessor));
            setShowConfirmDelete(false);
        } catch (error) {
            console.error("Erro ao excluir professor:", error);
        }
    };

    return (
        <Container>
            <Header />
            <Title>Visão Geral de Professores</Title>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Disciplinas</th>
                        <th>Turmas</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {professors.map((professor) => (
                        <tr key={professor.id}>
                            <td>{professor.nome}</td>
                            <td>{professor.disciplinas.length > 0 ? professor.disciplinas.join(", ") : "Nenhuma"}</td>
                            <td>{professor.turmas.length > 0 ? professor.turmas.join(", ") : "Nenhuma"}</td>
                            <td>
                                <EditIcon onClick={() => handleEdit(professor)} />
                                <DeleteIcon onClick={() => handleDelete(professor.id)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            {/* Modal para edição */}
            {showEditModal && selectedProfessor && (
                <EditProfessorModal
                    professor={selectedProfessor}
                    onClose={() => setShowEditModal(false)}
                    onConfirm={() => {
                        setShowEditModal(false);
                        fetchProfessors(); // Atualiza a lista após edição
                    }}
                />
            )}

            {/* Modal para confirmação de exclusão */}
            {showConfirmDelete && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Excluir Professor</h3>
                        <p>Tem certeza que deseja excluir este professor? Essa ação não pode ser desfeita.</p>
                        <Button onClick={() => setShowConfirmDelete(false)}>Cancelar</Button>
                        <Button danger onClick={confirmDelete}>Excluir</Button>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

// Estilos
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:250px;
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
`;

const Button = styled.button<{ danger?: boolean }>`
    padding: 10px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: ${props => props.danger ? "#ff4d4d" : "#ccc"};
    color: white;
`;

export default OverviewPage;
