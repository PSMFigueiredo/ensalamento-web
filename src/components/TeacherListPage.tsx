import React, { useState } from "react";
import DeleteButton from "./DeleteButton";

interface Teacher {
    id: number;
    name: string;
    subjects: string[];
    qualification: string;
    availableTimes: string[];
}

const TeacherListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSubject, setFilteredSubject] = useState("");

    const [tempSearchTerm, setTempSearchTerm] = useState("");
    const [tempFilteredSubject, setTempFilteredSubject] = useState("");

    const [teachers, setTeachers] = useState<Teacher[]>([
        {
            id: 1,
            name: "João Silva",
            subjects: ["Matemática", "Física"],
            qualification: "Licenciatura em Matemática",
            availableTimes: ["Segunda 08:00-12:00", "Quarta 08:00-12:00"],
        },
        {
            id: 2,
            name: "Maria Oliveira",
            subjects: ["Química", "Biologia"],
            qualification: "Licenciatura em Química",
            availableTimes: ["Terça 13:00-17:00", "Quinta 13:00-17:00"],
        },
    ]);

    const subjects = Array.from(new Set(teachers.flatMap((t) => t.subjects)));

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filteredSubject === "" || teacher.subjects.includes(filteredSubject))
    );



    const handleDelete = (id: number) => {
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id));
    };


    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Lista de Professores</h1>

            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={tempSearchTerm}
                    onChange={(e) => setTempSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={tempFilteredSubject}
                    onChange={(e) => setTempFilteredSubject(e.target.value)}
                    style={styles.select}
                >
                    <option value="">Todas as disciplinas</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        setSearchTerm(tempSearchTerm);
                        setFilteredSubject(tempFilteredSubject);
                    }}
                    style={styles.button}
                >
                    Aplicar Filtro
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Nome</th>
                    <th style={styles.th}>Disciplinas</th>
                    <th style={styles.th}>Formação</th>
                    <th style={styles.th}>Horários Disponíveis</th>
                    <th style={styles.th}>Ações</th>
                </tr>
                </thead>
                <tbody>
                {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                        <td style={styles.td}>{teacher.name}</td>
                        <td style={styles.td}>{teacher.subjects.join(", ")}</td>
                        <td style={styles.td}>{teacher.qualification}</td>
                        <td style={styles.td}>{teacher.availableTimes.join(", ")}</td>
                        <td style={styles.td}>
                            <button style={styles.button}>Editar</button>
                            <DeleteButton onDelete={() => handleDelete(teacher.id)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: { maxWidth: "800px", margin: "50px auto", textAlign: "center" as const },
    title: { fontSize: "2rem", marginBottom: "20px", color: "#333" },
    filters: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
    input: { padding: "10px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" },
    select: { padding: "10px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" },
    button: {
        padding: "10px 15px",
        fontSize: "14px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    table: { width: "100%", borderCollapse: "collapse" as const },
    th: { padding: "10px", borderBottom: "2px solid #ddd", backgroundColor: "#f5f5f5" },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
};

export default TeacherListPage;
