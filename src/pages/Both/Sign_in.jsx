import { useEffect, useState } from 'react';
import Logo from '../../assets/ArreglitosSV.png'
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_number: "",
    user_direction: "",
});
const token = localStorage.getItem("token")
const navigate = useNavigate()

  useEffect(() => {
    if(token){
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]))
        console.log("Usuario autenticado con exito", userInfo)
        navigate("/profile")
      } catch (error) {
        console.error("Error")
      }
    }
  }, [])

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

async function handleGoogleLogin(){
  window.location.href = "https://fastapi-app-production-f08f.up.railway.app/google/login"
}

function validateForm(){
    if (!form.user_name || !form.user_email || !form.user_password || !form.user_number || !form.user_direction) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email);
    if (!isEmailValid) {
      toast.error("El correo electrónico no es válido.");
      return;
    }

    if(form.user_password.length < 8){
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  validateForm()

  try {
    const response = await fetch("https://fastapi-app-production-f08f.up.railway.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    const data = await response.json();
    toast.success(data.message);

    {/* In the case the backend returns the token when you register, put this code 
        localStorage.setItem("token", data.token)
        setTimeout(() => {
          window.location.href = "/profile"
        }, 500)
      */}
  } catch (error) {
    console.log(":(")
  }
};
  
  return (
    <>
      <div className="flex min-h-fit flex-1 flex-col justify-center px-6 py-12 lg:px-8">

          <Toaster
            position="top-center"
            reverseOrder={false}
          />

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="ArreglitosSV"
              src={Logo}
              className="mx-auto h-50 w-auto"
            />
            <h2 className="mt-3 text-center text-2xl/9 font-Title tracking-tight text-gray-900">
              Crea tu cuenta
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg p-5">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            
            {/* Username */}
            <div>
                <label htmlFor="username" className="block text-sm/6 font-Title text-gray-900">
                    Nombre
                </label>
                <div className="mt-2">
                    <input
                    id="username"
                    name="user_name"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm/6 font-Title text-gray-900">
                    Correo
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="user_email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Correo"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            {/* Password */} 
            <div>
                <label htmlFor="password" className="block text-sm/6 font-Title text-gray-900">
                  Contraseña
                </label>

                <input
                id="password"
                name="user_password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>

            {/* Number */}
            <div>
                <label htmlFor="Cellphone" className="block text-sm/6 font-Title text-gray-900">
                  Teléfono
                </label>
                <div className="mt-2">
                    <input
                    id="Cellphone"
                    name="user_number"
                    type="text"
                    required
                    autoComplete="Cellphone"
                    placeholder="Teléfono"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            {/* Direction */}
            <div>
                <label htmlFor="direction" className="block text-sm/6 font-Title text-gray-900">
                    Dirección
                </label>
                <div className="mt-2">
                    <input
                    id="direction"
                    name="user_direction"
                    type="text"
                    required
                    autoComplete="direction"
                    placeholder="Dirección"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />  
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#EFB8C8] px-3 py-1.5 text-sm/6 font-Title text-white shadow-xs hover:bg-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Registrate
                </button>
            </div>
        </form>

            {/* Cambiee color */}
            <div className="px-6 sm:px-0 max-w-sm py-5 font-Title">
              <button
               type="button"
               onClick={handleGoogleLogin} className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
               <svg
                 className="mr-2 w-5 h-5 "
                 aria-hidden="true"
                 focusable="false"
                 data-prefix="fab"
                 data-icon="google"
                 role="img"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 488 512">
                 <path
                   fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
               </svg>
                 Regístrate con Google
              </button>
            </div>


            <p className="mt-10 text-center  font-Title text-sm/6 text-gray-500">
              Ya tienes cuenta?{' '}
              <a href="/login" className="font-Title text-gray-950 hover:text-gray-800">
                Accede
              </a>
            </p>
          </div>
      </div>
    </>
  )
}

