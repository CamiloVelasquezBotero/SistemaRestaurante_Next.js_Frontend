import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import authContext from '@/context/auth/authContext';
import Alerta from '@/components/Alerta';
import Layout from "@/components/Layout"

const login = () => {
  const AuthContext = useContext(authContext)
  const { autenticado, mensaje, limpiarAlerta, iniciarSesion} = AuthContext;
  const router = useRouter();

  useEffect(() => {
    limpiarAlerta();
    if(autenticado) {
      router.push('/')
    }

    limpiarAlerta()
  }, [autenticado])

  // Validacion formulario
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
                .email('El Email no es valido!')
                .required('El Email es obligatorio'),
      password: Yup.string()
                  .required('El password es obligatorio')
    }),
    onSubmit: valores => {
      iniciarSesion(valores)
    }
  })

  return (
    <Layout>
      <div className="md:grid grid-cols-2 bg-white">
        <div>
          <p className="md:w-2/4 mx-auto h-full capitalize font-black text-6xl md:mt-20 text-center">Sistema de registro de pedidos para {''}
          <span className="text-orange-700">Restaurante</span></p>
        </div>

        <div className="mx-10 flex flex-col mt-5">
          <h2 className='text-orange-700 font-black capitalize text-4xl text-center'>Inicia Sesión</h2>

          { mensaje && <Alerta /> }

            <form
              className='w-100px p-5 bg-gray-100 rounded-xl gap-5 shadow mt-5'
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label className='font-bold text-xl block mb-2' htmlFor="email">Email</label>
                <input
                    type="text"
                    id='email'
                    placeholder='ingresa tu email'
                    className='text-xl w-full rounded-md p-2'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.email}</p> {/* Accedemos al error para mostrarlo */}
                  </div>
                ) : null }
              </div>

              <div className='mt-8'>
                <label className='font-bold text-xl block mb-2' htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    placeholder='Ingresa tu password'
                    className='text-xl w-full rounded-md p-2'
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
                value='Iniciar Sesión'
              />
            </form>
              <nav className='mt-1 text-center'>
                <p>
                  <Link href='/crearCuenta'
                    className='text-blue-700 hover:text-blue-900'
                  >Crear Cuenta</Link> ¿Aun no tienes una cuenta?</p>
                <p className='mt-1'>
                  <Link 
                    href='/olvidePassword'
                    className='text-blue-700 hover:text-blue-900'
                  >Olvide Password</Link> ¿Olvidaste tu contraseña?</p>
              </nav>
        </div>
        
      </div>
    </Layout>
  )
}

export default login