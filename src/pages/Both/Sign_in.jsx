import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCamera } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import Logo from '../../assets/ArreglitosSV.png';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const [form, setForm] = useState({
    user_firstname: "",
    user_lastname: "",
    user_email: "",
    user_password: "",
    user_number: "",
    user_direction: ""
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]));
        navigate("/profile", { replace: true });
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, [token, navigate]);

  const obtenerDireccionActual = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(res => res.json())
          .then(data => {
            const direccion = data.display_name;
            setForm(prev => ({ ...prev, user_direction: direccion }));
          })
          .catch(() => alert("Error al obtener la dirección"));
      },
      () => alert("No se pudo obtener tu ubicación")
    );
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    

    if (name === 'user_firstname' || name === 'user_lastname') {
      if (/[0-9]/.test(value)) {
        setErrors({...errors, [name]: "No se permiten números"});
        return;
      } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) {
        setErrors({...errors, [name]: "No se permiten caracteres especiales"});
        return;
      }
    }
    
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({...errors, [name]: null});
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    if (!file.type.match('image.*')) {
      toast.error("Solo se permiten imágenes (JPEG, PNG)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("La imagen no debe superar 2MB");
      return;
    }

    setImageFile(file);
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleGoogleLogin = () => {
    window.location.href = url + "google/login";
  };


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.user_firstname.trim()) {
      newErrors.user_firstname = "Nombre es requerido";
      isValid = false;
    } else if (form.user_firstname.length < 2) {
      newErrors.user_firstname = "Mínimo 2 caracteres";
      isValid = false;
    }

    if (!form.user_lastname.trim()) {
      newErrors.user_lastname = "Apellido es requerido";
      isValid = false;
    } else if (form.user_lastname.length < 2) {
      newErrors.user_lastname = "Mínimo 2 caracteres";
      isValid = false;
    }

    if (!form.user_email.trim()) {
      newErrors.user_email = "Correo electrónico es requerido";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email)) {
      newErrors.user_email = "Correo no válido";
      isValid = false;
    }

    if (!form.user_password) {
      newErrors.user_password = "Contraseña es requerida";
      isValid = false;
    } else if (form.user_password.length < 8) {
      newErrors.user_password = "Mínimo 8 caracteres";
      isValid = false;
    }

    if (!form.user_number.trim()) {
      newErrors.user_number = "Teléfono es requerido";
      isValid = false;
    } else if (!/^[0-9]+$/.test(form.user_number)) {
      newErrors.user_number = "Solo números permitidos";
      isValid = false;
    }

    if (!form.user_direction.trim()) {
      newErrors.user_direction = "Dirección es requerida";
      isValid = false;
    } else if (form.user_direction.length < 10) {
      newErrors.user_direction = "Dirección muy corta";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("user_name", `${form.user_firstname} ${form.user_lastname}`);
    formData.append("user_email", form.user_email);
    formData.append("user_password", form.user_password);
    formData.append("user_number", form.user_number);
    formData.append("user_direction", form.user_direction);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(url + "register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      toast.success(data.message || "¡Registro exitoso!");
      cleanForm();
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error) {
      toast.error(error.message || "Error al registrar. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanForm = () => {
    setForm({
      user_firstname: "",
      user_lastname: "",
      user_email: "",
      user_password: "",
      user_number: "",
      user_direction: "",
    });

    setPreviewImage(null);
    setImageFile(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center p-4">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#EFB8C8',
            color: '#fff',
          },
        }}
      />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
        
        <div className="bg-[#EFB8C8] p-6 text-center">
          <img src={Logo} alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-Title text-white">Crear Cuenta</h1>
          <p className="text-pink-100 mt-1 font-Title">Únete a nuestra comunidad</p>
        </div>
        
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="flex justify-center">
            <label className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-pink-100 border-2 border-dashed border-[#EFB8C8] flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <FiCamera className="mx-auto text-[#EFB8C8] text-2xl" />
                    <span className="text-xs text-pink-200 block mt-1">Subir foto</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition">
                <FiCamera className="text-white text-xl" />
              </div>
            </label>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-Title text-gray-700 mb-1">Nombre</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="user_firstname"
                  value={form.user_firstname}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 ${errors.user_firstname ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Tu nombre"
                />
              </div>
              {errors.user_firstname && <p className="mt-1 text-sm text-red-500">{errors.user_firstname}</p>}
            </div>

            <div>
              <label className="block text-sm font-Title text-gray-700 mb-1">Apellido</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="user_lastname"
                  value={form.user_lastname}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 ${errors.user_lastname ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Tu apellido"
                />
              </div>
              {errors.user_lastname && <p className="mt-1 text-sm text-red-500">{errors.user_lastname}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-Title text-gray-700 mb-1">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="user_email"
                value={form.user_email}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 ${errors.user_email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="correo@ejemplo.com"
              />
            </div>
            {errors.user_email && <p className="mt-1 text-sm text-red-500">{errors.user_email}</p>}
          </div>

          <div>
            <label className="block text-sm font-Title text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="user_password"
                value={form.user_password}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 ${errors.user_password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            {errors.user_password && <p className="mt-1 text-sm text-red-500">{errors.user_password}</p>}
          </div>

          <div>
            <label className="block text-sm font-Title text-gray-700 mb-1">Teléfono</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="user_number"
                value={form.user_number}
                onChange={handleChange}
                className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 ${errors.user_number ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ej: 1234567890"
              />
            </div>
            {errors.user_number && <p className="mt-1 text-sm text-red-500">{errors.user_number}</p>}
          </div>

          <div className='mb-4'>
            <label className="block text-sm font-Title text-gray-700 mb-1">Dirección</label>
            <div className="grid grid-cols-[4fr_1fr] gap-2 items-start">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="user_direction"
                  value={form.user_direction}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 ${errors.user_direction ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Dirección completa"
                />
                {errors.user_direction && (
                  <p className="mt-1 text-sm text-red-500">{errors.user_direction}</p>
                )}
              </div>

              <button
                  type="button"
                  onClick={obtenerDireccionActual}
                  className="p-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg flex items-center justify-center h-full"
                  title="Usar ubicación actual"
                >
                <FiMapPin />
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 font-Title bg-[#EFB8C8] hover:bg-pink-600 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : 'Registrarme'}
          </button>

          
          <div className="relative font-Title">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O regístrate con</span>
            </div>
          </div>

          
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border font-Title border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center text-gray-700 font-medium"
          >
            <FaGoogle className="text-blue-600 mr-2" />
            Google
          </button>

          
          <div className="text-center text-sm font-Title text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-[#EFB8C8]  hover:text-pink-600 font-medium">
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}