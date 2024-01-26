import { useState, useContext } from 'react'
import appContext from '@/context/app/appContext'
import Swal from 'sweetalert2'

const Cliente = ({cliente}) => {

    const [edicion, setEdicion] = useState(false)
    const [valueTelefono, setValueTelefono] = useState(cliente?.telefono)
    const [valueDireccion, setValueDireccion] = useState(cliente?.direccion)
    const [valueNombre, setValueNombre] = useState(cliente?.nombre)

    const AppContext = useContext(appContext);
    const { eliminarCliente, editarCliente, cambiarTipoModal, setPedidosVer } = AppContext;

const handleConfirmarEliminar = () => {
    Swal.fire({
      title: '¿Estas Seguro/a?',
      text: `¿Estas seguro de eliminar el cliente: ${cliente.nombre}?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#419e79',
      confirmButtonText: `Eliminar: ${cliente.nombre}`,
      denyButtonColor: '#EF4444',
      denyButtonText: 'Cancelar',
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        eliminarCliente(cliente.telefono)
      }
    })
}

const handleConfirmarEdicion = () => {
    Swal.fire({
      title: '¿Estas Seguro/a?',
      text: `¿Estas seguro de Editar este Cliente?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#419e79',
      confirmButtonText: `Confirmar`,
      denyButtonColor: '#EF4444',
      denyButtonText: 'Cancelar',
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        if(edicionExitosa()){
            setEdicion(!edicion)
        }
      }
    })
}

async function edicionExitosa() {
    const datos = {
        telefonoCliente: cliente.telefono,
        nuevoNombre: valueNombre,
        nuevoTelefono: valueTelefono,
        nuevaDireccion: valueDireccion
    }

    const respuesta = await editarCliente(datos);

    return respuesta
}

    const fecha = new Date(cliente.createdAt);
    const configuracion = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const fechaFormateada = fecha.toLocaleString('es-ES', configuracion)

    return (
        <>
            <tr>
                {/* Nombre */}
                <td className='flex justify-center p-2 shadow-md min-h-7'>
                    { edicion ? ( // Modo edicion..
                        <input 
                        type="text" 
                        placeholder='Nuevo Nombre' 
                        className='p-1 text-center text-gray-600' 
                        value={valueNombre}
                        onChange={e => setValueNombre(e.target.value)}
                    />
                    ) : (
                        <>
                            {`${cliente?.nombre}`}
                        </>
                    )}
                </td>
                {/* Telefono */}
                <td className='p-2 shadow-md'>
                    { edicion ? ( // Modo edicion..
                        <input 
                            type="number" 
                            placeholder='Nuevo telefono' 
                            className='p-1 text-center text-gray-600' 
                            value={valueTelefono}
                            onChange={e => setValueTelefono(e.target.value)}
                        />
                    ) : (
                        <>
                            {cliente?.telefono}
                        </>
                    )}
                </td>
                {/* Direccion */}
                <td className='p-2 shadow-md'>
                    { edicion ? ( // Modo edicion..
                        <input 
                        type="text" 
                        placeholder='Nueva direccion' 
                        className='p-1 text-center text-gray-600' 
                        value={valueDireccion}
                        onChange={e => setValueDireccion(e.target.value)}
                    />
                    ) : (
                        <>
                            {cliente?.direccion}
                        </>
                    )}
                </td>
                {/* Fecha de Creacion */}
                <td className='p-2 shadow-md'>
                    {fechaFormateada}
                </td>
                {/* Pedidos */}
                <td className='p-2 shadow-md flex gap-3 justify-center items-center'>
                    <div>{cliente?.pedidos?.length}</div>
                </td>
                {/* Editar */}
                <td className='p-2 shadow-md'>
                    { edicion ? ( /* Entra modo edicion... */
                        <>
                            <div className='flex justify-center items-center'>
                                {/* Cancelar */}
                                <button className='p-2 bg-red-400 hover:bg-red-500 rounded-md'
                                    onClick={() => {
                                        setEdicion(!edicion)
                                        setValueTelefono(cliente?.telefono);
                                        setValueDireccion(cliente?.direccion);
                                        setValueNombre(cliente?.nombre);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                {/* Guardar */}
                                <button className='ml-2 p-2 bg-green-400 hover:bg-green-500 rounded-md'
                                    onClick={handleConfirmarEdicion}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            type='button'
                            className='p-2 hover:bg-sky-300 rounded-md duration-300 mx-5'
                            onClick={() => setEdicion(!edicion)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-600 font-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    )}
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

export default Cliente