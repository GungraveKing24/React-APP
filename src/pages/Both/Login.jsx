import { useEffect, useState } from 'react';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import Logo from '../../assets/ArreglitosSV.png';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ 
    user_email: "", 
    user_password: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { login } = useAuth()

 
  useEffect(() => {
    if(token){
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]))
        console.log("Usuario autenticado con exito", userInfo)
        // Redirigir según el rol del usuario
        if (userInfo.user_role === 'Administrador') {
          navigate("/AdminDashboard");
        } else {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error decodificando el token", error)
        localStorage.removeItem("token");
      }
    }
  }, [token, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

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
    } else if (form.user_password.length < 6) {
      newErrors.user_password = "Mínimo 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  
  async function handleSubmit(e){
    e.preventDefault()
    if (!validateForm() || isSubmitting) return;
  
    setIsSubmitting(true);
    try {
      const url = import.meta.env.VITE_API_URL

      const res = await fetch(url + "login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      })

      if(!res.ok){
        toast.error("Contraseña o correo incorrecto");
        return
      }

      const fetchData = await res.json()
      localStorage.setItem("token", fetchData.token)
      login(fetchData.token);
      toast.success("Inicio de sesión exitoso!");
      localStorage.removeItem("guest_cart");
      
      // Decodificar el token para obtener el rol
      const payload = JSON.parse(atob(fetchData.token.split(".")[1]));
      console.log("Payload del token:", payload);
      // Redirigir según el rol
      if (payload.user_role === 'Administrador') {
        console.log("Redirigiendo a AdminDashboard");
        navigate("/AdminDashboard");
      } else {
        navigate("/profile");
        console.log("Redirigiendo a profile");
      }
      
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error("Error:", error);
    }
  }

  const handleGoogleLogin = () => {
    const frontendUrl = window.location.origin;
    const callbackUrl = `${frontendUrl}/google/callback`;
    const encodedCallback = encodeURIComponent(encodeURIComponent(callbackUrl));
    const url = `https://fastapi-app-production-f08f.up.railway.app/google/login?callback_url=${encodedCallback}`;
    
    localStorage.removeItem("guest_cart");
    window.location.href = url;
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
          <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
          <p className="text-pink-100 mt-1">Bienvenido de vuelta</p>
        </div>
        
      
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-Title text-gray-700">Contraseña</label>
              <a 
                href="#" 
                className="text-sm text-black hover:text-pink-400 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  toast("Funcionalidad en desarrollo", { icon: "🔧" });
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
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
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            {errors.user_password && <p className="mt-1 text-sm text-red-500">{errors.user_password}</p>}
          </div>

   
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-[#EFB8C8] hover:bg-pink-600 text-white font-Title rounded-lg transition duration-200 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando...
              </>
            ) : (
              <>
                Acceder <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 font-Title flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O inicia sesión con</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg font-Title hover:bg-gray-50 transition duration-200 flex items-center justify-center text-gray-700 font-medium"
          >
            <FaGoogle className="text-blue-500 mr-2" />
            Google
          </button>

          <div className="text-center text-sm font-Title text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/signin" className="text-[#EFB8C8] hover:text-pink-600 font-medium">
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}