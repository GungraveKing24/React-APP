import { useState } from "react";
import { MdOutlineLogoDev } from "react-icons/md";


{/*Mejoren la interfaz
la deje algo sencilla pero para que sirva de Modelo
si quieren cambienla a algo mas bonito*/}

export default function CheckoutForm() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    dedicatoria: "",
    email: "",
    departamento: "",
    direccion: "",
    telefono: "",
    esRegalo: false,
    notas: "",
    metodoPago: "Contra Entrega",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Orden enviada:", form);
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white shadow-lg rounded-2xl border border-gray-200 flex gap-10">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Información</h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-3 gap-6">
            <input type="text" name="nombre" placeholder="Nombre" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange} />
            <input type="text" name="apellidos" placeholder="Apellidos" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange} />
            <input type="text" name="dedicatoria" placeholder="Dedicatoria" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange} />
          <select name="departamento" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange}>
            <option value="">Seleccione Departamento</option>
            <option value="San Salvador">San Salvador</option>
            <option value="La Libertad">La Libertad</option>
          </select>
          <div className="grid grid-cols-2 gap-6">
            <input type="text" name="direccion" placeholder="Dirección" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange} />
            <input type="text" name="telefono" placeholder="Teléfono" className="input border border-gray-300 p-3 rounded-lg" onChange={handleChange} />
          </div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="esRegalo" onChange={handleChange} />
            <span className="text-gray-700">Es un regalo</span>
          </label>
          <h2 className="text-xl font-semibold text-gray-700">Información Adicional</h2>
          <textarea name="notas" placeholder="Notas (Opcional)" className="input border border-gray-300 p-3 rounded-lg h-24" onChange={handleChange}></textarea>
          <button type="submit" className="bg-[#EFB8C8] py-3 rounded-xl text-white font-semibold text-lg shadow-md hover:bg-pink-500 transition">Ordenar</button>
        </form>
      </div>
      <div className="p-6 border rounded-2xl bg-gray-50 shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Pedido</h2>
        <p className="text-gray-600">Flores x5 - <span className="font-semibold">$70.00</span></p>
        <p className="text-gray-600">Flores x1 - <span className="font-semibold">$14.00</span></p>
        <p className="text-lg font-bold mt-4">Total: $84.00</p>
        <h2 className="mt-6 text-lg font-bold text-gray-700">Métodos de Pago</h2>
        <label className="flex items-center space-x-2 mt-2">
          <input type="radio" name="metodoPago" value="Contra Entrega" checked={form.metodoPago === "Contra Entrega"} onChange={handleChange} />
          <span className="text-gray-700">Contra Entrega</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input type="radio" name="metodoPago" value="Tarjeta" onChange={handleChange} />
          <span className="text-gray-700">Tarjeta</span>
        </label>
      </div>
    </div>
  );
}
