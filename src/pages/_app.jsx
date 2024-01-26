import '@/styles/globals.css'
import AuthState from '@/context/auth/authState'
import AppState from '@/context/app/appState'

export default function App({ Component, pageProps }) {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  ) 
  
}
