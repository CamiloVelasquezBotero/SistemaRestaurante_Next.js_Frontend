import { useContext } from 'react'
import appContext from '@/context/app/appContext'
import Pedido from './Pedido';

const RegistroDePedidos = () => {
  const AppContext = useContext(appContext);
  const { isNavOpen, pedidos } = AppContext

  return (
    <>
        <h2 className='text-orange-700 text-4xl font-black'>Registro De Pedidos</h2>

        <div className={`max-h-96 overflow-y-auto bg-gray-300 rounded-2xl mt-10 mx-10 shadow-xl p-2 flex justify-center
            ${isNavOpen ? 'translate-x-0' : 'translate-x-20'} duration-300
          `}>
            {pedidos?.length ? (
              <table className="text-center bg-white rounded-xl m-5 max-h-80 overflow-y-auto">
                <thead>
                  <tr>
                    <th className="p-2 font-bold text-xl shadow-xl">Tipo</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Cliente</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Creador</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Fecha</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Total Pagado</th>
                    <th className="p-2 font-bold text-xl shadow-xl">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos?.map( pedido => 
                    <Pedido 
                      key={pedido._id}
                      pedido={pedido}
                    />
                  )}
                </tbody>
              </table>
            ) : (
              <h2 className='mt-10 text-3xl font-black mb-5'>Aun no tienes pedidos registrados</h2>
            )}
          </div>
    </>
  )
}

export default RegistroDePedidos