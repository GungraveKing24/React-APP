import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.jsx";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const { user, cartKey } = useAuth(); // Obtenemos cartKey del AuthContext

    const updateCartCount = async () => {
        try {
            if (user) {
                // Usuario autenticado
                const url = import.meta.env.VITE_API_URL + "orders/cart/details/quantity";
                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCartCount(typeof res.data === 'number' ? res.data : res.data.length);
            } else {
                // Usuario invitado
                const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
                const count = guestCart.reduce((total, item) => total + (item.details_quantity || 1), 0);
                setCartCount(count);
            }
        } catch (error) {
            setCartCount(0);
        }
    };

    // Actualizar cuando cambia el usuario o la cartKey
    useEffect(() => {
        updateCartCount();
    }, [user, cartKey]);

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}