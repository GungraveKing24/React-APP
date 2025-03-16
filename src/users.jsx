import { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener usuarios
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/users", { withCredentials: true });
                setUsers(response.data); // Guardamos los usuarios en el estado
            } catch (error) {
                setError("Error al obtener los usuarios"); // Si ocurre un error, lo mostramos
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []); // La solicitud solo se hace una vez cuando el componente se monta

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
            
            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Muestra el error si ocurre */}
            
            {users.length === 0 ? (
                <p>No hay usuarios disponibles.</p>
            ) : (
                <ul className="space-y-4">
                    {users.map((user) => (
                        <li key={user.user_email} className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold">{user.user_name}</h2>
                            <p>Email: {user.user_email}</p>
                            <p>Foto: <img src={user.user_picture} alt={user.user_name} className="w-16 h-16 rounded-full mt-2" /></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
