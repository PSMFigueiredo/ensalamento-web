import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import ClassroomRegisterPage from "./components/ClassroomRegisterPage.tsx";
import ClassRegistrationPage from "./components/ClassRegistrationPage.tsx";
import GridRegistrationPage from "./components/GridRegistrationPage.tsx";
import DashboardPage from "./components/DashboardPage.tsx";
import ListPage from "./components/ListPage.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import RegisterProfessor from "./Pages/RegisterProfessor.tsx";
import SubjectPage from "./Pages/SubjectPage.tsx";
import AvailablePage from "./Pages/AvailablePage.tsx";



const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/grid" element={<ProtectedRoute><GridRegistrationPage /></ProtectedRoute>} />
                    <Route path="/teachers" element={<ProtectedRoute><ClassRegistrationPage /> </ProtectedRoute>} />
                    <Route path="/classroom-register" element={<ProtectedRoute><ClassroomRegisterPage /> </ProtectedRoute>} />
                    <Route path="/registerProfessor" element={<ProtectedRoute><RegisterProfessor /> </ProtectedRoute>} />
                    <Route path="/register" element={<ProtectedRoute><RegisterPage /> </ProtectedRoute>} />
                    <Route path="/subject" element={<ProtectedRoute><SubjectPage /> </ProtectedRoute>} />
                    <Route path="/available" element={<ProtectedRoute><AvailablePage /> </ProtectedRoute>} />
                    <Route path="/listpage" element={<ProtectedRoute><ListPage /> </ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App