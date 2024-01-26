import appContext from './appContext.js';
import appReducer from './appReducer.js';
import clienteAxios from '@/config/clienteAxios.js';
import authContext from '../auth/authContext.js';
import Swal from 'sweetalert2';
import { useReducer, useContext, useEffect } from 'react';
import { 
    CAMBIAR_SECCION,
    TOGGLE_NAV, TOGGLE_MODAL,
    OBTENER_PRODUCTOS,
    OBTENER_CATEGORIAS,
    TIPO_EDICION,
    CATEGORIA_AGREGADA,
    CATEGORIA_EDITADA,
    CATEGORIA_ELIMINADA,
    PRODUCTO_ELIMINADO,
    PRODUCTO_EDITADO,
    PRODUCTO_AGREGADO,
    SET_CATEGORIA_FILTRO, ACTUALIZAR_PRODUCTOS_FILTRADOS,
    CAMBIAR_CATEGORIA_PEDIDO, LIMPIAR_CATEGORIA_PEDIDO,
    PRODUCTOS_FILTRADOS_PEDIDO, AGREGAR_PRODUCTO_PEDIDO,
    RESET_PEDIDO,
    CARGAR_CLIENTES,
    AGREGA_A_PENDIENTE,
    SET_PEDIDO_A_PAGAR,
    ACTUALIZAR_PENDIENTES,
    ACTUALIZAR_MESAS_DISPONIBLES,
    CLIENTE_ELIMINADO,
    CLIENTE_EDITADO,
    ACTUALIZAR_CLIENTES,
    SET_PEDIDOS_VER,
    CARGAR_PEDIDOS,
    PEDIDO_ELIMINADO
} from '@/types/index.js';

const AppState = ({children}) => {
    const AuthContext = useContext(authContext);
    const { token } = AuthContext;

    const initialState = {
        seccion: 'registroPedidos',
        categoria: null,
        isNavOpen: true,
        productos: null,
        categorias: null,
        isOpenModal: false,
        tipoDeModal: null,
        categoriaFiltrada: null,
        productosFiltrados: null,
        //Registro Pedidos
        categoriaFiltrarPedido: null,
        productosFiltradosPedido: null,
        productosPedido: [],
        clientes: [],
        clientesAMostrar: [],
        pedidos: [],
        pedidosAMostrar: [],
        pendientesPorPagar: [],
        pedidoAPagar: null,
        mesasDisponibles: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9',]
    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        if(token) {
            cargarClientes();
            cargarPedidos();
        }
    }, [token])

    // Actualizacion de categoria filtrada en Productos:
    useEffect(() => {
        // Filtrar en apartado Productos
        const changeProductosFiltrados = () => {
            if(!state.categoriaFiltrada) {
                return dispatch({
                    type: ACTUALIZAR_PRODUCTOS_FILTRADOS,
                    payload: null
                })
            }

            const productosFiltrados = state.productos.filter( producto => producto.categoria === state.categoriaFiltrada)
            // Comprobar si existe productos con la categoria
            if(!productosFiltrados.length) {
                return sweetalertBasica('No hay productos con esta categoria', true)
            }
            dispatch({
                type: ACTUALIZAR_PRODUCTOS_FILTRADOS,
                payload: productosFiltrados
            })
        }

        changeProductosFiltrados();
    }, [state.categoriaFiltrada, state.categoriaFiltrarPedido], )

// Categorias
const agregarCategoria = async nombre => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }

    try {
        const categoriaCreada = await clienteAxios.post('/categorias', nombre, config)
        const categoriasActualizadas = [...state.categorias, categoriaCreada.data];

        dispatch({
            type: CATEGORIA_AGREGADA,
            payload: categoriasActualizadas
        })

        toggleModal();
        sweetalertBasica('Categoria creada Correctamente', false)
    } catch (error) {
        console.log(`Error al crear Categoria: ${error}`)
        sweetalertBasica(error.response.data.msg, true)
    }
}

const cargarCategorias = async () => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
      }

    const categorias = await clienteAxios.get('/categorias', config);
    dispatch({
        type: OBTENER_CATEGORIAS,
        payload: categorias.data
    })
} 

const editarCategoria = async (categoriaID, nuevoNombre) => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const respuesta = await clienteAxios.put(`/categorias/${categoriaID}`,{nombre: nuevoNombre} , config);
        const categoriasActualizadas = state.categorias.map( categoria => 
            categoria._id === categoriaID ? {...categoria, nombre: nuevoNombre} : categoria
        );
        
        dispatch({
            type: CATEGORIA_EDITADA,
            payload: categoriasActualizadas
        })

        sweetalertBasica(respuesta.data.msg, false)
        return true
    } catch (error) {
        console.error(`Error al Editar la Categoria ${error.response.data.msg}`);
    }
}

const eliminarCategoria = async (categoriaID, categoriaNombre) => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }

    const existeProductoConCategoria = state.productos.find( producto => producto.categoria === categoriaNombre)

    if(existeProductoConCategoria) {
        return sweetalertBasica('Hay Productos usando esta categoria, por lo tanto no se puede eliminar', true)
    }
    
    try {
        const respuesta = await clienteAxios.delete(`/categorias/${categoriaID}`, config);
        const categoriasActualizadas = state.categorias.filter( categoria => categoria._id !== categoriaID);
        
        dispatch({
            type: CATEGORIA_ELIMINADA,
            payload: categoriasActualizadas
        })

        sweetalertBasica(respuesta.data.msg, false)
        if(state.categorias?.length === 1) {
            toggleModal()
        }
    } catch (error) {
        console.error(`Error al eliminar la Categoria ${error.response.data.msg}`);
    }
}

// Productos
const agregarProducto = async (valores) => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }

    try {
        const productoCreado = await clienteAxios.post('/productos', valores, config)
        const productosActualizados = [...state.productos, productoCreado.data];
        dispatch({
            type: PRODUCTO_AGREGADO,
            payload: productosActualizados
        })

        toggleModal();
        sweetalertBasica('Producto creado Correctamente', false)
    } catch (error) {
        console.log(`Error al crear el Producto: `, error)
        sweetalertBasica(error.response.data.msg, true)
    }
}

const cargarProductos = async () => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
      }

    const productos = await clienteAxios.get('/productos', config);
    dispatch({
        type: OBTENER_PRODUCTOS,
        payload: productos.data
    })
} 

const editarProducto = async (productoID, newNombre, newCategoria, newPrecio) => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const respuesta = await clienteAxios.put(`/productos/${productoID}`,{
                                                                                nombre: newNombre,
                                                                                categoria: newCategoria,
                                                                                precio: newPrecio
                                                                            } , config);
        const productosActualizados = state.productos.map( producto => 
            producto._id === productoID ? {
                ...producto,
                nombre: newNombre || producto.nombre,
                categoria: newCategoria || producto.categoria,
                precio: newPrecio || producto.precio
            } : producto
        );
        
        dispatch({
            type: PRODUCTO_EDITADO,
            payload: productosActualizados
        })

        sweetalertBasica(respuesta.data.msg, false)
        return true
    } catch (error) {
        console.error(`Error al Editar el producto: ${error.response.data.msg}`);
    }
}

const eliminarProducto = async productoID => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const respuesta = await clienteAxios.delete(`/productos/${productoID}`, config);
        const productosActualizados = state.productos.filter( producto => producto._id !== productoID);
        
        dispatch({
            type: PRODUCTO_ELIMINADO,
            payload: productosActualizados
        })

        // Actualizacion ProductosFiltrados
        const productosFiltradosActualizados = state.productosFiltrados.filter( producto => producto._id !== productoID)
        dispatch({
            type: ACTUALIZAR_PRODUCTOS_FILTRADOS,
            payload: productosFiltradosActualizados
        })

        sweetalertBasica(respuesta.data.msg, false)
        if(state.productos?.length === 1) {
            toggleModal()
        }
    } catch (error) {
        console.error(`Error al eliminar la Producto`);
    }
}

const filtrarProductos = async filtro => {
    if(!filtro) {
        return dispatch({
            type: SET_CATEGORIA_FILTRO,
            payload: null
        }) 
    } 

    dispatch({
        type: SET_CATEGORIA_FILTRO,
        payload: filtro
    })
}

// Ingreso de pedidos...
const setcategoriaFiltrarPedido = categoriaNombre => {
    dispatch({
        type: CAMBIAR_CATEGORIA_PEDIDO,
        payload: categoriaNombre
    })
}

const limpiarcategoriaFiltrarPedido = () => {
    dispatch({
        type: LIMPIAR_CATEGORIA_PEDIDO,
        payload: null
    })
}

const filtrarProductosPedido = () => {
    const productosFiltrados = state.productos?.filter( producto => producto.categoria === state.categoriaFiltrarPedido)
    dispatch({
        type: PRODUCTOS_FILTRADOS_PEDIDO,
        payload: productosFiltrados
    })
}

const agregarPedido = producto => {
    if(state.productosPedido?.find(productoPedido => productoPedido.nombre === producto.nombre)) {
        const pedidoCantidadActualizada = state.productosPedido.map( productoPedido => 
            productoPedido.nombre === producto.nombre ? {
                ...productoPedido,
                cantidad: productoPedido.cantidad + 1
            } : productoPedido
        );

        dispatch({
            type: AGREGAR_PRODUCTO_PEDIDO,
            payload: pedidoCantidadActualizada
        })
        return 
    }

    const productoAgregar = {
        nombre: producto.nombre,
        cantidad: 1,
        subtotal: producto.precio
    }

    const productosPedidoActualizados = [...state.productosPedido, productoAgregar]
    
    dispatch({
        type: AGREGAR_PRODUCTO_PEDIDO,
        payload: productosPedidoActualizados
    })
}

const resetearPedido = () => {
    dispatch({
        type: RESET_PEDIDO
    })
}

const verificarExisteCliente = telefono => {
    if(state.clientes?.find( cliente => cliente.telefono === telefono)) {
        const cliente = state.clientes?.find( cliente => cliente.telefono === telefono)
        return cliente
    }
}

const agregarAPendientes = datos => {
    dispatch({
        type: AGREGA_A_PENDIENTE,
        payload: [...state.pendientesPorPagar, datos]
    })

    // Actualizar Mesas
    const mesasActualizadas = state.mesasDisponibles.filter(mesa => mesa !== datos.mesa)
    mesasDisponibles(mesasActualizadas)
}

const mesasDisponibles = mesas => {
    dispatch({
        type: ACTUALIZAR_MESAS_DISPONIBLES,
        payload: mesas
    })
}

const setPedidoAPagar = pedido => {
    dispatch({
        type: SET_PEDIDO_A_PAGAR,
        payload: pedido
    })
}

const facturarPedidoSalon = async () => {
    const config = {
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    
    const { productos, total, telefono, tipoDePedido } = state.pedidoAPagar;
    const pedidoPagado = {
        productos,
        telefono,
        totalPagado: total,
        tipoDePedido
    }

    try {
        await clienteAxios.post('pedidos', pedidoPagado, config)
        sweetalertBasica('Facturado Correctamente',  false);

        // Actualizar State
        //Actualizar Mesa Disponible:
        const mesasActualizadas = [...state.mesasDisponibles, state.pedidoAPagar.mesa]
        const mesasOrdenadas = mesasActualizadas.sort();
        mesasDisponibles(mesasOrdenadas)

        // Actualizar Pendientes y quitar modal
        const pendientesActualizados = state.pendientesPorPagar.filter( pedido => pedido.mesa !== state.pedidoAPagar.mesa);
        dispatch({
            type: ACTUALIZAR_PENDIENTES,
            payload: pendientesActualizados
        })

        cambiarTipoModal(null)
        setPedidoAPagar(null);

    } catch (error) {
        console.error('Error al facturar el pedido:', error );
    }
}

const facturarPedido = async datos => {
    const config = {
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    
    const { productos, total, telefono, tipoDePedido, nombre } = datos;
    const pedidoPagado = {
        productos,
        nombre,
        telefono,
        totalPagado: total,
        tipoDePedido
    }

    try {
        await clienteAxios.post('pedidos', pedidoPagado, config)
        sweetalertBasica(`Facturado correctamente para: ${nombre}`,  false);
        // Actualizar Clientes
        cargarClientes();
    } catch (error) {
        console.error('Error al facturar el pedido:', error );
    }
}

// Clientes
const cargarClientes = async () => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
      }

    const clientes = await clienteAxios.get('/clientes', config);
    dispatch({
        type: CARGAR_CLIENTES,
        payload: clientes.data
    })
}

const agregarCliente = async datos => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }

    try {
        const clienteCreado = await clienteAxios.post('/clientes', datos, config)
        sweetalertBasica('Cliente Almacenado Correctamente', false)
        state.clientes.push(clienteCreado.data)
        toggleModal();
        return true
    } catch (error) {
        sweetalertBasica(error.response.data.msg, true)
        console.log(error)
        return false
    }
}

const editarCliente = async datos=> {
    const { telefonoCliente, nuevoNombre, nuevoTelefono, nuevaDireccion } = datos;

    const datosEditar = {
        nombre: nuevoNombre,
        telefono: nuevoTelefono,
        direccion: nuevaDireccion
    }

    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const respuesta = await clienteAxios.put(`/clientes/${telefonoCliente}`, datosEditar, config);
        
        const clientesActualizados = state.clientes.map( cliente => 
            cliente.telefono === telefonoCliente ? {
                ...cliente,
                nombre: nuevoNombre || cliente.nombre,
                telefono: nuevoTelefono || cliente.telefono,
                direccion: nuevaDireccion || cliente.direccion
            } : cliente
        );
        
        dispatch({
            type: CLIENTE_EDITADO,
            payload: clientesActualizados
        })

        sweetalertBasica(respuesta.data.msg, false)
        return true
    } catch (error) {
        console.error(`Error al Editar el Cliente: ${error}`);
    }
}

const eliminarCliente = async telefono => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const respuesta = await clienteAxios.delete(`/clientes/${telefono}`, config);
        const clientesActualizados = state.clientes.filter( cliente => cliente.telefono !== telefono);
        
        dispatch({
            type: CLIENTE_ELIMINADO,
            payload: clientesActualizados
        })

        sweetalertBasica(respuesta.data.msg, false)
    } catch (error) {
        console.error(`Error al eliminar la Producto`);
    }
}

const actualizarClientes = clientesActualizados => {
    dispatch({
        type: ACTUALIZAR_CLIENTES,
        payload: clientesActualizados
    })
}

const obtenerNombreUsuario = async usuarioID => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
      }

    const respuesta = await clienteAxios.get(`/usuarios/obtenerUsuario/${usuarioID}`, config);
    return respuesta.data.nombreUsuario
}

// Registro de pedidos...

const buscarCliente = creadorID => {
    const cliente = state.clientes?.find( cliente => cliente._id === creadorID);
    return cliente?.nombre
}

const eliminarPedido = async pedidoID => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    
    try {
        const respuesta = await clienteAxios.delete(`/pedidos/${pedidoID}`, config);
        const pedidosActualizados = state.pedidos.filter( pedido => pedido._id !== pedidoID);
        
        dispatch({
            type: PEDIDO_ELIMINADO,
            payload: pedidosActualizados
        })

        sweetalertBasica(respuesta.data.msg, false)
    } catch (error) {
        sweetalertBasica(error.response.data.msg, true)
    }
}

// PEDIDOS...

const cargarPedidos = async () => {
    const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
    }

    const pedidos = await clienteAxios.get('/pedidos', config);
    dispatch({
        type: CARGAR_PEDIDOS,
        payload: pedidos.data
    })
}

const setPedidosVer = pedidos => {
    let pedidosFiltrados = [];
    pedidos.forEach( pedidoFiltrar => {
        const pedido = state.pedidos.filter( pedido => pedido._id === pedidoFiltrar)
        pedidosFiltrados.push(pedido)
    });
    
    dispatch({
        type: SET_PEDIDOS_VER,
        payload: pedidosFiltrados
    })
}

// Funciones...
const cambiarTipoModal = async tipo => {
    dispatch({
        type: TIPO_EDICION,
        payload: tipo
    })
    
    toggleModal();
}

const sweetalertBasica = (mensaje, error) => {
    Swal.fire({
        title: `${mensaje}`,
        icon: `${error ? 'error' : 'success'}`,
    })
}

const cambiarSeccion = seccion => {
    dispatch({
        type: CAMBIAR_SECCION,
        payload: seccion
    })
}

const toggleNav = () => {
    dispatch({
        type: TOGGLE_NAV,
        payload: !state.isNavOpen
    })
}

const toggleModal = () => {
    dispatch({
        type: TOGGLE_MODAL,
        payload: !state.isOpenModal
    })
}

  return (
    <appContext.Provider
        value={{
            categoria: state.categoria,
            seccion: state.seccion,
            isNavOpen: state.isNavOpen,
            productos: state.productos,
            categorias: state.categorias,
            isOpenModal: state.isOpenModal,
            tipoDeModal: state.tipoDeModal,
            categoriaFiltrada: state.categoriaFiltrada,
            productosFiltrados: state.productosFiltrados,
            categoriaFiltrarPedido: state.categoriaFiltrarPedido,
            productosPedido: state.productosPedido,
            clientes: state.clientes,
            productosFiltradosPedido: state.productosFiltradosPedido,
            pendientesPorPagar: state.pendientesPorPagar,
            pedidoAPagar: state.pedidoAPagar,
            mesasDisponibles: state.mesasDisponibles,
            clientesAMostrar: state.clientesAMostrar,
            pedidos: state.pedidos,
            pedidosAMostrar: state.pedidosAMostrar,
            toggleNav,
            cambiarSeccion,
            cargarProductos,
            cargarCategorias,
            toggleModal,
            cambiarTipoModal,
            eliminarCategoria,
            agregarCategoria,
            editarCategoria,
            eliminarProducto,
            editarProducto,
            agregarProducto,
            filtrarProductos,
            setcategoriaFiltrarPedido,
            limpiarcategoriaFiltrarPedido,
            filtrarProductosPedido,
            agregarPedido,
            resetearPedido,
            agregarAPendientes,
            sweetalertBasica,
            verificarExisteCliente,
            agregarCliente,
            setPedidoAPagar,
            facturarPedidoSalon,
            facturarPedido,
            eliminarCliente,
            editarCliente,
            actualizarClientes,
            setPedidosVer,
            obtenerNombreUsuario,
            buscarCliente,
            eliminarPedido
        }}
    >
        {children}
    </appContext.Provider>
  )
}

export default AppState