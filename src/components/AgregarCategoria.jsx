import { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import appContext from '@/context/app/appContext';

const AgregarCategoria = () => {
  const AppContext = useContext(appContext);
  const { agregarCategoria } = AppContext;

  const formik = useFormik({
    initialValues: {
      nombre: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                .required('El Nombre es obligatorio')
    }),
    onSubmit: valores => {
      agregarCategoria(valores)
    }
  })

  return (
    <>
      <h2 className='mr-10 text-orange-700 text-3xl font-black mb-5'>Agrega una Categoria</h2>
      <form 
        onSubmit={formik.handleSubmit}
      >
        <div className='flex flex-col text'>
          <label htmlFor="nombre" className='font-bold text-2xl'>Nombre Categoria</label>
          <input
            type="text"
            id='nombre'
            placeholder='Ingresa nombre Categoria'
            className='mt-2 p-2 border rounded-md shadow-xl'
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
        
        <input 
          type="submit" 
          value={'Agregar Categoria'} 
          className='cursor-pointer w-auto mt-5 p-2 text-xl bg-orange-700 text-white font-bold rounded-md hover:scale-105 hover:bg-orange-800 duration-300'
        />
      </form>
    </>
  )
}

export default AgregarCategoria