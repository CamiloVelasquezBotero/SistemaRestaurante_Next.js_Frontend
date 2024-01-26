import { useContext } from 'react'
import appContext from '@/context/app/appContext';
import Categoria from './Categoria';

const EdicionCategorias = () => {
    const AppContext = useContext(appContext);
    const { categorias, toggleModal } = AppContext;

  return (
    <>
        <div className='text-center'>
            <h2 className='text-orange-700 text-3xl font-black mb-5'>Categorias</h2>
            <div className='max-h-96 overflow-y-auto shadow-2xl rounded-2xl bg-white'>
                <table className='mr-5'>
                    <thead className='font-black text-2xl'>
                        <tr>
                            <th>Nombre</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className='text-xl font-semibold'>
                        {categorias?.map( categoria =>
                            <Categoria 
                                key={categoria?._id}
                                categoria={categoria}
                            />
                        )}
                    </tbody>
                </table>

            </div>
            <button
                type='button'
                className='mt-5 p-2 bg-red-600 text-white font-bold rounded-md hover:scale-105 hover:bg-red-700 duration-300'
                onClick={toggleModal}
            >Cerrar Categorias</button>
        </div>
    </>
  )
}

export default EdicionCategorias