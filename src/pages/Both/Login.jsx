import { useEffect, useState } from 'react'
import Logo from '../../assets/ArreglitosSV.png'
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({user_email: "", user_password: ""})
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    if(token){
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]))
        console.log("Usuario autenticado con exito", userInfo)
        // Redirigir según el rol del usuario
        if (userInfo.role === 'Administrador') {
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

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault()
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
      toast.success("Inicio de sesión exitoso!");
      
      // Decodificar el token para obtener el rol
      const payload = JSON.parse(atob(fetchData.token.split(".")[1]));
      
      // Redirigir según el rol
      if (payload.role === 'Administrador') {
        navigate("/AdminDashboard");
      } else {
        navigate("/profile");
      }
      
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error("Error:", error);
    }
  }

  async function handleGoogleLogin() {
    const frontendUrl = window.location.origin;
    const callbackUrl = `${frontendUrl}/google/callback`;
    
    // Codifica la URL de callback dos veces para evitar problemas
    const encodedCallback = encodeURIComponent(encodeURIComponent(callbackUrl));
    

    const url = import.meta.env.VITE_API_URL + `google/login?callback_url=${encodedCallback}`;
    
    window.location.href = url;
  }

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
            <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Accede a tu cuenta
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg p-5">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Correo Electronico
                </label>
                <div className="mt-2">
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-gray-950 hover:text-gray-800">
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="user_password"
                    name="user_password"
                    type="password"
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#EFB8C8] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                >
                  Acceder
                </button>
              </div>
            </form>

            <div className="px-6 sm:px-0 max-w-sm py-5">
              <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
                  <svg
                    className="mr-2 w-5 h-5"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512">
                    <path
                      fill="#4285F4"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                  </svg>
                  Accede con Google
                </button>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              No tienes cuenta?{' '}
              <a href="/signin" className="font-semibold text-gray-950 hover:text-gray-800">
                Crea una cuenta
              </a>
            </p>
          </div>
      </div>
    </>
  )
}