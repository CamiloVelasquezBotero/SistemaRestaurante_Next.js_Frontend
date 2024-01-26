import { useContext, useState } from 'react'
import appContext from '@/context/app/appContext'

const Productos = () => {
    const AppContext = useContext(appContext);
    const { isNavOpen, cambiarTipoModal, categorias, productos, 
        productosFiltrados, filtrarProductos 
    } = AppContext;

  return (
    <div>
        <h2 className='text-orange-700 text-4xl font-black'>Productos</h2>

        <div className={`flex mx-20 mt-6 items-center`}>
            <div className={`w-96 text-center ${isNavOpen ? 'mr-10 ml-2' : 'ml-12 mr--10'} duration-300`}>
                <h2 className='text-orange-700 text-3xl font-black mb-5'>Categorias</h2>

                {categorias?.length ? (
                    <>
                        <div className='max-h-80 overflow-y-auto shadow-2xl rounded-2xl bg-white'>
                            <ul className='text-xl font-semibold'>
                                {categorias?.map( (categoria, index) =>
                                    <li key={index}
                                        className='p-2 shadow-md'
                                    >{categoria?.nombre}</li>
                                )}
                            </ul>
                        </div>

                        <div className='flex mx-7 justify-between'>
                            <button 
                                className='mt-5 p-2 bg-sky-700 w-auto rounded-lg text-white font-semibold text-xl hover:bg-sky-800 duration-300'
                                onClick={() => cambiarTipoModal('categorias')}
                            >Editar</button>
                            <button 
                                className='mt-5 p-2 bg-orange-700 w-auto rounded-lg text-white font-semibold text-xl hover:bg-orange-800 duration-300'
                                onClick={() => cambiarTipoModal('agregarCategoria')}
                            >Agregar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className='mt-10 text-3xl font-black mb-5'>No tienes Categorias, agrega una</h2>
                        <button 
                            className=' mt-2 p-2 bg-orange-700 w-auto rounded-lg text-white font-semibold text-xl hover:bg-sky-800 duration-300'
                            onClick={() => cambiarTipoModal('agregarCategoria')}
                        >Agregar</button>
                    </>
                )}
            </div>

            <div className={`text-center rounded-2xl ml-20 w-full flex justify-center items-center flex-col ${isNavOpen ? 'translate-x-0' : 'translate-x-40'} duration-300`}>
                <h2 className='text-orange-700 text-3xl font-black mb-5'>Tipos de Productos</h2>

                { productos?.length ? (

                    <>
                        <div className='mb-5 text-lg'>
                            <label htmlFor="filtro" className='font-bold'>Filtrar por categorias:</label>
                            <select 
                                name="filtro" id="filtro" 
                                className='ml-2 font-semibold shadow-xl rounded-lg p-1 bg-white text-center'
                                onChange={e => filtrarProductos(e.target.value)}
                            >
                                <option value="">Sin filtro</option>
                                {categorias?.map( categoria => 
                                    <option key={categoria?._id} value={categoria?.nombre} className='font-semibold'>{categoria?.nombre}</option>    
                                )}
                            </select>
                        </div>
                        <div className='max-h-80 overflow-y-auto w-full shadow-2xl bg-white rounded-2xl'>
                            <table className='p-20 w-full' >
                                <thead className='font-black text-2xl'>
                                    <tr>
                                        <th className='p-2 shadow-md'>Nombre</th>
                                        <th className='p-2 shadow-md'>Categoria</th>
                                        <th className='p-2 shadow-md'>Precio</th>
                                    </tr>
                                </thead>
                                <tbody className='text-xl font-semibold'>
                                    {productosFiltrados?.length ? (/*  Si hay productos Filtrados... */
                                        <> 
                                            {productosFiltrados?.map( (producto) =>
                                                <tr key={producto._id}
                                                    className=''>
                                                    <td className='p-2 shadow-md'>{producto.nombre}</td>
                                                    <td className='p-2 shadow-md'>{producto.categoria}</td>
                                                    <td className='p-2 shadow-md'>$ {producto.precio}</td>
                                                </tr>
                                            )}
                                        </>
                                    ) : ( /* Si no hay productos Filtrados... */
                                        <>
                                            {productos?.map( (producto) =>
                                                <tr key={producto._id}
                                                    className=''>
                                                    <td className='p-2 shadow-md'>{producto.nombre}</td>
                                                    <td className='p-2 shadow-md'>{producto.categoria}</td>
                                                    <td className='p-2 shadow-md'>$ {producto.precio}</td>
                                                </tr>
                                            )}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                    </>
                ) : (
                    <>
                        {categorias?.length ? (
                            <h2 className='text-3xl font-black mb-5'>Aun no tienes productos, agrega uno</h2>
                        ) : (
                            <h2 className='text-3xl font-black mb-5'>No tienes Categorias para los productos, agrega una</h2>
                        )}
                    </>
                )}
                
                <div className='flex justify-center gap-10'>
                    {productos?.length > 0 &&
                        <button 
                            className='mt-5 p-2 bg-sky-700 w-auto rounded-lg text-white font-semibold text-xl hover:bg-sky-800 duration-300'
                            onClick={() => cambiarTipoModal('edicionProductos')}
                        >Editar</button>
                    }

                    {categorias?.length ? (
                        <button 
                            className='mt-5 p-2 bg-orange-700 w-auto rounded-lg text-white font-semibold text-xl hover:bg-sky-800 duration-300'
                            onClick={() => cambiarTipoModal('agregarProductos')}
                        >Agregar</button>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Productos