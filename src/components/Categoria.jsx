import { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import appContext from '@/context/app/appContext';

const Categoria = ({categoria}) => {
    const [edicion, setEdicion] = useState(false)
    const [valueCategoria, setValueCategoria] = useState(categoria?.nombre)

    const AppContext = useContext(appContext);
    const { eliminarCategoria, editarCategoria } = AppContext;

const handleConfirmarEliminar = () => {
    Swal.fire({
      title: '¿Estas Seguro/a?',
      text: `¿Estas seguro de eliminar Categoria: ${categoria.nombre}?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#419e79',
      confirmButtonText: `Eliminar: ${categoria.nombre}`,
      denyButtonColor: '#EF4444',
      denyButtonText: 'Cancelar',
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        eliminarCategoria(categoria._id, categoria.nombre);
      }
    })
}
const handleConfirmarEdicion = () => {
    Swal.fire({
      title: '¿Estas Seguro/a?',
      text: `¿Estas seguro de Editar Categoria: ${categoria.nombre} a '${valueCategoria}'?`,
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
    const respuesta = await editarCategoria(categoria._id, valueCategoria);
    return respuesta
}

  return (
    <>
        <tr>
            
            <td className='p-2 shadow-md'>
                { edicion ? ( // Modo edicion..
                    <input 
                        type="text" 
                        placeholder='Nuevo nombre' 
                        className='p-1 text-center text-gray-600' 
                        value={valueCategoria}
                        onChange={e => setValueCategoria(e.target.value)}
                    />
                ) : (
                    <>
                        {categoria?.nombre}
                    </>
                )}
            </td>
            <td className='p-2 shadow-md'>
                { edicion ? ( /* Entra modo edicion... */
                    <>
                        {/* Cancelar */}
                        <button className='p-2 bg-red-400 hover:bg-red-500 rounded-md'
                            onClick={() => {
                                setEdicion(!edicion)
                                setValueCategoria(categoria.nombre);
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

export default Categoria