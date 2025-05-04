import { useEffect, useRef, useState } from "react";
import {
  FaCamera, FaMapMarkerAlt, FaKey, FaEye, FaEyeSlash, FaSave,
  FaUser, FaEnvelope, FaPhone
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SmartSpinner from "../../Both/SmartSpinner";
import { useAuth } from "../../../context/AuthContext";

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const url = import.meta.env.VITE_API_URL;

  // Usamos directamente el contexto de autenticación
  const { user: contextUser, updateUser } = useAuth();
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    user_name: '',
    user_number: '',
    user_direction: ''
  });

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Sincronizar formData con el contexto al cargar
  useEffect(() => {
    if (contextUser) {
      setFormData({
        user_name: contextUser.user_name || '',
        user_number: contextUser.user_number || '',
        user_direction: contextUser.user_direction || ''
      });
      // Usar siempre la imagen del contexto (API) no del token
      setPreviewImage(contextUser.user_url_photo || null);
    }
  }, [contextUser]);

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Mostrar vista previa inmediata
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!formData.user_name) newErrors.user_name = "Nombre es requerido";
    setErrors({ ...errors, profile: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setLoading(true);
    try {
      const form = new FormData();
      form.append("nombre", formData.user_name);
      form.append("numero", formData.user_number);
      form.append("direccion", formData.user_direction);
      
      // Solo adjuntar imagen si hay una nueva seleccionada
      if (selectedImage) {
        form.append("foto", selectedImage);
      }

      const res = await axios.patch(`${url}profile/update`, form, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.status === 200) {
        toast.success("Perfil actualizado correctamente");
        
        // Forzar actualización completa del contexto
        const { data: updatedUser } = await axios.get(`${url}users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        updateUser(updatedUser);
        setSelectedImage(null); // Resetear imagen seleccionada
      }
    } catch (error) {
      toast.error("Error al actualizar el perfil");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwords.current) newErrors.current = "Contraseña actual es requerida";
    if (!passwords.new) newErrors.new = "Nueva contraseña es requerida";
    else if (passwords.new.length < 6) newErrors.new = "Mínimo 6 caracteres";
    if (passwords.new !== passwords.confirm) newErrors.confirm = "Las contraseñas no coinciden";
    setErrors({ ...errors, password: newErrors });
    return Object.keys(newErrors).length === 0;
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

      await axios.patch(
        `${url}user/password`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Contraseña actualizada correctamente");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      const detail = error.response?.data?.detail;
      toast.error(detail || "Error al actualizar la contraseña");

      if (error.response?.status === 400 && detail === "La contraseña actual no es correcta") {
        setErrors({
          ...errors,
          password: { ...errors.password, current: "La contraseña actual no es correcta" }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!contextUser) {
    return (
      <div className="text-center mt-10">
        <SmartSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración de Cuenta</h1>

      {/* Perfil */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleProfileSubmit}>
          <div className="flex items-center gap-2 mb-6">
            <FaUser className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Imagen */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={previewImage || contextUser.user_url_photo || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border"
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 text-white"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCamera />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <span className="text-sm text-gray-500">Formatos: JPG, PNG (Max. 5MB)</span>
            </div>

            {/* Campos */}
            <div className="flex-1 space-y-4">
              <InputField
                label="Nombre Completo"
                icon={FaUser}
                value={formData.user_name}
                error={errors.profile.user_name}
                onChange={(e) => setFormData({...formData, user_name: e.target.value})}
              />

              <InputField
                label="Correo Electrónico"
                icon={FaEnvelope}
                value={contextUser.user_email || ''}
                disabled
              />

              <InputField
                label="Teléfono"
                icon={FaPhone}
                value={formData.user_number}
                onChange={(e) => setFormData({...formData, user_number: e.target.value})}
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <div className="relative">
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500"
                value={formData.user_direction}
                onChange={(e) => setFormData({...formData, user_direction: e.target.value})}
              />
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <SubmitButton loading={loading} label="Guardar Cambios" />
          </div>
        </form>
      </div>

      {/* Contraseña */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handlePasswordSubmit}>
          <div className="flex items-center gap-2 mb-6">
            <FaKey className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Cambiar Contraseña</h2>
          </div>

          {["current", "new", "confirm"].map((field) => (
            <PasswordInput
              key={field}
              field={field}
              label={
                field === "current"
                  ? "Contraseña Actual"
                  : field === "new"
                  ? "Nueva Contraseña"
                  : "Confirmar Nueva Contraseña"
              }
              value={passwords[field]}
              error={errors.password[field]}
              show={showPassword[field]}
              onToggle={() => togglePasswordVisibility(field)}
              onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
            />
          ))}

          <div className="flex justify-end mt-6">
            <SubmitButton loading={loading} label="Cambiar Contraseña" />
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, icon: Icon, value = '', onChange, error, disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 focus:ring-blue-500 focus:border-blue-500`}
        />
        <Icon className="absolute left-3 top-3 text-gray-400" />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function PasswordInput({ field, label, value, error, show, onToggle, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pr-10 focus:ring-blue-500 focus:border-blue-500`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function SubmitButton({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
    >
      {loading ? <><SmartSpinner size={4} /> {label}...</> : <><FaSave /> {label}</>}
    </button>
  );
}

export default Settings;