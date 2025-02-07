import styled from "styled-components";
import Header from "../components/Header.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelecionarTurmaProfessores: React.FC = () => {
    const [turmas, setTurmas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [selectedTurma, setSelectedTurma] = useState("");
    const [selectedProfessores, setSelectedProfessores] = useState<string[]>([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTurmas();
        fetchProfessores();
    }, []);

    const fetchTurmas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/turmas", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setTurmas(response.data.data.turmas);
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
            setError("Erro ao carregar turmas.");
        }
    };

    const fetchProfessores = async () => {
        try {
            const response = await axios.get("http://localhost:3000/professors", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProfessores(response.data.data.professores);
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
            setError("Erro ao carregar professores.");
        }
    };

    const handleGenerateGrade = async () => {
        if (!selectedTurma || selectedProfessores.length === 0) {
            setError("Selecione uma turma e pelo menos um professor.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/gerar-grade", {
                turmaId: selectedTurma,
                professores: selectedProfessores,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });


            console.log("Grade gerada com sucesso:", response.data);

            navigate("/gridPage", { state: { grade: response.data } });
        } catch (error) {
            console.error("Erro ao gerar grade horária:", error);
            setError("Erro ao gerar a grade horária.");
        }
    };

    return (
        <Container>
            <Header />
            <Title>Selecionar Turma e Professores</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Label>Turma:</Label>
            <Select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)}>
                <option value="">Selecione uma turma</option>
                {turmas.map((turma) => (
                    <option key={turma.id} value={turma.id}>{turma.nome}</option>
                ))}
            </Select>

            <Label>Professores:</Label>
            <CheckboxContainer>
                {professores.map((professor) => (
                    <CheckboxLabel key={professor.id}>
                        <input
                            type="checkbox"
                            value={professor.id}
                            checked={selectedProfessores.includes(professor.id)}
                            onChange={(e) => {
                                const { value, checked } = e.target;
                                setSelectedProfessores((prev) =>
                                    checked ? [...prev, value] : prev.filter((p) => p !== value)
                                );
                            }}
                        />
                        {professor.nome}
                    </CheckboxLabel>
                ))}
            </CheckboxContainer>

            <Button onClick={handleGenerateGrade}>Gerar Grade</Button>
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
    padding: 20px;
    margin-top: 200px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 18px;
    margin-top: 10px;
`;

const Select = styled.select`
    width: 300px;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const CheckboxLabel = styled.label`
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const Button = styled.button`
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: #00509E;
    color: white;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

export default SelecionarTurmaProfessores;
