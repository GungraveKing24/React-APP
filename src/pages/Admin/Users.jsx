import { useEffect, useMemo, useState } from 'react';
import { FaUsers, FaSearch, FaRegEnvelope, FaPhone, FaRegCalendarAlt } from 'react-icons/fa';
import { axiosInstance } from '../../Axios/Axios';

// HighlightText.jsx
export function HighlightText({ text, highlight }) {
  if (!highlight.trim()) {
    return text;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark
        key={index}
        className="bg-red-200 text-red-800 rounded px-1 py-0.5"
      >
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get("/Users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUsers(response.data)
    }
    fetchUsers()
  }, []);

  // Filtrar usuarios
  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users; // Si searchTerm está vacío, mostrar todos

    return users.filter(user => 
      (user.user_name?.toLowerCase().includes(term)) ||
      (user.user_email?.toLowerCase().includes(term))
    );
  }, [users, searchTerm]);

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="min-h-screen bg-white p-6 font-title">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center gap-4">
                <button 
                onClick={() => window.history.back()} 
                className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors"
                >
                <svg xmlns="/AdminDashboard" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-1 font-Title">Volver</span>
                </button>
                <div>
                <h1 className="text-3xl font-Title text-[#B9A387] flex items-center">
                    <FaUsers className="mr-3 text-[#B9A387]" />
                    Gestión de Usuarios
                </h1>
                <p className="text-[#B9A387]">Administra los clientes registrados en tu floristería</p>
                </div>
            </div>
            <div className="mt-4 md:mt-0 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
                </div>
                <input
                type="text"
                placeholder="Buscar usuarios..."
                className="pl-10 pr-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 text-sm">Total Usuarios</h3>
            <p className="text-2xl font-Title text-[#B9A387]">{users.length}</p>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-rose-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Contacto</th>
                  <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Historial</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.user_name} className="hover:bg-rose-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
                            {user.user_name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <HighlightText text={user.user_name} highlight={searchTerm}/>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaRegCalendarAlt className="mr-1" />
                              {user.user_register_date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaRegEnvelope className="mr-2 text-rose-500" />
                          <HighlightText text={user.user_email} highlight={searchTerm}/>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <FaPhone className="mr-2 text-rose-500" />
                          {user.user_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p>Historial</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No se encontraron usuarios
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredUsers.length > usersPerPage && (
            <div className="bg-rose-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{indexOfFirstUser + 1}</span> a{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastUser, filteredUsers.length)}
                    </span>{' '}
                    de <span className="font-medium">{filteredUsers.length}</span> usuarios
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      &larr; Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                          ${currentPage === page 
                            ? 'bg-rose-600 text-white border-rose-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Siguiente &rarr;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
