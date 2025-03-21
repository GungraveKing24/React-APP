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
