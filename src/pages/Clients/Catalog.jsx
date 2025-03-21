// import React from "react";

// const categories = ["Rosas", "Tulipanes", "Orquídeas", "Suculentas", "Ramos y Centros"];
// const products = [
//   { id: 1, name: "Ramo Clásico", price: "$14.99", image: "/images/ramo1.jpg" },
//   { id: 2, name: "Rosa Azul", price: "$9.99", image: "/images/rosa_azul.jpg" },
//   { id: 3, name: "Flor de Algodón", price: "$12.99", image: "/images/flor_algodon.jpg" },
//   { id: 4, name: "Ramo Encanto", price: "$19.99", image: "/images/ramo_encanto.jpg" },
// ];

// export default function catalog() {
//   return (
//     <div className="flex bg-[#F8F3ED] min-h-screen">
//       {/* Sidebar de categorías */}
//       <aside className="w-1/4 p-6 bg-white shadow-md">
//         <h2 className="text-xl font-semibold text-gray-800">Categorías</h2>
//         <ul className="mt-4 space-y-3">
//           {categories.map((category, index) => (
//             <li key={index} className="text-pink-600 hover:text-pink-800 cursor-pointer">
//               {category}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Catálogo de productos */}
//       <main className="w-3/4 p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Catálogo de Flores</h1>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
//               <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
//               <h2 className="text-lg font-semibold mt-2 text-gray-700">{product.name}</h2>
//               <p className="text-pink-600 font-bold">{product.price}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// NO FUNCIONA AÚN, TIENE BUGS 

function ProductCard({ product }) {
    console.log(product);
  
    const finalPrice = product.discount
      ? product.arr_price * (1 - product.discount / 100)
      : product.arr_price;
  
    return (
      <a href="#" className="group relative block overflow-hidden">
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
  
        <img
          src={product.arr_img_url}
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
  
        <div className="relative border border-gray-100 bg-white p-6">
          {product.discount ? (
            <p className="text-gray-700">
              ${finalPrice}
              <span className="text-gray-400 line-through pl-2">${product.arr_price}</span>
            </p>
          ) : (
            <p className="text-gray-700">${product.arr_price}</p>
          )}
  
          <h3 className="mt-1.5 text-lg font-medium text-gray-900">{product.arr_name}</h3>
  
          <p className="mt-1.5 line-clamp-3 text-gray-700">{product.arr_description}</p>
  
          <form className="mt-4 flex gap-4">
            <button className="block w-full rounded-sm bg-red-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:scale-105">
              Agregar al carrito
            </button>
          </form>
        </div>
      </a>
    );
  }
  
  export default function Catalog() {
    const Products = [
      { arr_price: 80, arr_name: "Flores amarillas", arr_description: "Producto 1 para testeo", discount: 50 },
      { arr_price: 60, arr_name: "Flores rojas", arr_description: "Producto 2 para testeo" }
    ];
  
    console.log(Products);
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    );
  }