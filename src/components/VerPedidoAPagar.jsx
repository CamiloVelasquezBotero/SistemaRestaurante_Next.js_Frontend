import { useContext, useState, useEffect } from 'react';
import appContext from '@/context/app/appContext';
import Swal from 'sweetalert2';

const VerPedidoAPagar = () => {
  const AppContext = useContext(appContext);
  const { pedidoAPagar, facturarPedidoSalon, } = AppContext;

  const handleConfirmar = () => {
    Swal.fire({
      title: '¿Estas Seguro/a?',
      text: `¿Estas seguro de Facturar esta mesa?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#419e79',
      confirmButtonText: `Facturar: ${pedidoAPagar.mesa}`,
      denyButtonColor: '#EF4444',
      denyButtonText: 'Cancelar',
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        facturarPedidoSalon();
      }
    })
  }

  return (
    <>
      <h2 className='text-center font-black text-2xl mb-2'>{pedidoAPagar.mesa} debe:</h2>

      <div className='bg-gray-100 h-3/6 rounded-lg p-2 overflow-y-auto'>
        <table className=''>
          <thead>
            <tr>
              <th className='shadow-xl px-2'>Producto</th>
              <th className='shadow-xl px-2'>Cantidad</th>
              <th className='shadow-xl px-2'>Subtotal</th>
              <th className='shadow-xl px-2'>Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidoAPagar.productos?.map( (producto, index) => (
              <tr key={index}>
                <td className='pl-1 shadow-md'>{producto.nombre}</td>
                <td className='pl-1 shadow-md'>{producto.cantidad}</td>
                <td className='pl-1 shadow-md'>{producto.subtotal}</td>
                <td className='pl-1 shadow-md'>{producto.subtotal * producto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className='text-center font-black mt-5 text-2xl'>Total: ${pedidoAPagar.total}</p>

      </div>

      <div className='text-center'>
        <button
          className='bg-green-500 p-2 mt-5 rounded-md hover:bg-green-600 duration-300'
          onClick={handleConfirmar}
        >Facturar</button>
      </div>
    </>
  )
}

export default VerPedidoAPagar