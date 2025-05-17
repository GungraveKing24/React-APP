import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SmartSpinner from "../Both/SmartSpinner";
import axios from "axios";

const Loading = () => {
    const [dots, setDots] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const reference = searchParams.get("reference"); // Obtiene el reference de la URL

    useEffect(() => {
        // Animación de puntos
        const dotsInterval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""));
        }, 500);

        // Verificar estado del pago
        const checkPaymentStatus = async () => {
            if (!reference) {
                navigate("/"); // Redirige a home si no hay reference
                return;
            }

            try {
                const url = import.meta.env.VITE_API_URL + "webhooks/payments/status/"; 
                const response = await axios.get(
                    url + `${reference}`
                );

                if (response.data.status === "success") {
                    // Redirigir a profile después de 2 segundos
                    setTimeout(() => {
                        navigate("/profile");
                    }, 2000);
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        };

        // Verificar cada 3 segundos
        const paymentInterval = setInterval(checkPaymentStatus, 3000);

        // Verificar inmediatamente al cargar
        checkPaymentStatus();

        return () => {
            clearInterval(dotsInterval);
            clearInterval(paymentInterval);
        };
    }, [navigate, reference]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mt-50 mb-4 text-4xl font-bold text-gray-800">
                Procesando tu pago{dots}
            </h1>
            <SmartSpinner />
        </div>
    );
};

export default Loading;