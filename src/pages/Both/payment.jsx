import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../Axios/Axios";

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extraer parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transaction_id");
  const reference = queryParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        // 1. Verificar el estado del pago con tu backend
        const response = await axiosInstance.get(
            `payments/verify?reference=${reference}&transaction_id=${transactionId}`
        );

        // 2. Actualizar estado según la respuesta
        setPaymentStatus(response.data.status);
        setOrderDetails(response.data.order);
        
        // 3. Mostrar feedback al usuario
        if (response.data.status === "APPROVED") {
          toast.success("Pago aprobado con éxito");
          // Limpiar carrito si es necesario
          localStorage.removeItem("guest_cart");
        } else if (response.data.status === "DECLINED") {
          toast.error("El pago fue rechazado");
        } else {
          toast("El pago está pendiente de confirmación");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Error al verificar el pago");
      } finally {
        setLoading(false);
      }
    };

    if (transactionId && reference) {
      verifyPayment();
    } else {
      setLoading(false);
      navigate("/"); // Redirigir si no hay parámetros
    }
  }, [transactionId, reference, navigate]);

  const handleRetryPayment = () => {
    navigate("/checkout");
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga mientras se verifica el pago
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Estado de tu pago
          </h1>
          <div className="mt-4">
            {paymentStatus === "APPROVED" ? (
              <div className="text-green-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="mt-2 text-lg">¡Pago aprobado!</p>
              </div>
            ) : paymentStatus === "DECLINED" ? (
              <div className="text-red-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="mt-2 text-lg">Pago rechazado</p>
              </div>
            ) : (
              <div className="text-yellow-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2 text-lg">Pago pendiente</p>
              </div>
            )}
          </div>
        </div>

        {orderDetails && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900">
              Detalles de tu orden
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Número de orden:</span>
                <span className="font-medium">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">
                  {new Date(orderDetails.order_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método de pago:</span>
                <span className="font-medium">
                  {orderDetails.payment_method}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {paymentStatus === "DECLINED" && (
            <button
              onClick={handleRetryPayment}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Reintentar pago
            </button>
          )}
          <button
            onClick={handleReturnHome}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Volver al inicio
          </button>
        </div>

        {paymentStatus === "APPROVED" && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <p className="text-green-700">
              ¡Gracias por tu compra! Hemos enviado un correo con los detalles de
              tu pedido. Si tienes alguna pregunta, contáctanos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;