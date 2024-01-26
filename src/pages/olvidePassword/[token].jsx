import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import Swal from 'sweetalert2';
import authContext from '@/context/auth/authContext';
import Alerta from '@/components/Alerta';
import Layout from "@/components/Layout"
import clienteAxios from '@/config/clienteAxios';

const CambiarContraseña = ({confirmarToken, token}) => {
  const AuthContext = useContext(authContext)
  const { mensaje, cambiarContraseña } = AuthContext;
  const router = useRouter();

  useEffect(() => {
    if(!confirmarToken){-
        Swal.fire({
            title: '¡Token no valido!',
            text: '¡Esta URL no es valida para cambiar el password!',
            icon: 'error'
        });
        setTimeout(() => {
            router.push('/login')
        }, 6000)
    }
  }, [])

  // Validacion formulario
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
                  .required('El password es obligatorio')
    }),
    onSubmit: async nuevoPassword => {
        const respuesta = await cambiarContraseña(nuevoPassword, token)
        if(respuesta) {
            setTimeout(() => {
                router.push('/login')
            }, 6000)
        }
    }
  })

  return (
    <Layout>

        <div className='bg-white'>
            {confirmarToken ? (
                <div className="md:grid grid-cols-2">
                    <div>
                        <p className="md:w-2/4 mx-auto h-full capitalize font-black text-6xl md:mt-20 text-center">Recupera el ingreso a tu {''}
                        <span className="text-orange-700">Cuenta</span></p>
                    </div>
                    <div className="mx-10 flex flex-col mt-14">
                        <h2 className='text-orange-700 font-black capitalize text-4xl text-center'>Cambia tu password</h2>
                        { mensaje && <Alerta /> }
                       <form
                            ssName='w-100px p-5 bg-gray-100 rounded-xl gap-5 shadow mt-5'
                            onSubmit={formik.handleSubmit}
                        >
                            <div className='mt-8'>
                                <label className='font-bold text-xl block mb-2' htmlFor="password">Nuevo Password</label>
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='Ingresa tu nuevo password'
                                    className='text-xl w-full rounded-md p-1'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.password}</p> {/* Accedemos al error para mostrarlo */}
                                </div>
                                ) : null }
                            </div>
            
                            <input
                                type="submit"
                                className='p-2 mt-5 font-bold bg-orange-700 rounded-lg text-white text-xl cursor-pointer hover:bg-orange-800 duration-200'
                                value='Cambiar Password'
                            />
                        </form>
                        <nav className='mt-1 text-center mt-4'>
                            <p>
                            <Link href='/crearCuenta'
                                className='text-blue-700 hover:text-blue-900'
                            >Crear Cuenta</Link> ¿Aun no tienes una cuenta?</p>
                            <p className='mt-1'>
                            <Link
                                href='/login'
                                className='text-blue-700 hover:text-blue-900'
                            >Iniciar Sesión</Link> ¿Ya tienes una cuenta?</p>
                        </nav>
                    </div>
                </div>
            ) : (
                <p className='mx-60 mt-10 p-4 text-center bg-red-500 rounded-xl font-semibold text-2xl'>¡Url no valida o expirada...!</p>
            )}
        </div>
    </Layout>
  )
}

export async function getServerSideProps({query: {token}}) {
    try {   
        const respuesta = await clienteAxios.get(`/usuarios/olvidePassword/${token}`);
        return {
            props: {
                confirmarToken: true,
                token
            }
        }
    } catch (error) {
        return {
            props: {
                confirmarToken: false
            }
        }
    }
}

export default CambiarContraseña