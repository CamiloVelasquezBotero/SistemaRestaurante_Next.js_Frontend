import {
    REGISTRO_EXITOSO, REGISTRO_ERROR,
    CONFIRMACION_EXITOSA, CONFIRMACION_ERROR,
    LOGIN_EXITOSO, LOGIN_ERROR,
    OBTENER_PERFIL,
    OLVIDE_PASSWORD_EXITO, OLVIDE_PASSWORD_ERROR,
    CAMBIO_CONTRASEÑA_EXITOSO, CAMBIO_CONTRASEÑA_ERROR,
    CERRAR_SESION,
    LIMPIAR_ALERTA
} from '@/types'

const AuthReducer = (state, action) => {
    switch(action.type) {
        // Enviar mensaje EXITO
        case REGISTRO_EXITOSO:
        case CONFIRMACION_EXITOSA:
        case OLVIDE_PASSWORD_EXITO:
        case CAMBIO_CONTRASEÑA_EXITOSO:
            return {
                ...state,
                mensaje: action.payload,
                error: false
            }
                
        // Enviar mensaje ERROR
        case REGISTRO_ERROR:
        case CONFIRMACION_ERROR:
        case LOGIN_ERROR:
        case OLVIDE_PASSWORD_ERROR:
        case CAMBIO_CONTRASEÑA_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                error: true
            }
        
        case LOGIN_EXITOSO:
            return {
                ...state,
                token: action.payload.token,
                autenticado: true,
                usuario: action.payload
            }

        case OBTENER_PERFIL:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload
            }
        
        case CERRAR_SESION:
            return {
                ...state,
                autenticado: false,
                usuario: null,
                token: null
            }

        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null,
                error: null
            }

            default:
            return state;
    }
}

export default AuthReducer;