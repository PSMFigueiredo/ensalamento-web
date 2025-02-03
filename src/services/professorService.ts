import api from "./api";

interface ProfessorData {
    nome: string;
    disciplinas: string;
    disponibilidade: string;
    cargaHoraria: number;
}

export const registerProfessor = async (data: ProfessorData) => {
    try {
        const response = await api.post("/professores", data);
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Erro ao cadastrar professor:", error);
        return { success: false, message: error.response?.data?.message || "Erro ao cadastrar professor" };
    }
};
