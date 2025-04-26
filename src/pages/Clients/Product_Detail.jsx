import { useEffect, useState } from "react";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios/Axios";

export default function details() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("descripcion");
    const [product, setProduct] = useState({})
    const [finalPrice, setFinalPride] = useState(0)

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

    const [cantidad, setCantidad] = useState(1);
    const incrementar = () => setCantidad(cantidad + 1);
    const disminuir = () => cantidad > 1 && setCantidad(cantidad - 1);
  
    return (
      <section className="flex justify-center items-center min-h-screen bg-[#F8E8EE] p-6">
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
  
              <button className="mt-4 w-full flex justify-center items-center border-2 border-[#EFB8C8] text-[#EFB8C8] px-6 py-3 rounded-lg shadow-md hover:bg-[#F8E8EE] transition">
                <FaShoppingCart className="mr-2" /> Agregar al carrito
              </button>
  
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
