import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Planet from './components/Planeta';

function App() {
  const [distance, setDistance ] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [shipStatus, setShipStatus] = useState("");
  const [visitedPlanets, setVisitedPlanets] = useState([]);
  /* const [controlPanel, setControlPanel] = useState(""); */
  const [buttonText, setButtonText] = useState("")

  useEffect(() => {
    console.log("¡El panel de control está listo!");
    setShipStatus("En órbita");
    setButtonText("Aterrizar")

    const interval = setInterval(() => {
      setFuel(f => f - 1);
      setDistance(d => d + 1);
    }, 1000);

    return () => {
      clearInterval(interval)
      console.log("El panel de control se ha apagado")
    }
  },[])

  const statusMessage = useMemo(() => {
    return `Estado: ${shipStatus}`
  }, [shipStatus])

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



  return (
    <>
      <div id='controlPanel'>
        {/* <p>{controlPanel}</p> */}
        <p>Combustible: {fuel}</p>
        <p>Distancia: {distance}</p>
        <p>{statusMessage}</p>
        <button onClick={changeStatus}>{buttonText}</button>
      </div>
      <div>
        {visitedPlanets.map((Planet, index) => ( 
          <Planet key={index} name={Planet} />
        ))}
      </div>
      
    </>
  )
}

export default App
