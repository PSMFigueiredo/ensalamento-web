import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const EditProfessorModal = ({ professor, onClose, onConfirm }) => {
    const [name, setName] = useState(professor.nome);
    const [matricula, setMatricula] = useState(professor.matricula);
    const [cargaHoraria, setCargaHoraria] = useState(professor.cargaHoraria);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDisciplines();
        fetchAvailability();
    }, []);

    const fetchDisciplines = async () => {
        try {
            const response = await axios.get("http://localhost:3000/disciplinas-professores", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            console.log("Disciplinas recebidas:", response.data); // Debug

            // Certifique-se de que os dados são um array antes de definir o estado
            if (Array.isArray(response.data.data)) {
                setSelectedDisciplines(response.data.data);
            } else {
                setSelectedDisciplines([]); // Evita erro caso não seja um array
            }
        } catch (error) {
            console.error("Erro ao carregar disciplinas:", error);
            setSelectedDisciplines([]); // Evita erro ao tentar mapear undefined
        }
    };

    const fetchAvailability = async () => {
        try {
            const response = await axios.get("http://localhost:3000/disponibilidades-professores", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            console.log("Disponibilidade recebida:", response.data); // Debug

            if (Array.isArray(response.data.data)) {
                setAvailability(response.data.data);
            } else {
                setAvailability([]); // Evita erro caso não seja um array
            }
        } catch (error) {
            console.error("Erro ao carregar disponibilidade:", error);
            setAvailability([]); // Evita erro ao tentar mapear undefined
        }
    };


    const handleUpdate = async () => {
        setLoading(true);
        setError("");

        try {
            // Atualiza professor
            await axios.put(
                `http://localhost:3000/professors/${professor.id}`,
                {
                    nome: name,
                    matricula: Number(matricula),
                    cargaHoraria: Number(cargaHoraria)
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            // Atualiza disponibilidade do professor (cada item individualmente)
            await Promise.all(
                availability.map((disponibilidade) =>
                    axios.put(
                        `http://localhost:3000/disponibilidades-professores/${professor.id}`,
                        { ...disponibilidade, professorId: professor.id },
                        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                    )
                )
            );


            // Atualiza disciplinas do professor (enviando corretamente como array)
            await axios.put(
                `http://localhost:3000/disciplinas-professores/${professor.id}`,
                {
                    disciplinaId: selectedDisciplines.map((disciplina) => disciplina.id),
                    professorId: professor.id
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            onConfirm(); // Atualiza a página
        } catch (error) {
            console.error("Erro ao atualizar professor:", error);
            setError("Erro ao atualizar professor.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <ModalOverlay>
            <ModalContent>
                <h3>Editar Professor</h3>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Label>Nome:</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <Label>Matrícula:</Label>
                <Input type="number" value={matricula} onChange={(e) => setMatricula(e.target.value)} />

                <Label>Carga Horária:</Label>
                <Input type="number" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} />

                <Label>Disciplinas:</Label>
                <Select multiple value={selectedDisciplines} onChange={(e) => setSelectedDisciplines([...e.target.selectedOptions].map(o => o.value))}>
                    {selectedDisciplines.map((disciplina) => (
                        <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome}
                        </option>
                    ))}
                </Select>

                <Label>Disponibilidade:</Label>
                {availability.map((item, index) => (
                    <div key={index}>
                        <Input
                            type="text"
                            value={item.diaDaSemana}
                            onChange={(e) => {
                                const newAvailability = [...availability];
                                newAvailability[index].diaDaSemana = e.target.value;
                                setAvailability(newAvailability);
                            }}
                        />
                        <Input
                            type="time"
                            value={item.inicioHora}
                            onChange={(e) => {
                                const newAvailability = [...availability];
                                newAvailability[index].inicioHora = e.target.value;
                                setAvailability(newAvailability);
                            }}
                        />
                        <Input
                            type="time"
                            value={item.fimHora}
                            onChange={(e) => {
                                const newAvailability = [...availability];
                                newAvailability[index].fimHora = e.target.value;
                                setAvailability(newAvailability);
                            }}
                        />
                    </div>
                ))}

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

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #00509E;
    color: white;

    &:hover {
        background: #007bff;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

export default EditProfessorModal;
