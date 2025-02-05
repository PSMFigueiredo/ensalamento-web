import styled from "styled-components";
import Header from "../components/Header.tsx";

const GridPage: React.FC = () => {
    const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
    const schedule = [
        ["Matemática", "Português", "História"],
        ["Ciências", "Geografia", "Inglês"],
        ["Artes", "Educação Física", "Filosofia"],
        ["Matemática", "Português", "História"],
        ["Biologia", "Sociologia", "Química"],
        ["Intervalo"],
        ["Projeto Especial", "Oficina", "Tutoria"]
    ];

    return (
        <Container>
            <Header />
            <Title>Grade Horária</Title>
            <Table>
                <thead>
                <tr>
                    <th>Horário</th>
                    {daysOfWeek.map(day => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {schedule.map((row, index) => (
                    <tr key={index}>
                        <td>{index + 1}º Aula</td>
                        {daysOfWeek.map(day => (
                            <td key={day} title="Professor X">{row[index % row.length]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};


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
    font-size: 2rem;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    width: 50%;
    padding: 10px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 80%;
    border-collapse: collapse;

    th, td {
        padding: 12px;
        border: 1px solid #ccc;
        text-align: center;
    }

    th {
        background-color: #00509E;
        color: white;
    }
`;

const Button = styled.button<{ delete?: boolean }>`
    padding: 8px 12px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => (props.delete ? "#ff4d4d" : "#007bff")};
    color: white;

    &:hover {
        background-color: ${props => (props.delete ? "#cc0000" : "#00509E")};
    }
`;

export default GridPage;
