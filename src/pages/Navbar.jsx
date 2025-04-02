import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            // Llamada al backend para obtener el número de productos en el carrito del usuario
            fetch('http://localhost:8000/orders/cart/details/quantity', {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,  // Suponiendo que el token esté en localStorage
                }
            })
                .then((response) => response.json())
                .then((data) => setCartCount(data))
                .catch((error) => console.error('Error fetching cart count:', error));
            } else {
                // Para el invitado, obtener el número de productos del carrito en localStorage
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartCount(cart.length);
        }   
    }, []);

    return (
        <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-lg">
            <h1 className="text-white text-xl font-bold">Mi App</h1>
            <div className="flex space-x-4">
                <button>
                    <Link to="/login" className="text-white">Login</Link>
                </button>
                <button>
                    <Link to="/register" className="text-white">Registrar</Link>
                </button>
                <button>
                    <Link to="/profile" className="text-white">Perfil</Link>
                </button>
                <button>
                    <Link to="/catalog" className="text-white">Catalogo</Link>
                </button>
                <ul>
                    <li><Link to="/cart">Carrito ({cartCount})</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
