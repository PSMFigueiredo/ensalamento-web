export const login = async (email: string, senha: string) => {
    try {
        const response = await api.post("/usuarios/login", { email, senha });
        const { token } = response.data;
        localStorage.setItem("token", token);
        return {success: true};
    } catch (error: any) {
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