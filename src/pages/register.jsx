import { useState } from "react";

function Register() {
    const [form, setForm] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
        user_number: "",
        user_direction: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        alert(data.message);
    };

    if (localStorage.getItem("user_info")) {
        window.location.href = "/profile";
    }

return (
<div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register your Account
        </h2>
    </div>
    
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            
            {/* Username */}
            <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Username
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

            {/* Password */} 
            <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
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
                <label htmlFor="number" className="block text-sm/6 font-medium text-gray-900">
                    Number
                </label>
                <div className="mt-2">
                    <input
                    id="number"
                    name="user_number"
                    type="number"
                    required
                    autoComplete="number"
                    placeholder="Teléfono"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            {/* Direction */}
            <div>
                <label htmlFor="direction" className="block text-sm/6 font-medium text-gray-900">
                    Direction
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
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Register
                </button>
            </div>

            <div class="px-6 sm:px-0 max-w-sm">
                <button type="button" class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    Sign up with Google
                    <div></div>
                </button>
            </div>
        </form>
    </div>
</div>);
}

export default Register;
