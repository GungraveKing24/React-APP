import { useEffect, useState } from "react";
import { axiosInstance } from "../Axios";

export const useCartCount = () => {
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");

  // Carga inicial del carrito
  useEffect(() => {
    const loadCart = async () => {
      if (token) {
        try {
          const res = await axiosInstance.get("/orders/cart/details/quantity", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          if (typeof res.data === 'number') {
            setCount(res.data); // Si el backend devuelve el número de artículos directamente
          } else {
            setCount(res.data.length); // Si el backend devuelve un array de artículos
          }
        } catch (err) {
          setCount(0);
        }
      } else {
        const cart = JSON.parse(localStorage.getItem("guest_cart")) || [];
        setCount(cart.length);
      }
    };

    loadCart();

    // Escuchar el evento de actualización
    const handleCartUpdate = (e) => {
      setCount(e.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [token]);

  return count;
};

export const notifyCartChange = (newCartLength) => {
    const event = new CustomEvent("cartUpdated", { detail: newCartLength });
    window.dispatchEvent(event);
  };