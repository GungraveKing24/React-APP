import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";

function ProductCard({ product }) {
  const finalPrice = product.arr_discount
    ? product.arr_price * (1 - product.arr_discount / 100)
    : product.arr_price;

  return (
    <div className="group relative block overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <img
        src={product.arr_img_url}
        alt={product.arr_name}
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.arr_name}</h3>
        <p className="text-gray-700 mt-2">{product.arr_description}</p>
        {product.arr_discount ? (
          <p className="text-gray-700 mt-2">
            ${finalPrice.toFixed(2)}
            <span className="text-gray-400 line-through pl-2">${product.arr_price.toFixed(2)}</span>
          </p>
        ) : (
          <p className="text-gray-700 mt-2">${product.arr_price.toFixed(2)}</p>
        )}
        <button className="block w-full rounded-sm bg-red-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:scale-105 mt-4">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fastapi-app-production-f08f.up.railway.app/arrangements/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener los arreglos:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <SmartSpinner /> 
      )}
    </div>
  );
}
