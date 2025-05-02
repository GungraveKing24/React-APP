import { useState, useEffect  } from 'react';
import { FaUsers, FaSearch, FaUserEdit, FaTrash, FaRegEnvelope, FaPhone, FaRegCalendarAlt, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { axiosInstance } from '../../Axios/Axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/Users", {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      })  
      setUsers(response.data)
  }

  // Filtrar usuarios
  const filteredUsers = users.filter(user =>
    (user.user_name && user.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.user_email && user.user_email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Cambiar estado del usuario
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  // Preparar eliminación de usuario
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Eliminar usuario después de confirmación
  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      // Resetear a la primera página si es necesario
      if (currentUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Obtener icono según estado
  const getStatusIcon = (status) => {
    switch (status) {
      case "Procesando":
        return <FaInfoCircle className="text-yellow-500 text-xl" />;
      case "En camino":
        return <FaTruck className="text-blue-500 text-xl" />;
      case "Completado":
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case "Cancelado":
        return <FaTimesCircle className="text-red-500 text-xl" />;
      default:
        return <FaInfoCircle className="text-gray-500 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case true:
        return "bg-green-100 text-green-800";
      case false:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  console.log(users)

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
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 text-sm">Usuarios Activos</h3>
            <p className="text-2xl font-Title text-green-600">
              { users.filter(user => user.user_account_state === true).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 text-sm">Pedidos Totales</h3>
            <p className="text-2xl font-Title text-blue-600">
              {users.reduce((sum, user) => sum + user.orders, 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 text-sm">Ingresos Totales</h3>
            <p className="text-2xl font-Title text-amber-600">
              {/* ${users.reduce((sum, user) => sum + parseFloat(user.totalSpent.replace('$', '')), 0).toFixed(2)} */}
            </p>
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
                  <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-rose-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
                            {user.user_name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-Title text-gray-900">{user.user_name}</div>
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
                          {user.user_email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <FaPhone className="mr-2 text-rose-500" />
                          {user.user_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.orders} {user.orders === 1 ? 'pedido' : 'pedidos'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* Total: {user.totalSpent} */}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${getStatusColor(user.user_account_state)}`}>
                          
                          {user.user_account_state === true ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => confirmDelete(user)}
                            className="text-rose-600 hover:text-rose-800"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
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

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-yellow-500 text-2xl mr-3" />
                  <h3 className="text-xl font-Title text-gray-800">Confirmar eliminación</h3>
                </div>
                <button 
                  onClick={cancelDelete}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="mb-6 text-gray-700">
                ¿Estás seguro que deseas eliminar permanentemente al usuario <span className="font-semibold">{userToDelete?.name}</span>? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Confirmar Eliminación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}