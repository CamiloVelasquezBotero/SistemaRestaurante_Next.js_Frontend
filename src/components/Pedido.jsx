import { useState, useContext, useEffect } from 'react'
import appContext from '@/context/app/appContext'
import Swal from 'sweetalert2'

const Pedido = ({pedido}) => {
    const AppContext = useContext(appContext);
    const { eliminarCliente, buscarCliente, obtenerNombreUsuario, eliminarPedido } = AppContext;

    const [edicion, setEdicion] = useState(false)
    const [creador, setCreador] = useState('')

    useEffect(() => {
        const obtenerNombre = async () => {
          const nombre = await obtenerNombreUsuario(pedido?.creador);
          setCreador(nombre);
        };
    
        obtenerNombre();
      }, [pedido?.creador]);

    const fecha = new Date(pedido.fechaCreacion);
    const configuracion = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const fechaFormateada = fecha.toLocaleString('es-ES', configuracion)

    const handleConfirmarEliminar = () => {
        Swal.fire({
          title: '¿Estas Seguro/a?',
          text: `¿Estas seguro de eliminar este pedido?`,
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#419e79',
          confirmButtonText: `Eliminar Pedido`,
          denyButtonColor: '#EF4444',
          denyButtonText: 'Cancelar',
        }).then((resultado) => {
          if(resultado.isConfirmed) {
            eliminarPedido(pedido?._id)
          }
        })
    }

    return (
        <>
            <tr>
                {/* Tipo De Pedido */}
                <td className='flex justify-center p-2 shadow-md min-h-7'>
                    {`${pedido?.tipoDePedido}`}
                </td>
                {/* Cliente */}
                <td className='p-2 shadow-md'>
                    {pedido?.cliente && <p>{buscarCliente(pedido?.cliente)}</p>}

                    {pedido?.notasAdicionales && <p>{pedido?.notasAdicionales}</p>}

                    {pedido?.tipoDePedido === 'salon' ? <p>salon</p> : null}
                </td>
                {/* Creador */}
                <td className='p-2 shadow-md'>
                    {creador !== null ? creador : "Cargando..."}
                </td>
                {/* Fecha de Creacion */}
                <td className='p-2 shadow-md'>
                    {fechaFormateada}
                </td>
                {/* Total Pagado */}
                <td className='p-2 shadow-md flex gap-3 justify-center items-center'>
                    <div>$ {pedido?.totalPagado}</div>
                </td>
                {/* Eliminar */}
                <td className='p-2 shadow-md'>
                    <button
                        type='button'
                        className='p-2 hover:bg-red-300 rounded-md duration-300 mx-5'
                        onClick={handleConfirmarEliminar}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default Pedido