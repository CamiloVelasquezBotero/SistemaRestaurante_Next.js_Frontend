import { useContext } from 'react'
import appContext from '@/context/app/appContext';
import Producto from './Producto';

const EdicionProductos = () => {
    const AppContext = useContext(appContext);
    const { productos, toggleModal, productosFiltrados } = AppContext;

  return (
    <>
        <div className='text-center'>
            <h2 className='text-orange-700 text-3xl font-black mb-5'>Productos</h2>
            <div className='max-h-96 overflow-y-auto shadow-2xl rounded-2xl bg-white'>
                <table className='mr-5 md:w-full'>
                    <thead className='font-black text-2xl'>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className='text-xl font-semibold'>
                        { productosFiltrados?.length ? ( /* Si hay productos Filtrados... */
                            <>
                                {productosFiltrados?.map( producto =>
                                    <Producto 
                                        key={producto?._id}
                                        producto={producto}
                                    />
                                )}
                            </>
                        ) : ( /* Si no Hya productos Filtrados.. */
                            <>
                                {productos?.map( producto =>
                                    <Producto 
                                        key={producto?._id}
                                        producto={producto}
                                    />
                                )}
                            </>
                        )}
                    </tbody>
                </table>

            </div>
            <button
                type='button'
                className='mt-5 p-2 bg-red-600 text-white font-bold rounded-md hover:scale-105 hover:bg-red-700 duration-300'
                onClick={toggleModal}
            >Cerrar Productos</button>
        </div>
    </>
  )
}

export default EdicionProductos