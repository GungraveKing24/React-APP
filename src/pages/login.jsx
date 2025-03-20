import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Login() {
    const [form, setForm] = useState({ user_email: "", user_password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://fastapi-app-production-f08f.up.railway.app/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                toast.error("Contraseña o correo incorrecto");
                return;
            }
    
            const data = await response.json();

            localStorage.setItem("token", data.token);
            toast.success("Inicio de sesión exitoso!");
            setTimeout(() => {
                window.location.href = "/profile";
            }, 500);
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            toast.error("Error al conectar con el servidor");
        }
    };

    const token = localStorage.getItem("token");

    if (token) {
        try {
            const userInfo = JSON.parse(atob(token.split(".")[1]));
            console.log("Usuario logueado:", userInfo);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }

    const handleGoogleLogin = async () => {
        window.location.href = "https://fastapi-app-production-f08f.up.railway.app/google/login";
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
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

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div className="mt-2">
                            <input
                                id="password"
                                name="user_password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="px-6 sm:px-0 max-w-sm py-5">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;