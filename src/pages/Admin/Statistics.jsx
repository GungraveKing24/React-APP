import React, { useEffect, useState } from 'react';
import { FiDollarSign, FiShoppingCart, FiUsers, FiPieChart, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Axios/Axios';
import { Link } from "react-router-dom";


const Statistics = () => {
  const navigate = useNavigate();
  const [monthlySales, setMonthlySales] = useState([])
  const [weeklySales, setWeeklySale] = useState([])
  const [cancelledOrders, setCancelledOrders] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchMonth()
    fetchWeek()
    fetchCancelled()
    fetchUsers()
  }, []);

  async function fetchMonth(){
    const response = await axiosInstance.get("/stats/month-sales", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    setMonthlySales(response.data)
  }

  async function fetchWeek(){
      const response = await axiosInstance.get("/stats/week-sales", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    setWeeklySale(response.data)
  }

  async function fetchCancelled(){
      const response = await axiosInstance.get("/stats/cancelled-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    setCancelledOrders(response.data)
  }

  async function fetchUsers(){
      const response = await axiosInstance.get("/Users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    setUsers(response.data)
  }
  
  const estadisticas = {
    floresVendidas: 542,
    categoriasPopulares: [
      { nombre: 'Rosas', porcentaje: 45 },
      { nombre: 'Tulipanes', porcentaje: 25 },
      { nombre: 'Lirios', porcentaje: 15 },
      { nombre: 'Otras', porcentaje: 15 }
    ],
    tendenciaMensual: [
      { mes: 'Ene', ventas: 3500 },
      { mes: 'Feb', ventas: 4200 },
      { mes: 'Mar', ventas: 3800 },
      { mes: 'Abr', ventas: 5100 },
      { mes: 'May', ventas: 4900 },
      { mes: 'Jun', ventas: 6000 }
    ]
  };

  return (
    <div className="min-h-screen bg-white p-6">
        <div className="flex items-center mb-8">
        <Link to="/AdminDashboard" className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-1 font-Title">Volver</span>
            </Link>
        
        </div>
        <h1 className="text-3xl font-bold text-rose-900">Estadísticas de la Floristería</h1>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-rose-200 to- rounded-lg shadow-lg p-6 text-rose-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Ganancia este mes</p>
              <p className="text-2xl font-bold">${monthlySales.monto_total}</p>
            </div>
            <FiDollarSign className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg p-6 text-amber-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Pedidos este Mes</p>
              <p className="text-2xl font-bold">{monthlySales.cantidad_pedidos}</p>
            </div>
            <FiShoppingCart className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-200 to-rose-300 rounded-lg shadow-lg p-6 text-rose-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Clientes Registrados</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <FiUsers className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg p-6 text-amber-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Vistas a la pagina</p>
              <p className="text-2xl font-bold">100,000,000</p>
            </div>
            <FiPieChart className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-200 to- rounded-lg shadow-lg p-6 text-rose-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Ganancia esta semana</p>
              <p className="text-2xl font-bold">${weeklySales.monto_total}</p>
            </div>
            <FiDollarSign className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg p-6 text-amber-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Pedidos esta semana</p>
              <p className="text-2xl font-bold">{weeklySales.cantidad_pedidos}</p>
            </div>
            <FiPieChart className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-200 to-rose-300 rounded-lg shadow-lg p-6 text-rose-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Pedidos cancelados</p>
              <p className="text-2xl font-bold">{cancelledOrders.total}</p>
            </div>
            <FiShoppingCart className="text-4xl opacity-70" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-rose-200">
          <h2 className="text-xl font-semibold text-rose-900 mb-4">Categorías Populares</h2>
          <div className="space-y-4">
            {estadisticas.categoriasPopulares.map((categoria, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-rose-800">{categoria.nombre}</span>
                  <span className="text-sm font-medium text-amber-800">{categoria.porcentaje}%</span>
                </div>
                <div className="w-full bg-rose-100 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-rose-400 to-amber-600 h-2.5 rounded-full" 
                    style={{ width: `${categoria.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-rose-200">
          <h2 className="text-xl font-semibold text-rose-900 mb-4">Arreglos Populares</h2>
          <div className="space-y-4">
            {estadisticas.categoriasPopulares.map((categoria, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-rose-800">{categoria.nombre}</span>
                  <span className="text-sm font-medium text-amber-800">{categoria.porcentaje}%</span>
                </div>
                <div className="w-full bg-rose-100 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-rose-400 to-amber-600 h-2.5 rounded-full" 
                    style={{ width: `${categoria.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-rose-100 to-amber-50 rounded-lg shadow-lg p-6 border border-rose-200">
        <h2 className="text-xl font-semibold text-rose-900 mb-4">Recomendaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-70 p-4 rounded-lg border border-rose-200">
            <h3 className="font-medium text-rose-800">Flor más vendida</h3>
            <p className="text-amber-900">Rosas rojas (32%)</p>
          </div>
          <div className="bg-white bg-opacity-70 p-4 rounded-lg border border-rose-200">
            <h3 className="font-medium text-rose-800">Mejor temporada</h3>
            <p className="text-amber-900">Febrero - Mayo</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Statistics;
