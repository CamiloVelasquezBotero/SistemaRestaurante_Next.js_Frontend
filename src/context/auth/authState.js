import { useReducer, useEffect } from "react";
import { useRouter } from 'next/router';
import authContext from "./authContext.js";
import authReducer from "./authReducer.js";
import clienteAxios from "@/config/clienteAxios.js";
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

const AuthState = ({children}) => {
    const router = useRouter();

    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        error: null,
        cargando: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Se verifica que el usuario ya este registrado con su token
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const usuarioAutenticado = await clienteAxios.get('/usuarios/perfil', config)
                dispatch({
                    type: OBTENER_PERFIL,
                    payload: usuarioAutenticado.data
                })
                router.push('/');
            } catch (error) {
                console.error(`Error al obtener el perfil del usuario: ${error}`)
                // Mensaje de alerta
                Swal.fire({
                    title: 'Token no valido, o Expirado',
                    icon: 'error',
                })
                localStorage.removeItem('token')
                router.push('/');
            }
        }
        autenticarUsuario();
    }, [state.token])
    
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/usuarios', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const confirmarToken = async (mensaje, error) => {
        if(!error) {
            dispatch({
                type: CONFIRMACION_EXITOSA,
                payload: mensaje
            })
        } else {
            dispatch({
                type: CONFIRMACION_ERROR,
                payload: mensaje
            })
        }
    }

    const iniciarSesion = async valores => {
        try {
            const usuarioAutenticado = await clienteAxios.post('/usuarios/login', valores)
            localStorage.setItem('token', usuarioAutenticado.data.token)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: usuarioAutenticado.data
            })
        } catch (error) {
            localStorage.removeItem('token');
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const olvidePassword = async email => {
        try {
            const respuesta = await clienteAxios.post('/usuarios/olvidePassword', email);
            dispatch({
                type: OLVIDE_PASSWORD_EXITO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            dispatch({
                type: OLVIDE_PASSWORD_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    
    const cambiarContraseña = async (nuevoPassword, token) => {
        try {
            await clienteAxios.post(`/usuarios/olvidePassword/${token}`, nuevoPassword);
            dispatch({
                type: CAMBIO_CONTRASEÑA_EXITOSO,
                payload: '¡Password modificado correctamente!'
            })
            return true
        } catch (error) {
            console.error('Error al modificar el password: ', error);
            dispatch({
                type: CAMBIO_CONTRASEÑA_ERROR,
                payload: 'Hubo un error al modificar el password'
            })
            return false
        }
    }

    const limpiarAlerta = () => {
        dispatch({
            type: LIMPIAR_ALERTA
        })
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        dispatch({
            type: CERRAR_SESION
        })
        router.push('/login');
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                error: state.error,
                registrarUsuario,
                confirmarToken,
                limpiarAlerta,
                iniciarSesion,
                olvidePassword,
                cambiarContraseña,  
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;