import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cartKey, setCartKey] = useState(0);

    // Función para obtener los datos completos del usuario
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            }
        } catch (error) {
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Primero cargar los datos básicos del token
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload);
                setCartKey(prev => prev + 1);
                
                // Luego obtener los datos completos del servidor
                fetchUserData();
            } catch (error) {
                logout();
            }
        }
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        await fetchUserData(); // Obtener datos completos después de login
        setCartKey(prev => prev + 1);
        localStorage.removeItem("guest_cart");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setCartKey(prev => prev + 1);
    };

    // Función para actualizar los datos del usuario
    const updateUser = (newUserData) => {
        setUser(prev => ({ ...prev, ...newUserData }));
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            cartKey,
            fetchUserData, // Exportar la función para poder usarla en otros componentes
            updateUser, // Exportar la función de actualización
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}