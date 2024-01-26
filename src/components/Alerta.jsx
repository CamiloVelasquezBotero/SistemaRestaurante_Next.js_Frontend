import { useContext } from 'react'
import authContext from '@/context/auth/authContext'

const Alerta = () => {
    const AuthContext = useContext(authContext);
    const { mensaje, error, limpiarAlerta} = AuthContext;

    setTimeout(() => {
      limpiarAlerta();
    }, 8000)

  return (
    <div className={`text-center p-2 ${error ? 'bg-red-500' : 'bg-green-400'} font-semibold rounded-xl mt-5`}>
        <p>{mensaje}</p>
    </div>
  )
}

export default Alerta