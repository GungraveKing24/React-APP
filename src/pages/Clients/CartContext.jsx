import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [guestCart, setGuestCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    // Cargar carrito de invitado desde localStorage
    const savedGuestCart = localStorage.getItem('guestCart');
    if (savedGuestCart) {
      setGuestCart(JSON.parse(savedGuestCart));
      setCartCount(JSON.parse(savedGuestCart).reduce((sum, item) => sum + item.quantity, 0));
    }
  }, []);

  // Guardar carrito de invitado en localStorage cuando cambie
  useEffect(() => {
    if (!isAuthenticated && guestCart.length > 0) {
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }
  }, [guestCart, isAuthenticated]);

    // Añadir al carrito de invitado
    const addToGuestCart = (product) => {
        setGuestCart(prevCart => {
          const existingItem = prevCart.find(item => item.id === product.id);
          
          if (existingItem) {
            const updatedCart = prevCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
            return updatedCart;
          } else {
            const updatedCart = [...prevCart, product];
            setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
            return updatedCart;
          }
        });
      };

  // Eliminar del carrito de invitado
    const removeFromGuestCart = (productId) => {
            setGuestCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== productId);
            setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
            return updatedCart;
        });
    };

    // Actualizar cantidad en carrito de invitado
    const updateGuestCartItem = (productId, quantity) => {
        if (quantity <= 0) {
        removeFromGuestCart(productId);
        return;
        }

        setGuestCart(prevCart => {
            const updatedCart = prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
            setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
            return updatedCart;
        });
    };

    const transferGuestCart = async (userId) => {
        if (guestCart.length === 0) return;
        
        const token = localStorage.getItem('token');
        try {
          for (const item of guestCart) {
            await axios.post(
              import.meta.env.VITE_API_URL + "orders/cart/add",
              {
                arrangements_id: item.id,
                details_quantity: item.quantity,
                details_price: item.price
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
          }
          clearGuestCart();
        } catch (error) {
          console.error("Error al transferir carrito:", error);
        }
      };

    // Limpiar carrito de invitado
    const clearGuestCart = () => {
        setGuestCart([]);
        setCartCount(0);
        localStorage.removeItem('guestCart');
    };

    return (
        <CartContext.Provider
            value={{
                cartCount,
                setCartCount,
                guestCart,
                addToGuestCart,
                removeFromGuestCart,
                updateGuestCartItem,
                clearGuestCart,
                isAuthenticated,
                setIsAuthenticated
            }}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);