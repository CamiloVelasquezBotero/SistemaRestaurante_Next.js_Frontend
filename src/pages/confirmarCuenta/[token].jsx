import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import authContext from '@/context/auth/authContext';
import Layout from '@/components/Layout';
import Alerta from '@/components/Alerta';
import clienteAxios from '@/config/clienteAxios';

const ConfirmarCuenta = ({mensaje, error}) => {
  const router = useRouter();
  const AuthContext = useContext(authContext);
  const { confirmarToken } = AuthContext;

  useEffect(() => {
    confirmarToken(mensaje, error)
  
    setTimeout(() => {
      router.push('/login');
    }, 6000)
  }, [])

  return (
    <Layout>
      <div className='bg-white'>
        <div className='md:mx-80 mb-20 md:mb-0 mt-10 md:mt-0 flex justify-center flex-col'>
          {mensaje && <Alerta />}
        </div>
        <p className="text-center md:w-2/4 mx-auto h-full capitalize font-black text-6xl md:mt-10">Confirma tu cuenta para tu
        <span className="text-orange-700">Restaurante</span></p>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({query: {token}}) {
  
  try {
    const respuesta = await clienteAxios.get(`/usuarios/confirmar/${token}`)
    return {
      props: {
        mensaje: respuesta.data.msg
      }
    }
  } catch (error) {
    return {
      props: {
        mensaje: error.response.data.msg,
        error: true
      }
    }
  }
}

export default ConfirmarCuenta