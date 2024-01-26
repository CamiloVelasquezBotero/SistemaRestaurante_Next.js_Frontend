import { useContext } from 'react';
import Head from 'next/head'
import Swal from 'sweetalert2';
import Link from 'next/link';
import authContext from '@/context/auth/authContext.js'
import appContext from '@/context/app/appContext.js';
import Modal from './Modal';
import EdicionProductos from './EdicionProductos';
import EdicionCategorias from './EdicionCategorias';
import AgregarCategoria from './AgregarCategoria';
import AgregarProducto from './AgregarProducto';
import VerPedidoAPagar from './VerPedidoAPagar';
import AgregarNuevoCliente from './AgregarNuevoCliente';

const Layout = ({children}) => {
  const AuthContext = useContext(authContext);
  const { autenticado, usuario, cerrarSesion } = AuthContext;

  const AppContext = useContext(appContext);
  const { isNavOpen, toggleNav, tipoDeModal } = AppContext;

  const handleCerrarSesion = () => {
    Swal.fire({
      title: '¿Estas Seguro/a?',
      text: '¿Estas seguro de querer cerrar la Sesión?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#419e79',
      confirmButtonText: 'Cerrar Sesion',
      denyButtonColor: '#EF4444',
      denyButtonText: 'Cancelar',
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        cerrarSesion();
      }
    })
  }
    
  return (
    <>
        <Head>
            <title>Sistema Restaurante</title>
        </Head> 

        <div className='bg-gray-300'>
            {autenticado ? (
              <div className='flex justify-between pr-10'>
                <div>
                  <button
                    className={`p-3 mt-5 bg-orange-700 ${isNavOpen ? 'rounded-tr-xl' : 'rounded-r-xl'} text-white text-xl font-bold hover:bg-orange-800 hover:scale-105 hover:shadow-xl duration-300`}
                    onClick={() => toggleNav()}
                  >{isNavOpen ? 'Cerrar' : 'Opciones'}</button>
                </div>
                
                <div className='flex flex-row items-center md:my-3'>
                  <Link
                  href={'/'}
                  className='cursor-pointer mr-20'
                  >
                    <h1 className='text-3xl font-black text-orange-700 hover:scale-105 duration-300'>LOGO RESTAURANTE</h1>
                  </Link>
                  
                  <div className='flex gap-10 items-center text-2xl ml-20'>
                    <p className='mr-20 font-black text-3xl'><span className='text-orange-700'>Usuario: </span> {usuario.nombre}</p>
                    <div className='flex gap-6 text-xl'>
                      <button
                        className='bg-orange-700 text-white p-2 rounded-lg hover:scale-105 font-bold hover:bg-orange-800 hover:shadow-xl duration-300'
                        onClick={handleCerrarSesion}
                      >Cerrar Sesion</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={'/'}
                className='cursor-pointer'
              >
                <p className='text-orange-700 text-3xl font-black text-center py-5 hover:scale-105 duration-300'>LOGO RESTAURANTE</p>
              </Link>
            )}
        </div>

        <main className='bg-gray-100'>
            {children}
        </main>

        <Modal>
            {tipoDeModal === 'categorias' && <EdicionCategorias />}
            {tipoDeModal === 'agregarCategoria' && <AgregarCategoria />}
            {tipoDeModal === 'edicionProductos' && <EdicionProductos />}
            {tipoDeModal === 'agregarProductos' && <AgregarProducto />}
            {tipoDeModal === 'verProductoPagar' && <VerPedidoAPagar />}
            {tipoDeModal === 'agregarNuevoCliente' && <AgregarNuevoCliente />}
        </Modal>
    </>
  )
}

export default Layout