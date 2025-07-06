import { useState, useEffect, useMemo, useRef } from 'react'
import './App.css'
/* import Planet from './components/Planeta'; */

function App() {
  const [distance, setDistance ] = useState(0);
  const [fuel, setFuel] = useState(20);
  const [shipStatus, setShipStatus] = useState("En órbita");
  /* const [visitedPlanets, setVisitedPlanets] = useState([]); */
  const [controlPanel, setControlPanel] = useState("");
  const [buttonText, setButtonText] = useState("Aterrizar")
  const [warning, setWarning] = useState("")
  const prevStatus = useRef();

  //useEffect para llevar intervalo de combustible y distancai principal
  useEffect(() => {
    let interval;
    if (
      (shipStatus === "En órbita" || 
      shipStatus === "Aterrizando" || 
      shipStatus === "Despegando") 
      && fuel > 0
    ) {
      interval = setInterval(() => {
        setFuel(f => f - 1);
        setDistance(d => d + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [shipStatus, fuel]);

  //useEffect para mensaje de panel de control al haber aterrizado
  useEffect(() => {
    if (shipStatus === "Aterrizado")
      setControlPanel("El panel de control se ha apagado");
  }, [shipStatus]);

  //useEffect para mensaje de panel de control al estar enórbita o despegar
  useEffect(() => {
    if (
      shipStatus === "Despegando" && prevStatus.current === "Aterrizado" 
      || prevStatus.current === undefined)
    {
      setControlPanel("¡El panel de control está listo!");
    }
    prevStatus.current = shipStatus;
  }, [shipStatus]);

  //memoria del estado de la nave
  const statusMessage = useMemo(() => {
    return `Estado: ${shipStatus}`
  }, [shipStatus])

  //cambio de los estados de la nave
  const changeStatus = () => {
    if (shipStatus === "En órbita") {
      setShipStatus("Aterrizando");
      setTimeout(() => {
        setShipStatus("Aterrizado");
        setButtonText("Despegar");
      }, 3000);
    }

    if (shipStatus === "Aterrizado") {
      setShipStatus("Despegando");
      setTimeout(() => {
        setShipStatus("En órbita");
        setButtonText("Aterrizar");
      }, 3000);
    } 
  }

  //useEffect para mensajes de alerta por combustible bajo
  useEffect(() => {
    if (fuel <= 0) {
      setWarning("¡SIN COMBUSTIBLE! A LA DERIVA...");
    } else if (fuel <= 5) {
      setWarning("¡PELIGRO!");
    } else if (fuel <= 10){
      setWarning("¡POCO COMBUSTIBLE!");
    }
  }, [fuel]);
  
  //useMemo para mensaje de alerta
  const warningMessage = useMemo(() => {
    return `${warning}`
  }, [warning])

  //useEffect para cambio de distancia por movimiento a la deriva
  useEffect(() => {
    let interval;
    if (
      (shipStatus === "En órbita" || 
      shipStatus === "Aterrizando" || 
      shipStatus === "Despegando") 
      && fuel == 0
    ) {
      interval = setInterval(() => {
        setDistance(d => d + 1);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [shipStatus, fuel]);
  
  return (
    <>
      <div id='controlPanel'>
        <p>{warningMessage}</p>
        <p>{controlPanel}</p>
        <p>Combustible: {fuel}</p>
        <p>Distancia: {distance}</p>
        <p>{statusMessage}</p>
        <button onClick={changeStatus}>{buttonText}</button>
      </div>
      {/* <div>
        {visitedPlanets.map((Planet, index) => ( 
          <Planet key={index} name={Planet} />
        ))}
      </div> */}
    </>
  )
}

export default App
