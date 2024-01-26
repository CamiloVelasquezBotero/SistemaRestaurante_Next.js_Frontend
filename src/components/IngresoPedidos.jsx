import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import appContext from '@/context/app/appContext'

const IngresoDePedidos = () => {
  const [tipoDePedido, setTipoDePedido] = useState('');
  const [mesa, setMesa] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [existeCliente, setExisteCliente] = useState(false);
  const [total, setTotal] = useState('');

  const AppContext = useContext(appContext);
  const { categorias, isNavOpen, setcategoriaFiltrarPedido, categoriaFiltrarPedido, productosFiltradosPedido,
     productosPedido, limpiarcategoriaFiltrarPedido, filtrarProductosPedido, agregarPedido,
     resetearPedido, agregarAPendientes, sweetalertBasica, verificarExisteCliente, agregarCliente,
     pendientesPorPagar, cambiarTipoModal, setPedidoAPagar, mesasDisponibles, facturarPedido
     } = AppContext;

  const colores = ['bg-sky-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-gray-500',
   'bg-orange-500', 'bg-purple-500', 'bg-amber-500', 'bg-lime-500', 'bg-slate-500', 'bg-teal-500',
   'bg-esmerald-500', 'bg-cyan-500'];

  useEffect(() => {
    if(tipoDePedido === 'llevar' || tipoDePedido === 'salon') {
      setDomicilio('')
    }
  }, [tipoDePedido])

  useEffect(() => {
    filtrarProductosPedido();
  }, [categoriaFiltrarPedido])

  useEffect(() => {
    const cliente = verificarExisteCliente(Number(telefono))
    if(cliente) {
      setNombre(cliente.nombre)
      setDireccion(cliente.direccion)
      setExisteCliente(true)
      return
    }
    setExisteCliente(false)
  }, [telefono])

  useEffect(() => {
    if(productosPedido.length) {
      const total = productosPedido?.reduce((acumulador, producto) => {
        const subtotal = producto.cantidad * producto.subtotal;
        return acumulador + subtotal
      }, 0)

      if(!domicilio) {
        setTotal(total)
      }
      if(domicilio > 0) {
        const totalConDomicilio = total + domicilio;
        setTotal(totalConDomicilio)
      }
    }
  }, [productosPedido, domicilio])

  const confirmarPedido = async () => {
    const datos = {
      telefono: telefono,
      direccion: direccion,
      nombre: nombre,
      tipoDePedido: tipoDePedido,
      mesa: mesa,
      domicilio: domicilio,
      productos: productosPedido,
      total: total
    }
    
    if(tipoDePedido === '' || !productosPedido.length){
      sweetalertBasica('Faltan campos por completar', true)
      return
    }

    if(tipoDePedido === 'salon') {
      if(!mesa) {
        sweetalertBasica('No has elegido la mesa', true)
        return
      }
      agregarAPendientes(datos);
      resetearPedido();
      setTelefono('')
      setDireccion('')
      setNombre('')
      setTotal('')
    }

    if(tipoDePedido === 'llevar') {
      if(!nombre) {
        sweetalertBasica('No has colocado el nombre del cliente', true)
        return
      }
      facturarPedido(datos)
      resetearPedido();
      setTelefono('')
      setDireccion('')
      setNombre('')
      setTotal('')
    }

    if(tipoDePedido === 'domicilio') {
      if(!domicilio) {
        sweetalertBasica('No has colocado el valor del domicilio', true)
        return
      }
      if([telefono, direccion, nombre].includes('')) {
        sweetalertBasica('No has colocado los datos del cliente', true)
        return
      }
      confirmarAgregarCliente({telefono, direccion, nombre}).then(() => {
        facturarPedido(datos)
      });
      resetearPedido();
      setTelefono('');
      setDireccion('');
      setNombre('');
      setTotal('');
      setDomicilio('');
    }
  }

  const confirmarAgregarCliente = async datos => {
    if(!existeCliente) {
      return new Promise(resolve => {
        Swal.fire({
          title: 'El cliente no existe, ¿Deseas Agregarlo?',
          text: `¿Deseas agregar a: ${nombre}?`,
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#419e79',
          confirmButtonText: `Agregar Cliente`,
          denyButtonColor: '#EF4444',
          denyButtonText: 'Cancelar',
        }).then(async (resultado) => {
          if(resultado.isConfirmed) {
            const respuesta = await agregarCliente(datos);
            if(respuesta) {
              setTelefono('')
              setDireccion('')
              setNombre('')
            }
          }
          resolve();
        })
      })
    }
    return Promise.resolve();
  }

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-orange-700 text-4xl font-black'>Ingreso de Pedidos</h2>

        <div className={`flex items-center ml-5 ${isNavOpen ? 'translate-x-10' : 'translate-x-20'} duration-300`}>
          <div className='mb-5 mr-2'>
            <label htmlFor="cliente">Telefono:</label>
            <input type="text" id='cliente' className='ml-2 pl-2 w-28 rounded-md shadow-xl' 
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
            />
          </div>
          <div className='mb-5 mr-2'>
            <label htmlFor="direccion">Direccion:</label>
            <input type="text" id='direccion' className='ml-2 pl-2 rounded-md shadow-xl' 
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id='nombre' className='ml-2 pl-2 w-36 rounded-md shadow-xl' 
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className='w-full p-10 items-center rounded-xl mt-5'>
          {categoriaFiltrarPedido ? (
            <>
              <div className='flex items-center'>
                <button 
                  className='flex p-2 font-semibold bg-sky-600 text-white rounded-md hover:bg-orange-700 duration-300 hover:scale-105'
                  onClick={limpiarcategoriaFiltrarPedido}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Volver
                </button>
                <h2 className='ml-16 text-orange-700 text-4xl font-black'>{categoriaFiltrarPedido}</h2>
              </div>

              <div className='mt-5 flex justify-center flex-col items-center'>
                {productosFiltradosPedido?.length ? (
                  <>
                    {productosFiltradosPedido?.map( (producto) => (
                      <button
                        key={producto?._id}
                        className={`rounded-md bg-sky-700 hover:bg-sky-800 text-white  p-2 block mb-2 hover:scale-105 duration-300 font-semibold text-xl`}
                        onClick={() => agregarPedido(producto)}
                      >
                        {producto.nombre}
                      </button>
                    ))}
                  </>
                ) : (
                  <p className='font-black text-xl text-center'>Aun no hay productos agregados a esta categoria</p>
                )}
              </div>
            </>
          ) : (
            <div>
              {categorias?.map( (categoria, index) => (
                <button
                  key={categoria?._id}
                  className={`rounded-md ${colores[index]} p-2 block mb-2 hover:scale-105 duration-300 font-semibold text-xl`}
                  onClick={() => {
                    setcategoriaFiltrarPedido(categoria.nombre)
                  }}
                >
                  {categoria.nombre}
                </button>
              ))}
            </div>
          )}
        </div>

          {/*  -----------------  Facturacion */}
        <div className='w-1/2 bg-gray-200 rounded-lg p-3 mt-5 shadow-xl h-[470px]'>
          <h2 className='text-center font-black text-2xl mb-2'>Facturacion</h2>

          <div className='bg-gray-100 h-3/6 rounded-lg p-2 overflow-y-auto'>
            <table className=''>
              <thead>
                <tr>
                  <th className='shadow-xl px-2'>Producto</th>
                  <th className='shadow-xl px-2'>Cantidad</th>
                  <th className='shadow-xl px-2'>Subtotal</th>
                  <th className='shadow-xl px-2'>Total</th>
                </tr>
              </thead>
              <tbody>
                {productosPedido?.map( (producto, index) => (
                  <tr key={index}>
                    <td className='pl-1 shadow-md'>{producto.nombre}</td>
                    <td className='pl-1 shadow-md'>{producto.cantidad}</td>
                    <td className='pl-1 shadow-md'>{producto.subtotal}</td>
                    <td className='pl-1 shadow-md'>{producto.subtotal * producto.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className=' p-2 font-semibold'>
              <p>Numero Pedido: <span className='font-black'>555</span></p>
              <div className='mt-2'>
                <label htmlFor="tipoPedido">Tipo de pedido: </label>
                <select name="tipoPedido" id="tipoPedido" className='rounded-md shadow-xl'
                  onChange={e => setTipoDePedido(e.target.value)}
                >
                  <option value="">Seleccione</option>
                  <option value="salon">Salon</option>
                  <option value="llevar">Llevar</option>
                  <option value="domicilio">Domicilio</option>
                </select>
              </div>

              <div className='mt-2'>
                { tipoDePedido === 'salon' && (
                  <>
                    <label htmlFor="mesa">Mesa: </label>
                    <select name="mesa" id="mesa" className='rounded-md shadow-xl'
                      value={mesa}
                      onChange={e => setMesa(e.target.value)}
                    >
                      <option value="">Seleccione</option>
                      {mesasDisponibles?.map( (mesa, index) => (
                        <option key={index} value={mesa}>{mesa}</option>
                      ))}
                    </select>
                  </>
                )}
                { tipoDePedido === 'llevar' && (
                  <>
                     <p>Llevar para: {nombre}</p>
                  </>
                )}
              
                { tipoDePedido === 'domicilio' && (
                  <>
                    <label htmlFor="domicilio">Domicilio: </label>
                    <input type="Number" id='domicilio' placeholder='$domicilio'
                      className='pl-2 w-20 rounded-md shadow-xl'
                      value={domicilio}
                      onChange={e => setDomicilio(parseInt(e.target.value))}
                    />
                  </>
                )}
              </div>

              <p className='text-xl'>Total: <span className='font-bold'>$ {total}</span></p>
            </div>

            <div className='mt-3 flex justify-between mx-5'>
              <button className='flex items-center bg-green-500 hover:bg-green-700 duration-300 rounded-md p-1 cursor-pointer shadow-xl'
                onClick={confirmarPedido}
              >
                <p>Confirmar</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
                
              <button className='flex items-center bg-red-500 hover:bg-red-700 duration-300 rounded-md p-1 cursor-pointer shadow-xl'
                onClick={() => {
                  resetearPedido();
                  setTotal('')
                }}
              >
                <p>Reset</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ----------- Pendientes de pago ( Salon ) ---------- */}
        <div 
          className={`${isNavOpen ? 'translate-x-0 ml-10' : 'translate-x-24'} duration-300 w-1/2 bg-gray-200 rounded-lg p-3 mt-5 shadow-xl h-[400px]`}
        >
          <h2 className='text-center font-black text-2xl mb-2'>SALON</h2>

          <div className='bg-gray-100 rounded-lg px-7 justify-center h-[320px] overflow-auto'>
            <table>
              <thead>
                <tr className='text-xl'>
                  <th className='shadow-xl px-5'>Mesa</th>
                  <th className='shadow-xl px-5'>Abrir</th>
                </tr>
              </thead>
              <tbody>
                {pendientesPorPagar?.map( (producto, index) => (
                  <tr key={index}>
                    <td className='pl-1 shadow-md font-bold text-xl text-center pt-1'>{producto.mesa}</td>
                    <td className='pl-1 shadow-md text-center pt-2'>
                      <button className='p-2 bg-green-500 hover:bg-green-700 hover:scale-105 duration-300 rounded-xl'
                        onClick={() => {
                            cambiarTipoModal('verProductoPagar');

                            setPedidoAPagar(producto)
                          }
                        } 
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </>
  )
}

export default IngresoDePedidos