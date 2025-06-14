function Tarjeta(props) {
  // Definimos la información estática de la tarjeta
/*   const nombre = "Ana Pérez";
  const profesion = "Desarrolladora Web";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!"; */

  // Retornamos el JSX que representa la tarjeta
  return (
    <div style={{display:'flex', flexDirection: 'column', alignItems:"center", width:"100%"}}>
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center', display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column', margin: '2rem'}}>
        {/* JSX permite incrustar variables en HTML utilizando llaves {} */}
        <button style = {{marginLeft: '90%', backgroundColor: 'gray'}}> X</button>
        <h2>{props.nombre}</h2>
        <h4>{props.profesion}</h4>
        <p>{props.mensaje}</p>
        </div>
    </div>
  );
}

export default Tarjeta;