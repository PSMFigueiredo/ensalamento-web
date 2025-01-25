import React, {useState} from "react";

interface ScheduleBuilderPage {
    id: number;
    day: string;
    time: string;
    subject: string;
    teacher: string;
}

const ScheduleBuilderPage: React.FC= () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [subject, setSubject] = useState("");
    const [teacher, setTeacher] = useState("");
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

    //Lista de exemplo ate conectar o backend
    const classes = ["3º Ano A", "2º Ano B", "1º Ano C"];
    const days = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
    const subjects = ["Matemática", "Física", "Química", "Biologia"];
    const teachers = ["João Silva", "Maria Oliveira", "Carlos Santos"];

    const addScheduleItem = () => {
        if (selectedClass && day && time && subject && teacher) {
            const newItem: ScheduleItem = {
                id: schedule.length + 1,
                day,
                time,
                subject,
                teacher,
            };

            setSchedule((prev) => [...prev, newItem]);
            setDay("");
            setTime("");
            setSubject("");
            setTeacher("");
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Montagem de Grade Horária</h1>

            <form style={styles.form}>
                <label style={styles.label}>
                    Turma:
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Selecione uma turma</option>
                        {classes.map((className) => (
                            <option key={className} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={styles.label}>
                    Dia da Semana:
                    <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Selecione um dia</option>
                        {days.map((dayOption) => (
                            <option key={dayOption} value={dayOption}>
                                {dayOption}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={styles.label}>
                    Horário:
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Disciplina:
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Selecione uma disciplina</option>
                        {subjects.map((subjectOption) => (
                            <option key={subjectOption} value={subjectOption}>
                                {subjectOption}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={styles.label}>
                    Professor:
                    <select
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Selecione um professor</option>
                        {teachers.map((teacherOption) => (
                            <option key={teacherOption} value={teacherOption}>
                                {teacherOption}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="button" onClick={addScheduleItem} style={styles.button}>
                    Adicionar à Grade
                </button>
            </form>

            <h2 style={styles.subtitle}>Grade Horária</h2>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Dia</th>
                    <th style={styles.th}>Horário</th>
                    <th style={styles.th}>Disciplina</th>
                    <th style={styles.th}>Professor</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((item) => (
                    <tr key={item.id}>
                        <td style={styles.td}>{item.day}</td>
                        <td style={styles.td}>{item.time}</td>
                        <td style={styles.td}>{item.subject}</td>
                        <td style={styles.td}>{item.teacher}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Estilos inline
const styles = {
    container: {
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center" as const,
        marginBottom: "20px",
        color: "#333",
    },
    subtitle: {
        marginTop: "30px",
        textAlign: "center" as const,
        color: "#555",
    },
    form: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "10px",
    },
    label: {
        fontWeight: "bold",
        color: "#555",
    },
    select: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
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
};

export default ScheduleBuilderPage;