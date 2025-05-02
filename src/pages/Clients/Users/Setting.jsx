import { useEffect, useRef, useState } from "react";
import { FaCamera, FaMapMarkerAlt, FaKey, FaEye, FaEyeSlash, FaSave, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import SmartSpinner from "../../Both/SmartSpinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const url = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const [errors, setErrors] = useState({
    profile: {},
    password: {},
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
  }, [navigate, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!user.user_name) newErrors.user_name = "Nombre es requerido";
    if (!user.email) {
      newErrors.email = "Email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Email no válido";
    }
    
    setErrors({...errors, profile: newErrors});
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwords.current) newErrors.current = "Contraseña actual es requerida";
    if (!passwords.new) {
      newErrors.new = "Nueva contraseña es requerida";
    } else if (passwords.new.length < 6) {
      newErrors.new = "Mínimo 6 caracteres";
    }
    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Las contraseñas no coinciden";
    }
    
    setErrors({...errors, password: newErrors});
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // Agregar solo los campos que han cambiado
      if (user.user_name !== originalData.user_name) {
        formData.append("user_name", user.user_name);
      }
      if (user.email !== originalData.email) {
        formData.append("user_email", user.email);
      }
      if (user.user_number !== originalData.user_number) {
        formData.append("user_number", user.user_number);
      }
      if (user.user_direction !== originalData.user_direction) {
        formData.append("user_direction", user.user_direction);
      }
      if (fileInputRef.current?.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }
  
      const response = await axios.patch(
        "/api/user/update",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success("Perfil actualizado correctamente");
      // Actualizar los datos originales
      setOriginalData({
        user_name: user.user_name,
        email: user.email,
        user_number: user.user_number,
        user_direction: user.user_direction
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      const message = error.response?.data?.detail || "Error al actualizar el perfil";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    setLoading(true);

    
    try {
      const formData = new FormData();
      formData.append("old_password", passwords.current);
      formData.append("new_password", passwords.new);
      formData.append("confirm_password", passwords.confirm);
      
      const response = await axios.patch(
        url + "user/password",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status !== 200) {
        throw new Error("Error al actualizar la contraseña");
      } else {
        toast.success("Contraseña actualizada correctamente");
        setPasswords({ current: '', new: '', confirm: '' });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      const message = error.response?.data?.detail || "Error al actualizar la contraseña";
      toast.error(message);
      
      // Manejar específicamente el error de contraseña incorrecta
      if (error.response?.status === 400 && error.response?.data?.detail === "La contraseña actual no es correcta") {
        setErrors({
          ...errors,
          password: { ...errors.password, current: "La contraseña actual no es correcta" }
        });
      }
    } finally {
      setLoading(false);
    }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración de Cuenta</h1>

      {/* Información Personal */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <FaUser className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
        </div>
        
        <form onSubmit={handleProfileSubmit}>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={previewImage || user.user_url_photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 shadow-lg text-white hover:bg-blue-700 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCamera className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              <span className="text-sm text-gray-500">Formatos: JPG, PNG (Max. 5MB)</span>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={user.user_name || ''}
                    onChange={(e) => setUser({ ...user, user_name: e.target.value })}
                    className={`w-full rounded-md border ${errors.profile.user_name ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Tu nombre completo"
                  />
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.profile.user_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.profile.user_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className={`w-full rounded-md border ${errors.profile.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="tu@email.com"
                  />
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.profile.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={user.user_number || ''}
                    onChange={(e) => setUser({ ...user, user_number: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1234567890"
                  />
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <div className="relative">
              <textarea
                value={user.user_direction || ''}
                onChange={(e) => setUser({ ...user, user_direction: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu dirección completa"
              />
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {loading ? (
                <>
                  <SmartSpinner size={4} />
                  Guardando...
                </>
              ) : (
                <>
                  <FaSave />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Cambiar Contraseña */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaKey className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Cambiar Contraseña</h2>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {["current", "new", "confirm"].map((field) => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === "current" ? "Contraseña Actual" :
                 field === "new" ? "Nueva Contraseña" : "Confirmar Nueva Contraseña"}
              </label>
              <div className="relative">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  value={passwords[field]}
                  onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                  className={`w-full rounded-md border ${errors.password[field] ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pr-10 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={
                    field === "current" ? "Ingresa tu contraseña actual" :
                    field === "new" ? "Mínimo 6 caracteres" : "Repite tu nueva contraseña"
                  }
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password[field] && (
                <p className="mt-1 text-sm text-red-600">{errors.password[field]}</p>
              )}
            </div>
          ))}
          
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {loading ? (
                <>
                  <SmartSpinner size={4} />
                  Actualizando...
                </>
              ) : (
                <>
                  <FaSave />
                  Cambiar Contraseña
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;