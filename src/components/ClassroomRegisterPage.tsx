import React, {useState} from "react";

const ClassroomRegisterPage: React.FC = () => {
    const [className, setClassName] = useState("");
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [shift, setShift] = useState("matutino");
    const [curriculum, setCurriculum] = useState("");

    const daysOptions = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            className,
            daysOfWeek,
            startTime,
            endTime,
            shift,
            curriculum,
        });

        //Aqui envia os dados para o backend
    };

    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Cadastro de Turmas</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Nome da Turma:
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        style={styles.input}
                        placeholder="Ex: 3º Ano A"
                        required
                    />
                </label>

                <label style={styles.label}>
                    Dias da Semana:
                    <div style={styles.checkboxGroup}>
                        {daysOptions.map((day) => (
                            <label key={day} style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={day}
                                    checked={daysOfWeek.includes(day)}
                                    onChange={(e) => {
                                        const selectedDay = e.target.value;
                                        setDaysOfWeek((prev) =>
                                            prev.includes(selectedDay)
                                                ? prev.filter((d) => d !== selectedDay)
                                                : [...prev, selectedDay]
                                        );
                                    }}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </label>

                <label style={styles.label}>
                    Horário de Início:
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Horário de Término:
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Turno:
                    <select
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        style={styles.select}
                    >
                        <option value="matutino">Matutino</option>
                        <option value="vespertino">Vespertino</option>
                    </select>
                </label>

                <label style={styles.label}>
                    Currículo:
                    <textarea
                        value={curriculum}
                        onChange={(e) => setCurriculum(e.target.value)}
                        style={styles.textarea}
                        placeholder="Descreva o currículo da turma..."
                        required
                    ></textarea>
                </label>

                <button type="submit" style={styles.button}>
                    Cadastrar Turma
                </button>
            </form>
        </div>
    );
};


const styles = {
    container: {
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center" as const,
        color: "#333",
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
    input: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    select: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    textarea: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        minHeight: "80px",
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
    checkboxGroup: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "5px",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center" as const,
        gap: "5px",
    },
};

export default ClassroomRegisterPage;
