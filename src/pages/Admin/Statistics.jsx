import React from 'react';
import { FiDollarSign, FiShoppingCart, FiUsers, FiPieChart, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const navigate = useNavigate();
  
  const estadisticas = {
    ventasTotales: 12500,
    pedidosMes: 84,
    clientesNuevos: 23,
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
        <button
            onClick={() => navigate("/AdminDashboard")}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
            <FiArrowLeft className="mr-2" />
            Volver
        </button>
        
        </div>
        <h1 className="text-3xl font-bold text-rose-900">Estadísticas de la Floristería</h1>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-rose-200 to- rounded-lg shadow-lg p-6 text-rose-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Ventas Totales</p>
              <p className="text-2xl font-bold">${estadisticas.ventasTotales.toLocaleString()}</p>
            </div>
            <FiDollarSign className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg p-6 text-amber-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Pedidos este Mes</p>
              <p className="text-2xl font-bold">{estadisticas.pedidosMes}</p>
            </div>
            <FiShoppingCart className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-200 to-rose-300 rounded-lg shadow-lg p-6 text-rose-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Clientes Nuevos</p>
              <p className="text-2xl font-bold">{estadisticas.clientesNuevos}</p>
            </div>
            <FiUsers className="text-4xl opacity-70" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-lg p-6 text-amber-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Flores Vendidas</p>
              <p className="text-2xl font-bold">{estadisticas.floresVendidas}</p>
            </div>
            <FiPieChart className="text-4xl opacity-70" />
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
          <h2 className="text-xl font-semibold text-rose-900 mb-4">Tendencia Mensual de Ventas</h2>
          <div className="flex items-end space-x-2 h-64">
            {estadisticas.tendenciaMensual.map((mes, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-rose-400 to-rose-300 rounded-t-lg"
                  style={{ height: `${(mes.ventas / 7000) * 100}%` }}
                ></div>
                <span className="text-xs mt-2 text-rose-900">{mes.mes}</span>
                <span className="text-xs text-amber-800">${mes.ventas}</span>
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