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
  const { autenticado, mensaje, limpiarAlerta, olvidePassword} = AuthContext;
  const router = useRouter();

  useEffect(() => {
    limpiarAlerta();
  }, [])

  // Validacion formulario
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
                .email('El Email no es valido!')
                .required('El Email es obligatorio')
    }),
    onSubmit: valores => {
      olvidePassword(valores)
    }
  })

  return (
    <Layout>
      <div className="md:grid grid-cols-2 bg-white">
        <div className='mt-7'>
          <p className="md:w-2/4 mx-auto h-full capitalize font-black text-6xl md:mt-20 text-center">Ingresa tu Email y Recupera tu {''}
          <span className="text-orange-700">Cuenta</span></p>
        </div>

        <div className="mx-10 flex flex-col my-10 md:my-24">
          <h2 className='text-orange-700 font-black capitalize text-4xl text-center'>¡Recupera tu Cuenta!</h2>

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
                    className='text-xl w-full rounded-md p-1'
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
              
              <input 
                type="submit" 
                className='p-2 mt-5 font-bold bg-orange-700 rounded-lg text-white text-xl cursor-pointer hover:bg-orange-800 duration-200'
                value='Enviar'
              />
            </form>
              <nav className='mt-1 text-center'>
                <p>
                  <Link href='/crearCuenta'
                    className='text-blue-700 hover:text-blue-900'
                  >Crear Cuenta</Link> ¿Aun no tienes una cuenta?</p>
                <p className='mt-1'>
                  <Link 
                    href='/login'
                    className='text-blue-700 hover:text-blue-900'
                  >Iniciar Sesión</Link> ¿Ya tienes una Cuenta?</p>
              </nav>
        </div>
        
      </div>
    </Layout>
  )
}

export default login