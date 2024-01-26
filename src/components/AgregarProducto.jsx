import { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import appContext from '@/context/app/appContext';

const AgregarProducto = () => {
  const AppContext = useContext(appContext);
  const { agregarProducto, categorias } = AppContext;

  const formik = useFormik({
    initialValues: {
      nombre: '',
      categoria: '',
      precio: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                .required('El Nombre es obligatorio'),
      categoria: Yup.string()
                .required('La Categoria es obligatoria'),
      precio: Yup.number()
                .required('El Precio es obligatorio'),
    }),
    onSubmit: async (valores, { resetForm }) => {
      await agregarProducto(valores);

      resetForm();
    }
  })

  return (
    <>
      <h2 className='mr-10 text-orange-700 text-3xl font-black mb-5'>Agrega un Producto</h2>
      <form 
        onSubmit={formik.handleSubmit}
      >
        <div className='flex flex-col text mb-5'>
          <label htmlFor="nombre" className='font-bold text-2xl'>Nombre Producto</label>
          <input
            type="text"
            id='nombre'
            placeholder='Ingresa nombre Producto'
            className='mt-2 p-2 border rounded-md font-semibold text-lg shadow-xl'
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

        <div className='flex flex-col text mb-5'>
          <label htmlFor="categoria" className='font-bold text-2xl mb-2'>Selecciona Categoria</label>
          <select name="categoria" id="categoria"
            className='font-semibold p-2 text-lg shadow-xl'
            value={formik.values.categoria}
            onChange={formik.handleChange}
          >
            <option value="">Seleccione</option>
            {categorias.map( categoria => 
                <option value={categoria.nombre}>{categoria.nombre}</option>
              )}
          </select>
          {formik.touched.categoria && formik.errors.categoria ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.categoria}</p> {/* Accedemos al error para mostrarlo */}
                  </div>
                ) : null }
        </div>

        <div className='flex flex-col text'>
          <label htmlFor="precio" className='font-bold text-2xl'>Precio</label>
          <input
            type="number"
            id='precio'
            placeholder='Ingresa Precio'
            className='mt-2 p-2 border rounded-md font-semibold text-lg shadow-xl'
            value={formik.values.precio}
            onChange={formik.handleChange}
          />
          {formik.touched.precio && formik.errors.precio ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.precio}</p> {/* Accedemos al error para mostrarlo */}
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

export default AgregarProducto