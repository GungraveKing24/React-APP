import { useEffect, useState } from "react";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios/Axios";
import { toast, Toaster } from "react-hot-toast";
import { useCart } from "../../context/CarContext"
import { useAuth } from "../../context/AuthContext";

export default function details() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("descripcion");
    const [product, setProduct] = useState({})
    const [finalPrice, setFinalPride] = useState(0)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { updateCartCount } = useCart();
    const { user } = useAuth();

    const [cantidad, setCantidad] = useState(1);
    const incrementar = () => setCantidad(cantidad + 1);
    const disminuir = () => cantidad > 1 && setCantidad(cantidad - 1);

    useEffect(() => {
     async function fetchProduct(){
      try {
        const res = await axiosInstance.get(`/arrangements/${id}`)
        setProduct(res.data)
        setFinalPride(res.data.arr_discount
          ? (res.data.arr_price * (1 - res.data.arr_discount / 100)).toFixed(2)
          : res.data.arr_price.toFixed(2))
      } catch (error) {
        console.log(error)
      }
     }

    fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (user) {
            handleAddToCartUser();
        } else {
            handleAddToCartGuest();
        }
    };

    const handleAddToCartGuest = () => {
        setLoading(true);
        
        const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
    
        const existingItemIndex = guestCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            guestCart[existingItemIndex].details_quantity += cantidad;
        } else {
            guestCart.push({
                id: product.id,
                arrangements_id: product.id,
                details_quantity: cantidad, 
                details_price: parseFloat(finalPrice),
                final_price: parseFloat(finalPrice),
                arr_name: product.arr_name, 
                arr_img_url: product.arr_img_url
            });
        }
    
        localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        updateCartCount();
        toast.success("Producto agregado al carrito");
        setLoading(false);
    };

    const handleAddToCartUser = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No hay token de autenticación");

            const response = await axiosInstance.post(
              "orders/cart/add",
              {
                arrangements_id: product.id,
                details_quantity: cantidad,
                details_price: finalPrice,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            )

            if ([200, 201].includes(response.status)) {
                toast.success("Producto agregado correctamente");
                updateCartCount();
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            setError(handleCartError(error));
            
            if (error.response?.status === 401) {
                //localStorage.removeItem("token");
                //navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCartError = (error) => {
        if (!error.response) return "Error de conexión";
        
        switch (error.response.status) {
            case 401: return "Sesión expirada";
            case 404: return "Producto no encontrado";
            default: return "Error al agregar al carrito";
        }
    };

    return (
      <section className="flex justify-center items-center min-h-screen bg-[#F8E8EE] p-6">
        <Toaster />
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src={product.arr_img_url}
                alt={product.arr_name}
                className="w-72 rounded-lg shadow-md"
              />
            </div>
  
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">{product.arr_name}</h2>
              <span className="text-2xl text-[#EFB8C8] font-semibold">${finalPrice}</span>
  
              <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
                <button
                  className="border-2 border-[#EFB8C8] text-[#EFB8C8] px-3 py-2 rounded-md hover:bg-[#F8E8EE] transition"
                  onClick={disminuir}
                >
                  <FaMinus />
                </button>
                <span className="text-lg font-semibold">{cantidad}</span>
                <button
                  className="border-2 border-[#EFB8C8] text-[#EFB8C8] px-3 py-2 rounded-md hover:bg-[#F8E8EE] transition"
                  onClick={incrementar}
                >
                  <FaPlus />
                </button>
              </div>
 
              {loading ? (
                <span className="flex items-center justify-center animate-spin text-sm">
                  🌸
                </span>
              ) : (
                <button className="mt-4 w-full flex justify-center items-center border-2 border-[#EFB8C8] text-[#EFB8C8] px-6 py-3 rounded-lg shadow-md hover:bg-[#F8E8EE] transition" onClick={handleAddToCart}>
                  <FaShoppingCart className="mr-2" /> Agregar al carrito
                </button>
              )}
              
              {error && (
                <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
              )}
  
              <div className="mt-6 flex justify-center border-b w-full">
                <button
                  className={`px-4 py-2 font-semibold border-b-2 transition ${
                    activeTab === "descripcion" ? "text-[#EFB8C8] border-[#EFB8C8]" : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("descripcion")}
                >
                  Descripción
                </button>
                <button
                  className={`px-4 py-2 ml-4 font-semibold border-b-2 transition ${
                    activeTab === "comentarios" ? "text-[#EFB8C8] border-[#EFB8C8]" : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("comentarios")}
                >
                  Comentarios
                </button>
              </div>
  
              {activeTab === "descripcion" ? (
                <p className="mt-4 text-gray-700">{product.arr_description}</p>
              ) : (
                <div className="mt-4 space-y-2 text-gray-700">
                  <p><strong>Kristin Watson:</strong> Hermoso ramo</p>
                  <p><strong>Jane Cooper:</strong> Hermoso cerdito</p>
                  <p><strong>Jacob Jones:</strong> x2</p>
                  <p><strong>Ralph Edwards:</strong> Me encanta este lugar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
}
