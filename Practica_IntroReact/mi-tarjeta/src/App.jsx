import Tarjeta from './Tarjeta';

function App() {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Tarjetas de Presentación</h1>
      {/* Renderizamos el componente Tarjeta */}
      <Tarjeta nombre= 'Ana' profesion='Desarrolladora web'  mensaje = "¡Bienvenido a mi tarjeta de presentación!" />
      <Tarjeta nombre= 'Juan' profesion='Desarrollador web'  mensaje = "¡Hola mundo! Esta es mi tarjeta de presentación" />
      <Tarjeta nombre= 'Pedro' profesion='Estudiante'  mensaje = "¡Aprendiendo React!" />

    </div>
  );
}

export default App;