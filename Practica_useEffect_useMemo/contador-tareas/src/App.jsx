import { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtro, setFiltro] = useState([]);
  const [primeraCarga, setPrimeraCarga] = useState(true);

  useEffect(()=> {
    const almacen = localStorage.getItem("tareas");
    if(almacen) setTareas(JSON.parse(almacen))
    else{
      setTareas([])
    }
  },[])


  useEffect(() => {
    if(primeraCarga) {
      setPrimeraCarga(false);
      return
    }
    localStorage.setItem("tareas",JSON.stringify(tareas))
  }, [tareas, primeraCarga])

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas
  
  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
    useEffect(() => {
      document.title = `Total: ${calcularTiempoTotal} minutos`;
    }, [tareas, calcularTiempoTotal]);  // Se ejecuta cada vez que las tareas cambian

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const tareasFiltradas = useMemo(() => {
    
    if (filtro.length === 0) return tareas;
    
    return tareas.filter((i) => i.duracion <= filtro);

  }, [tareas, filtro]);
 
  const labelChange = (filtro) => {
    if (filtro === 0) return " minuto";
    if (filtro > 0) return " minutos"
  }

  const ordenarTareas = (value) => {
    if(value === "") return

      else if(value === "az") setTareas([...tareas].sort((a,b) => a.nombre.localeCompare(b.nombre)));
      else if(value === "may-men") setTareas([...tareas].sort((a,b) => b.duracion - a.duracion))
      else if (value === "men-may") setTareas( [...tareas].sort((a,b) => a.duracion - b.duracion))
    };

  return (
    <>
    <div className='w-full flex flex-col'>
      <h1>Contador de Tareas</h1>
      <section className="flex space-x-4">
        <input 
          className='border-indigo-500'
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea" 
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Duración en minutos" 
        />
        <button onClick={agregarTarea} className='bg-blue-500 border-red-100'>Agregar tarea</button>
      </section>

      <section>
        <div>
        <label htmlFor="ordenar">Ordenar: </label>
          <select name="ordenar" id="ordenar" onChange={(e) => ordenarTareas(e.target.value)}>
            <option value=""> -- Selecciona una opción -- </option>
            <option value="az">A - Z</option>
            <option value="may-men">Tiempo: Mayor - Menor</option>
            <option value="men-may">Tiempo: Menor - Mayor</option>
          </select>
        </div>
        <div>
          <label htmlFor="filtrar">Al menos: </label>
          <input 
            id="filtrar"
            type="number" 
            value={filtro} 
            min={0}
            onChange={(e) => setFiltro(parseInt(e.target.value))} 
            placeholder="Duración en minutos" 
          />
          <label htmlFor="filtrar">{labelChange(filtro)}</label>
        </div>
      </section>

      <h2>Tareas</h2>
        {tareas.length === 0 ? (
          <p className="text-center text-gray-500">No hay tareas pendientes</p>
        ) : (
            <ul className="list-disc list-inside space-y-1"> 
              {tareasFiltradas.map((tarea, index) => (
                <li key={index}>
                  {tarea.nombre}: {tarea.duracion} minutos
                </li>
              ))}
            </ul>
        )}
      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  </>
  );
}

export default App;