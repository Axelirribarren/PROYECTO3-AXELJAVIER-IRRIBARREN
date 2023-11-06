import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/history.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function Historial() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const handleGoToHome = () => {
    navigate('/');
  };
  

  useEffect(() => {
    const storedCotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    console.log('cotizaciones cargadas: ', storedCotizaciones);
    setCotizaciones(storedCotizaciones);
  }, []);
  

  function agregarCotizacion(cotizacion) {
    const updatedCotizaciones = [...cotizaciones, cotizacion];
    setCotizaciones(updatedCotizaciones);
  
    localStorage.setItem('cotizaciones', JSON.stringify(updatedCotizaciones));
  }


  function handleBorrarDatos() {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará todos los datos de cotizaciones.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('cotizaciones');
        setCotizaciones([]);
        Swal.fire('Datos eliminados', 'Todos los datos de cotizaciones han sido eliminados.', 'success');
        window.location.reload();
      }
    });
  }

  return (
    
    <div className='main-flex'>
    <h1>Historial de Cotizaciones</h1>
    <div className='main-history'>
      
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Ciudad</th>
            <th>Seguridad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cotizacion, index) => (
            <tr key={index}>
              <td>{cotizacion.fecha}</td>
              <td>{cotizacion.tipoPropiedad}</td>
              <td>{cotizacion.ubicacion}</td>
              <td>{cotizacion.ciudad}</td>
              <td>{cotizacion.seguridad}</td>
              <td>{`$${cotizacion.precioEstimado.toLocaleString()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <div className='button-div'>
        <button onClick={handleGoToHome}>Volver Atras</button>
        <button onClick={handleBorrarDatos}>Borrar Datos</button>
    </div>
    
    </div>
  );
}

export default Historial;