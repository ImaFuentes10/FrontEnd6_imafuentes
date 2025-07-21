import { useParams } from 'react-router-dom';
import ProtectedRoute from '../components/Navigate';

function CitaDetalle() {
  const { id } = useParams();
  return (
    <ProtectedRoute>
      <div>
        <h2>Detalles de la Cita</h2>
        <p>ID de la cita: {id}</p>
      </div>
    </ProtectedRoute>
    
  );
}

export default CitaDetalle;