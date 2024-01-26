import { useEffect, useContext, useState } from 'react';
import {useRouter} from 'next/router';
import Layout from "@/components/Layout"
import authContext from "@/context/auth/authContext.js"
import appContext from '@/context/app/appContext.js';
import IngresoDePedidos from '@/components/IngresoPedidos';
import RegistroDePedidos from '@/components/RegistroDePedidos';
import Productos from '@/components/Productos';
import Clientes from '@/components/Clientes';

export default function Home() {
    const router = useRouter();

    // Context
    const AuthContext = useContext(authContext);
    const { autenticado, limpiarAlerta } = AuthContext;
    const AppContext = useContext(appContext);
    const { 
        cambiarSeccion, seccion, isNavOpen, cargarProductos,
         cargarCategorias
    } = AppContext;

    useEffect(() => {
        limpiarAlerta()
        if(!autenticado) {
            router.push('/login');
            return 
        }

        cargarProductos();
        cargarCategorias()
    }, [autenticado]);

 return (
  <Layout>
    <div className='flex'>
        <nav className={`pr-5 h-screen bg-gray-800 rounded-r-xl pt-5 duration-300 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition`} style={{minWidth: '170px'}}>
            <ul>
                <li>
                    <button className='block p-2 font-bold bg-sky-700 hover:bg-sky-800 hover:scale-105 duration-300 text-white rounded-r-lg'
                        onClick={() => cambiarSeccion('ingresoPedidos')}
                    >Ingreso Pedidos</button>
                    <button className='block p-2 mt-5 font-bold bg-sky-700 hover:bg-sky-800 hover:scale-105 duration-300 text-white rounded-r-lg'
                        onClick={() => cambiarSeccion('registroPedidos')}
                    >Registro Pedidos</button>
                    <button className='block p-2 mt-5 font-bold bg-sky-700 hover:bg-sky-800 hover:scale-105 duration-300 text-white rounded-r-lg'
                        onClick={() => cambiarSeccion('clientes')}
                    >Clientes</button>
                    <button className='block p-2 mt-5 font-bold bg-sky-700 hover:bg-sky-800 hover:scale-105 duration-300 text-white rounded-r-lg'
                        onClick={() => cambiarSeccion('productos')}
                    >Productos</button>
                </li>
            </ul>
        </nav>

        <section className={`w-full transition duration-300 ${isNavOpen ? 'translate-x-0' : '-translate-x-40'}`}>
            {seccion === 'ingresoPedidos' && (
                <div className='m-5'>
                    <IngresoDePedidos />
                </div>
            )}

            {seccion === 'registroPedidos' && (
                <div className='m-5'>
                    <RegistroDePedidos />
                </div>
            )}

            {seccion === 'clientes' && (
                <div className='m-5'>
                    <Clientes />
                </div>
            )}

            {seccion === 'productos' && (
                <div className='m-5'>
                    <Productos/>
                </div>
            )}
        </section>
        
    </div> 
  </Layout>
 )
}
