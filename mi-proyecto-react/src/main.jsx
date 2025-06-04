import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Ejemplo from './Ejemplo.jsx'
import Tarjeta from './components/Tarjeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Tarjeta titulo={"Plan Premium"} descripcion={"Este es el Plan Premium"} precio={"5"} />
{/*     <Ejemplo list={[1, 2, 3, 4, 5, 6]} dummy={"cadena"} miParametro={true} /> */}  </StrictMode>,
)
