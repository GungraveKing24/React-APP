import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cartKey, setCartKey] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload);
                setCartKey(prev => prev + 1);
            } catch (error) {
                console.error("Error al procesar el token:", error);
                handleLogout();
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
        setCartKey(prev => prev + 1);
        localStorage.removeItem("guest_cart"); // Limpiar carrito de invitado al iniciar sesión
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setCartKey(prev => prev + 1);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, cartKey }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}