import { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import appContext from '@/context/app/appContext';
import Swal from 'sweetalert2';

const AgregarNuevoCliente = () => {
  const AppContext = useContext(appContext);
  const { pedidoAPagar, facturarPedidoSalon, agregarCliente } = AppContext;

  const formik = useFormik({
    initialValues: {
      telefono: '',
      direccion: '',
      nombre: '',
    },
    validationSchema: Yup.object({
      telefono: Yup.number()
                .typeError('Deben ser valores numericos')
                .required('El Telefono es obligatorio'),
      direccion: Yup.string()
                .required('La Direccion es obligatoria'),
      nombre: Yup.string()
                .required('El Nombre es obligatorio'),
    }),
    onSubmit: async (valores, { resetForm }) => {
        await agregarCliente(valores)

        resetForm();
    }
  })

  return (
    <>
        <h2 className='mr-10 text-orange-700 text-3xl font-black mb-5'>Agrega un Cliente</h2>
      <form 
        onSubmit={formik.handleSubmit}
      >
        <div className='flex flex-col text mb-5'>
          <label htmlFor="telefono" className='font-bold text-2xl'>Telefono</label>
          <input
            type="number"
            id='telefono'
            placeholder='Telefono Cliente'
            className='mt-2 p-2 border rounded-md font-semibold text-lg shadow-xl'
            value={formik.values.telefono}
            onChange={formik.handleChange}
          />
          {formik.touched.telefono && formik.errors.telefono ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.telefono}</p> {/* Accedemos al error para mostrarlo */}
                  </div>
                ) : null }
        </div>

        <div className='flex flex-col text mb-5'>
          <label htmlFor="direccion" className='font-bold text-2xl mb-2'>Direccion</label>
          <input
            type="text"
            id='direccion'
            placeholder='Direccion Cliente'
            className='mt-2 p-2 border rounded-md font-semibold text-lg shadow-xl'
            value={formik.values.direccion}
            onChange={formik.handleChange}
          />
          {formik.touched.direccion && formik.errors.direccion ? (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.direccion}</p> {/* Accedemos al error para mostrarlo */}
                  </div>
                ) : null }
        </div>

        <div className='flex flex-col text'>
          <label htmlFor="nombre" className='font-bold text-2xl'>Nombre</label>
          <input
            type="text"
            id='nombre'
            placeholder='Nombre Cliente'
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
        
        <input 
          type="submit" 
          value={'Crear Cliente'} 
          className='cursor-pointer w-auto mt-5 p-2 text-xl bg-orange-700 text-white font-bold rounded-md hover:scale-105 hover:bg-orange-800 duration-300'
        />
      </form>
    </>
  )
}

export default AgregarNuevoCliente