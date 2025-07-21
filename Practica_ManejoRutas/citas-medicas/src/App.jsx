import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <>

      <Routes>
        <Route 
        path="/" 
          element={
            <>
              <Navbar />
              <Home />
            </>
          } />
        <Route 
        path="/citas" 
        element={
            <>
              <Navbar />
              <Citas />
            </>
          } />
        <Route 
        path="/cita/:id" 
        element={
          <>
            <Navbar />
            <CitaDetalle />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
    
  );
}

export default App;