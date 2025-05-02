import { useEffect, useRef, useState } from "react";
import { FaCamera, FaCreditCard, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import SmartSpinner from "../../Both/SmartSpinner";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

  const [user, setUser] = useState();
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      // Aquí puedes manejar la subida a Cloudinary con FormData
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Aquí debes construir el FormData y hacer el PATCH o POST correspondiente
  };

  const handleBillingSubmit = (e) => {
    e.preventDefault();
    // Enviar dirección y teléfono
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validar contraseñas y enviar cambio
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <SmartSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

      {/* Información Personal */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Información</h2>
        </div>
        <form onSubmit={handleProfileSubmit}>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <img
                src={previewImage || user.user_url_photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200"
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={user.user_name}
                    onChange={(e) => setUser({ ...user, user_name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    value={user.user_number}
                    onChange={(e) => setUser({ ...user, user_number: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

      {/* Dirección */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <FaCreditCard className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Dirección</h2>
        </div>
        <form onSubmit={handleBillingSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <textarea
                value={user.user_direction}
                onChange={(e) => setUser({ ...user, user_direction: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Información Adicional</label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>

      {/* Cambiar Contraseña */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaKey className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Cambia la contraseña</h2>
        </div>
        <form onSubmit={handlePasswordSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {["current", "new", "confirm"].map((field) => (
              <div key={field} className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  {field === "current" ? "Contraseña actual" :
                   field === "new" ? "Nueva Contraseña" : "Confirma tu nueva contraseña"}
                </label>
                <input
                  type={showPassword[field] ? "text" : "password"}
                  value={passwords[field]}
                  onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                  className="mt-1 block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field)}
                  className="absolute top-9 right-3 text-gray-500"
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
