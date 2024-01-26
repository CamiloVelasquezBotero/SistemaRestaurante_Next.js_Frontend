import {useContext, useEffect, useState} from 'react'
import appContext from "@/context/app/appContext"
import Cliente from './Cliente';

const Productos = () => {
  const AppContext = useContext(appContext);
  const { isNavOpen, clientes, cambiarTipoModal, clientesAMostrar,
    actualizarClientes } = AppContext;

  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    if(busqueda.length === 0) {
      actualizarClientes(clientes)
    }
  }, [busqueda])

  const buscarClientes = () => {
    const resultados = clientes.filter( cliente => cliente.telefono.toString().includes(busqueda.toString()));
    actualizarClientes(resultados);
  }

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-orange-700 text-4xl font-black'>Clientes</h2>

        <div className={`flex gap-5 p-2 rounded-md items-center bg-orange-700 w-96`}>
          <label
            htmlFor="buscador"
            className='font-bold text-xl text-white'
          >Buscar Cliente</label>
          <input
            id='buscador'
            type="number"
            placeholder='Ingrese Telefono'
            className='rounded-md p-2 font-semibold'
            value={busqueda}
            onChange={e => (setBusqueda(e.target.value))}
            onKeyUp={buscarClientes}
          />
        </div>
        <button
          className={`rounded-md bg-sky-700 hover:bg-sky-800 text-white  p-2 block mb-2 hover:scale-105 duration-300 font-semibold text-xl
          ${isNavOpen ? 'mr-32' : ''} duration-300
          `}
          onClick={() => cambiarTipoModal('agregarNuevoCliente')}
        >Agregar Nuevo Cliente</button>
      </div>

        <div className="">

          <div className={`max-h-96 overflow-y-auto bg-gray-300 rounded-2xl mt-10 mx-10 shadow-xl p-2 flex justify-center
            ${isNavOpen ? 'translate-x-0' : 'translate-x-20'} duration-300
          `}>
            {clientesAMostrar?.length ? (
              <table className="text-center bg-white rounded-xl m-5 max-h-80 overflow-y-auto">
                <thead>
                  <tr>
                    <th className="p-2 font-bold text-xl shadow-xl">Nombre</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Telefono</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Direccion</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Creado</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Pedidos</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Editar</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesAMostrar?.map( cliente => 
                    <Cliente 
                      key={cliente._id}
                      cliente={cliente}
                    />
                  )}
                </tbody>
              </table>
            ) : (
              <h2 className='mt-10 text-3xl font-black mb-5'>No tienes Clientes aun</h2>
            )}
          </div>
        </div>
    </>
  )
}

export default Productos