import React, { useEffect, useState } from "react";

function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Extraer el token de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");

        if (tokenFromUrl) {
            // Guardar el token en localStorage
            localStorage.setItem("token", tokenFromUrl);
            console.log("Token guardado en localStorage:", tokenFromUrl);

            // Limpiar la URL para evitar problemas en futuras renderizaciones
            window.history.replaceState({}, document.title, "/profile");
        }

        // Obtener el token de localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            console.warn("⚠️ No hay token, redirigiendo...");
            window.location.href = "/login";
            return;
        }

        try {
            console.log("Token obtenido:", token);
            const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
            console.log("Datos decodificados:", payload);
            setUser(payload);
        } catch (error) {
            console.error("❌ Error al decodificar el token:", error);
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (!user) {
        return (
            <div className="text-center mt-10">
                <p>Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div className="rounded-t-lg h-32 overflow-hidden">
                <img className="object-cover object-top w-full" 
                    src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" 
                    alt="Mountain"
                />
            </div>

            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img className="object-cover object-center h-32" src={user.user_url_photo} alt="User" />
            </div>

            <div className="text-center mt-2">
                <h2 className="font-semibold">{user.user_name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>

            <ul className="py-4 mt-2 text-gray-700">
                <li className="text-center">Número: {user.user_number}</li>
                <li className="text-center">Residencia: {user.user_direction}</li>
                <li className="text-center">Rol: {user.user_role}</li>
            </ul>

            <div className="p-4 border-t mx-8 mt-2">
                <button onClick={handleLogout} className="w-1/2 block mx-auto rounded-full bg-red-500 hover:shadow-lg font-semibold text-white px-6 py-2">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;