import { useEffect, useState } from "react";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios/Axios";
import { toast, Toaster } from "react-hot-toast";
import { useCart } from "../../context/CarContext"
import { useAuth } from "../../context/AuthContext";
import { usePost } from '../../Axios/customHooks/usePost';

export default function details() {
    const { postData } = usePost();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("comment")

    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [finalPrice, setFinalPride] = useState(0)
    const [form, setForm] = useState({
      comment_text: "",
      comment_rating: 0
    })

    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
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

        const res2 = await axiosInstance.get(`/Comments/${id}`)
        setComments(res2.data)
      } catch (error) {
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleRating = (rating) => {
      setForm(prev => ({
        ...prev,
        comment_rating: rating
      }));
    };

    async function handleCommentSubmit(e){
      e.preventDefault()

      if(form.comment_rating === 0 || !form.comment_text.trim()){
        toast.error("Rellena todos los campos")
        return
      }

      setIsSubmitting(true)
      try {
        const { data, status } = await postData(`/Comments/${id}`, form ,true);
        if (status === 200 || status === 201){
          toast.success("Comentario enviado")
          setComments(prev => [
            ...prev,
            data
          ]);
        } else{
          toast.error("Error al enviar comentario")
        }
      } catch (error) {
        toast.error("Error al enviar comentario")
      } finally{
        setIsSubmitting(false)
        setForm({
          comment_text: "",
          comment_rating: 0
        })
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

        {user?.user_role !== "Administrador" && (
          <>
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
              <button
                className="mt-4 w-full flex justify-center items-center border-2 border-[#EFB8C8] text-[#EFB8C8] px-6 py-3 rounded-lg shadow-md hover:bg-[#F8E8EE] transition"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="mr-2" /> Agregar al carrito
              </button>
            )}

            {error && (
              <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
            )}
          </>
        )}

        {/* Tabs */}
        <div className="mt-6 flex justify-center border-b w-full">
          <button className="px-4 py-2 font-semibold border-b-2 transition text-gray-600">
            Descripción
          </button>
        </div>

        <p className="mt-4 text-gray-700 max-h-52 overflow-y-auto pr-2">{product.arr_description}</p>
      </div>
    </div>

    {/* Nueva sección de comentarios debajo del producto */}
    <div className="mt-8 w-full">
      <div className="mt-6 flex justify-center border-b w-full">
        <button
          className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "comment" ? "text-[#EFB8C8] border-[#EFB8C8]" : "text-gray-600"
            }`}
          onClick={() => setActiveTab("comment")}
        >
          Comentarios
        </button>
        {user?.user_role === "Cliente" && (
          <button
            className={`px-4 py-2 ml-4 font-semibold border-b-2 transition ${
              activeTab === "view" ? "text-[#EFB8C8] border-[#EFB8C8]" : "text-gray-600"
            }`}
          onClick={() => setActiveTab("view")}
          >
            Deja tu comentario
          </button>
        )}
      </div>

      <div className="space-y-2 text-gray-700">
        {activeTab === "view" ? (
            <div className="mt-4 space-y-2 text-gray-700">
              <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-4">
                <textarea
                  name="comment_text"
                  rows="5"
                  placeholder="Escribe tu comentario aquí..."
                  className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#EFB8C8]"
                  value={form.comment_text}
                  onChange={handleChange}
                  required
              />

            <div>
              <p className="mb-2 text-gray-700 font-semibold">Calificación:</p>
              <div className="flex gap-2">
                {[...Array(10)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <div key={ratingValue} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleRating(ratingValue)}
                        className={`p-2 rounded-full ${
                        ratingValue <= form.comment_rating ? "text-pink-400" : "text-gray-300"
                          } hover:scale-110 transition`}
                      >
                        🌸
                      </button>
                      <span className="text-xs text-gray-500">{ratingValue}</span>
                    </div>
                  );
                })}
              </div>
              {form.comment_rating > 0 && (
                <p className="mt-1 text-sm text-gray-600">Tu calificación: {form.comment_rating} / 10</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#EFB8C8] text-white font-semibold py-3 rounded-lg hover:bg-pink-400 transition disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar comentario"}
            </button>
            </form>
            </div>
          ) : comments.length > 0 ? (
            <div className="mt-4 space-y-2 text-gray-700">
              {comments.map((comment) => (
                  <div className="bg-[#F8E8EE] p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800">{comment.user_name}</span>
                      <span className="text-red-800 font-medium">{comment.comment_rating}/10</span>
                    </div>
                    <p className="text-gray-700">{comment.comment_text}</p>
                  </div>
              ))}
            </div>
          ) : (
            <h3 className="text-lg font-medium text-gray-900 mb-1 mt-4">
              No hay comentarios
            </h3>
          )}
      </div>
    </div>
  </div>
</section>
    );
}
