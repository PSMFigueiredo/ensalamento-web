import React, {useEffect, useState} from "react";
import DeleteButton from "./DeleteButton.tsx";
import EditButton from "./EditButton.tsx";
import Header from "../components/Header.tsx";

interface Classroom {
    id: number;
    name: string;
    days: string[];
    time: string;
    shift: string;
}

const ClassroomListPage: React.FC = () => {
    //lista ficticia
    // const [classrooms, setClassrooms] = useState<Classroom[]>([
    //     {
    //         id: 1,
    //         name: "3º Ano A",
    //         days: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
    //         time: "08:00 - 12:00",
    //         shift: "Matutino",
    //     },
    //     {
    //         id: 2,
    //         name: "2º Ano B",
    //         days: ["Terça-feira", "Quinta-feira"],
    //         time: "13:00 - 17:00",
    //         shift: "Vespertino",
    //     },
    // ]);
useEffect(() => {
    api.get("/classrooms/")
})

    const [isEditing, setIsEditing] = useState(false);
    const [currentClassroom, setCurrentClassroom] = useState<Classroom | null>(null);

    const handleEdit = (classroom: Classroom) => {
        setCurrentClassroom(classroom);
        setIsEditing(true);
        console.log(`Editar item com ID: ${classroom.id}`);
    };

    const handleDelete = (id: number) => {
        setClassrooms((prevClassrooms) => prevClassrooms.filter((classroom) => classroom.id !== id));
    };



    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Lista de Turmas</h1>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nome da Turma</th>
                            <th style={styles.th}>Dias</th>
                            <th style={styles.th}>Horário</th>
                            <th style={styles.th}>Turno</th>
                            <th style={styles.th}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classrooms.map((classroom) => (
                            <tr key={classroom.id}>
                                <td style={styles.td}>{classroom.name}</td>
                                <td style={styles.td}>{classroom.days.join(", ")}</td>
                                <td style={styles.td}>{classroom.time}</td>
                                <td style={styles.td}>{classroom.shift}</td>
                                <td style={styles.td}>
                                    <EditButton onEdit={() => handleEdit(classroom)} />

                                    <DeleteButton onDelete={() => handleDelete(classroom.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditing && currentClassroom && (
                    <div style={styles.modal}>
                        <h2>Editar Turma</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setClassrooms((prevClassrooms) =>
                                    prevClassrooms.map((c) =>
                                        c.id === currentClassroom.id ? currentClassroom : c
                                    )
                                );
                                setIsEditing(false);
                            }}
                        >
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    value={currentClassroom.name}
                                    onChange={(e) =>
                                        setCurrentClassroom({ ...currentClassroom, name: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Dias:
                                <input
                                    type="text"
                                    value={currentClassroom.days.join(",") || ""}
                                    onChange={(e) =>
                                        setCurrentClassroom({
                                            ...currentClassroom,
                                            days: e.target.value.split(",").map((d) => d.trim()),
                                        })
                                    }
                                />
                            </label>
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};


const styles = {
    container: {
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        marginTop: "280px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center" as const,
        marginBottom: "20px",
        color: "#333",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse" as const,
    },
    th: {
        padding: "10px",
        textAlign: "left" as const,
        borderBottom: "2px solid #ddd",
        backgroundColor: "#f5f5f5",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    button: {
        padding: "5px 10px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "5px",
    },
    buttonDelete: {
        padding: "5px 10px",
        backgroundColor: "#F44336",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default ClassroomListPage;