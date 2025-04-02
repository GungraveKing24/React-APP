// Cart.jsx
import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(currentUser ? true : false);

    if (currentUser) {
      // Llamada al backend para obtener el carrito del usuario logueado
      fetch('http://localhost:8000/orders/cart/details/', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data);
          const totalAmount = data.reduce((acc, item) => acc + item.final_price * item.details_quantity, 0);
          setTotal(totalAmount);
        })
        .catch((error) => console.error('Error fetching cart items:', error));
    } else {
      // Para el invitado, obtener los productos del carrito desde localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
      const totalAmount = cart.reduce((acc, item) => acc + item.final_price * item.details_quantity, 0);
      setTotal(totalAmount);
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    // Lógica para actualizar la cantidad de un producto en el carrito
    if (isLoggedIn) {
      // Enviar la actualización al backend
      fetch(`http://localhost:8000/orders/cart/details/update/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar el estado local
          setCartItems(data);
        });
    } else {
      // Para el invitado, actualizar en el localStorage
      const updatedCart = cartItems.map((item) => 
        item.id === id ? { ...item, details_quantity: quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  const proceedToPayment = () => {
    // Lógica para proceder con el pago
    if (isLoggedIn) {
      // Redirigir al usuario logueado a la página de pago
      // Aquí iría la lógica de pago
    } else {
      alert('Por favor inicie sesión para proceder con el pago.');
    }
  };

  return (
    <div>
      <h1>Carrito</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <img src={item.arr_img_url} alt={item.arr_name} />
            <p>{item.arr_name}</p>
            <p>Precio: ${item.details_price}</p>
            <input
              type="number"
              value={item.details_quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              min="1"
            />
          </div>
        ))}
      </div>
      <h3>Total: ${total}</h3>
      <button onClick={proceedToPayment}>Proceder al pago</button>
    </div>
  );
}

export default Cart;
