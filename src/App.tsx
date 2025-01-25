import * as React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./components/LoginPage.tsx";
import RegisterPage from "./components/RegisterPage.tsx";
import ClassroomRegisterPage from "./components/ClassroomRegisterPage.tsx";
import ClassroomListPage from "./components/ClassroomListPage.tsx";
import TeacherListPage from "./components/TeacherListPage.tsx";
import ScheduleBuilderPage from "./components/ScheduleBuilderPage.tsx";
import DashboardPage from "./components/DashboardPage.tsx";
import {AuthProvider, useAuth} from "./context/AuthContext.tsx";


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
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
                <Route path="/schedule-builder" element={<ProtectedRoute><ScheduleBuilderPage /></ProtectedRoute>}/>
                <Route path="/teachers" element={<ProtectedRoute><TeacherListPage /> </ProtectedRoute> } />
                <Route path="/classrooms" element={<ProtectedRoute><ClassroomListPage /> </ProtectedRoute> }/>
                <Route path="/classroom-register" element={<ProtectedRoute><ClassroomRegisterPage /> </ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute><RegisterPage /> </ProtectedRoute>} />
            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App