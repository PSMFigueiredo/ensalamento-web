import api from "./api";



export const login = async (email: string, senha: string) => {
    try {
        const response = await api.post("/usuarios/login", { email, senha });
        console.log("Resposta completa do backend:", response); // 🔍 Adicione esse log
        console.log("Dados recebidos:", response.data); // 🔍 Verifique o que realmente está vindo


        const token = response.data?.token || response.data?.data?.token;
        if (!token){
            console.error("Erro: Token nao foi retornado pelo backend!")
            return {success: false, message: "Token Invalido"};
        }
        localStorage.setItem("token", token);
        console.log("Token salvo no localStorage:", localStorage.getItem("token"))
        return {success: true};
    } catch (error: any) {
        console.error("Erro na requisicao:", error);
        return { success: false, message: error.response?.data?.message || "Erro ao fazer login" };
    }
};

export const register = async (nome: string, email: string, senha: string) => {
    try {
        await api.post("/usuarios", { nome, email, senha });
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Erro ao cadastrar" };
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};