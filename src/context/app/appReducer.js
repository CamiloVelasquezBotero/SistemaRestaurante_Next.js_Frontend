import { 
  CAMBIAR_SECCION,
  TOGGLE_NAV, TOGGLE_MODAL,
  OBTENER_PRODUCTOS, OBTENER_CATEGORIAS,
  TIPO_EDICION,
  CATEGORIA_AGREGADA,
  CATEGORIA_EDITADA,
  CATEGORIA_ELIMINADA,
  PRODUCTO_ELIMINADO,
  PRODUCTO_EDITADO,
  PRODUCTO_AGREGADO,
  SET_CATEGORIA_FILTRO,
  ACTUALIZAR_PRODUCTOS_FILTRADOS,
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
  CARGAR_PEDIDOS,
  SET_PEDIDOS_VER,
  PEDIDO_ELIMINADO
} from '@/types';

const AppReducer = (state, action) => {
  switch(action.type) {

    case CAMBIAR_SECCION:
      return {
        ...state,
        seccion: action.payload,
        isNavOpen: false
      }
    
    case TOGGLE_NAV: 
      return {
        ...state,
        isNavOpen: action.payload
      }

    case TOGGLE_MODAL:
      return {
        ...state,
        isOpenModal: action.payload
      }

    case OBTENER_PRODUCTOS:
    case PRODUCTO_AGREGADO:
    case PRODUCTO_EDITADO:
    case PRODUCTO_ELIMINADO:
    return {
      ...state,
      productos: action.payload
    }

    case OBTENER_CATEGORIAS: 
    case CATEGORIA_AGREGADA:
    case CATEGORIA_EDITADA:
    case CATEGORIA_ELIMINADA:
    return {
      ...state,
      categorias: action.payload
    }

    case TIPO_EDICION:
      return {
        ...state,
        tipoDeModal: action.payload
      }

    case SET_CATEGORIA_FILTRO:
      return {
        ...state,
        categoriaFiltrada: action.payload
      }

    case ACTUALIZAR_PRODUCTOS_FILTRADOS:
      return {
        ...state,
        productosFiltrados: action.payload
      }

    // ---------------------------- CLIENTES
    case CARGAR_CLIENTES:
    case CLIENTE_ELIMINADO:
    case CLIENTE_EDITADO:
      return {
        ...state,
        clientes: action.payload,
        clientesAMostrar: action.payload
      }

    case ACTUALIZAR_CLIENTES:
      return {
        ...state,
        clientesAMostrar: action.payload
      }

    // ----------------------- Pedidos

    case CARGAR_PEDIDOS:
      return {
        ...state,
        pedidos: action.payload
      }

    case SET_PEDIDOS_VER:
      return {
        ...state,
        pedidosAMostrar: action.payload
      }

      case PEDIDO_ELIMINADO:
        return {
          ...state,
          pedidos: action.payload,
          pedidosAMostrar: action.payload

        }

    // ----------------------- Registro de pedidos
    case CAMBIAR_CATEGORIA_PEDIDO:
    case LIMPIAR_CATEGORIA_PEDIDO:
      return {
        ...state,
        categoriaFiltrarPedido: action.payload
      }

    case PRODUCTOS_FILTRADOS_PEDIDO:
      return {
        ...state,
        productosFiltradosPedido: action.payload
      }

    case AGREGAR_PRODUCTO_PEDIDO: 
      return {
        ...state,
        productosPedido: action.payload
      }

    case RESET_PEDIDO:
      return {
        ...state,
        productosPedido: []
      }
    
    case AGREGA_A_PENDIENTE:
    case ACTUALIZAR_PENDIENTES:
      return {
        ...state,
        pendientesPorPagar: action.payload
      }

    case SET_PEDIDO_A_PAGAR:
      return {
        ...state,
        pedidoAPagar: action.payload
      }

    case ACTUALIZAR_MESAS_DISPONIBLES:
      return {
        ...state,
        mesasDisponibles: action.payload
      }
    
    default: 
    return state;
  }
}

export default AppReducer