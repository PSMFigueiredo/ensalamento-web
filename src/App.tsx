import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import ClassRegistrationPage from "./Pages/ClassRegistrationPage.tsx";
import GridRegistrationPage from "./components/GridRegistrationPage.tsx";
import DashboardPage from "./Pages/DashboardPage.tsx";
import ListPage from "./components/ListPage.tsx";
import RegisterProfessor from "./Pages/RegisterProfessor.tsx";
import SubjectPage from "./Pages/SubjectPage.tsx";
import AvailablePage from "./Pages/AvailablePage.tsx";
import GradeHorariaPage from "./Pages/GradeHorariaPage.tsx";
import OverviewPage from "./Pages/OverviewPage.tsx";
import SelecionarTurmaProfessores from "./Pages/selecionarTurmaProfessores.tsx";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Rotas protegidas */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/grid" element={<ProtectedRoute><GridRegistrationPage /></ProtectedRoute>} />
                    <Route path="/classroom-register" element={<ProtectedRoute><ClassRegistrationPage /></ProtectedRoute>} />
                    <Route path="/registerProfessor" element={<ProtectedRoute><RegisterProfessor /></ProtectedRoute>} />
                    <Route path="/subject" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
                    <Route path="/available" element={<ProtectedRoute><AvailablePage /></ProtectedRoute>} />
                    <Route path="/listpage" element={<ProtectedRoute><ListPage /></ProtectedRoute>} />
                    <Route path="/gridPage" element={<ProtectedRoute><GradeHorariaPage /></ProtectedRoute>} />
                    <Route path="/selecionar-turma-professores" element={<ProtectedRoute><SelecionarTurmaProfessores /></ProtectedRoute>} />
                    <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
