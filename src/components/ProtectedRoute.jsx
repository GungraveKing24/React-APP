import { Navigate, Outlet } from "react-router-dom"; 
import { Toaster, toast } from "react-hot-toast";

const decodeToken = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(decodeURIComponent(escape(atob(base64))));
        return payload;
    } catch (error) {
        console.error("❌ Error al decodificar el token:", error);
        return null;
    }
};

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Debes iniciar sesión");
        return <Navigate to="/login" replace />;
    }

    const userData = decodeToken(token);
    const role = userData?.user_role;

    if (!allowedRoles.includes(role)) {
        toast.error("No tienes permiso para acceder a esta página");
        return <Navigate to="/bug" replace state={{ error: "Usuario no válido en esta página" }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
