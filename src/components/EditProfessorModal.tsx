import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const EditProfessorModal = ({ professor, onClose, onConfirm }) => {
    const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
    const [availableDisciplines, setAvailableDisciplines] = useState<{ id: string, nome: string }[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDisciplines();
    }, []);

    // Busca todas as disciplinas disponíveis e as que o professor já tem
    const fetchDisciplines = async () => {
        try {
            const response = await axios.get("http://localhost:3000/disciplinas", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const responseAssoc = await axios.get(`http://localhost:3000/disciplinas-professores`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            console.log("Dados das disciplinas recebidas:", response.data);
            console.log("Dados de disciplinas-professor recebidas:", responseAssoc.data);

            // Garante que response.data.data existe antes de acessar
            const disciplinas = response.data?.data?.disciplinas || [];
            setAvailableDisciplines(disciplinas);

            const associated = responseAssoc.data?.data?.disciplinasProfessores
                ?.filter(dp => dp.professorId === professor.id)
                ?.map(dp => dp.disciplinaId) || [];

            setSelectedDisciplines(associated);
        } catch (error) {
            console.error("Erro ao carregar disciplinas:", error);
            setError("Erro ao carregar disciplinas.");
        }
    };

    // Atualiza a relação do professor com as disciplinas
    const handleUpdate = async () => {
        setLoading(true);
        setError("");


        try {
            for (const disciplinaId of selectedDisciplines) {
                const payload = {
                    disciplinaId: disciplinaId,
                    professorId: professor.id
                };
                console.clear();
                console.log(availableDisciplines);

                await axios.put(
                    `http://localhost:3000/disciplinas-professores/${2}`,
                    payload,
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
            }

            onConfirm();
        } catch (error) {
            console.error("Erro ao atualizar disciplinas:", error.response?.data || error);
            setError("Erro ao atualizar disciplinas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <h3>Editar Disciplinas do Professor</h3>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Label>Disciplinas:</Label>
                <Select multiple value={selectedDisciplines} onChange={(e) => {
                    setSelectedDisciplines([...e.target.selectedOptions].map(o => o.value));
                }}>
                    {availableDisciplines.map((disciplina) => (
                        <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome}
                        </option>
                    ))}
                </Select>

                <Button onClick={handleUpdate} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
            </ModalContent>
        </ModalOverlay>
    );
};

// Estilos
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
    width: 400px;
`;

const Label = styled.label`
    font-size: 16px;
    display: block;
    margin-top: 10px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin: 10px 5px;
    background: #00509E;
    color: white;
`;

const ErrorMessage = styled.p`
    color: red;
`;

export default EditProfessorModal;
