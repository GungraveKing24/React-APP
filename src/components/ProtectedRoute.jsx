// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload.user_role; // Asume que el token tiene un campo 'role'

        if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // O a una página de no autorizado
        }   

        return <Outlet />;
    } catch (error) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;