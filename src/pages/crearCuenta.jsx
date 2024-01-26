import { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import Layout from "@/components/Layout"
import authContext from '@/context/auth/authContext.js';
import Alerta from '@/components/Alerta';

const CrearCuenta = () => {
  const AuthContext = useContext(authContext);
  const { mensaje, registrarUsuario, limpiarAlerta } = AuthContext;

  useEffect(() => {
    limpiarAlerta();
  }, [])

  // Validacion formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                .required('El nombre es obligatorio'),
      email: Yup.string()
                .email('El email no es valido')
                .required('El email es obligatorio'),
      password: Yup.string()
                  .required('El password es obligatorio')
                  .min(4, 'El password debe tener como minimo 4 caracteres')
    }),
    onSubmit: valores => {
      registrarUsuario(valores);
    }
  });

  return (
    <Layout>
      <div className="md:grid grid-cols-2 bg-white">
        <div>
          <p className="text-center md:w-2/4 mx-auto h-full capitalize font-black text-6xl md:mt-24">Crea tu cuenta e ingresa al {''}
          <span className="text-orange-700">Sistema</span></p>
        </div>

        <div className="mx-10 flex flex-col mt-5">
          <h2 className='text-orange-700 font-black capitalize text-4xl text-center'>Registrarse</h2>

          { mensaje && <Alerta /> }

            <form
              className='w-100px p-5 bg-gray-100 rounded-xl gap-5 shadow mt-5'
              onSubmit={formik.handleSubmit}
            >
                <div>
                    <label className='font-bold text-xl block mb-2' htmlFor="nombre">Nombre y apellido</label>
                    <input
                        type="text"
                        id='nombre'
                        placeholder='ingresa tu Nombre y Apellido'
                        className='text-xl w-full rounded-md p-1'
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                    />

                    {formik.touched.nombre && formik.errors.nombre ? (
                      <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.nombre}</p> {/* Accedemos al error para mostrarlo */}
                      </div>
                    ) : null }
                </div>

              <div className='mt-5'>
                <label className='font-bold text-xl block mb-2' htmlFor="email">Email</label>
                <input
                    type="email"
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

              <div className='mt-5'>
                <label className='font-bold text-xl block mb-2' htmlFor="password">Password</label>
                <input
                    type="password"
                    id='password'
                    placeholder='Ingresa tu password'
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
                value='Crear Cuenta'
              />
            </form>

              <nav className='mt-1 text-center'>
                <p>
                  <Link href='/login'
                    className='text-blue-700'
                  >Iniciar Sesión</Link> ¿Ya tienes una cuenta?</p>
              </nav>
        </div>
        
      </div>
    </Layout>
  )
}

export default CrearCuenta