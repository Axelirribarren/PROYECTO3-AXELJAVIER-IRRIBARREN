import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuotes } from '../context/QuotesContext';
import Swal from 'sweetalert2';
import '../styles/history.css';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    cursor: pointer;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    &:hover { background: #0056b3; }
    &.delete { background: #dc3545; &:hover { background: #c82333; } }
`;

function Historial() {
  const { quotes, clearQuotes } = useQuotes();
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleBorrarDatos = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará todos los datos de cotizaciones.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        clearQuotes();
        Swal.fire('Datos eliminados', 'El historial ha sido vaciado.', 'success');
      }
    });
  };

  return (
    <Container className='main-flex'>
      <h1>Historial de Cotizaciones</h1>
      <div className='main-history'>
        {quotes.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '20px' }}>No hay cotizaciones guardadas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Propiedad</th>
                <th>Ubicación</th>
                <th>Ciudad</th>
                <th>Seguridad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((cotizacion, index) => (
                <tr key={index}>
                  <td>{cotizacion.fecha}</td>
                  <td>{cotizacion.tipoPropiedad}</td>
                  <td>{cotizacion.ubicacion}</td>
                  <td>{cotizacion.ciudad}</td>
                  <td>{cotizacion.seguridad}</td>
                  <td style={{ fontWeight: 'bold' }}>{`$${cotizacion.precioEstimado.toLocaleString()}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='button-div'>
        <Button onClick={handleGoToHome}>Volver al Inicio</Button>
        {quotes.length > 0 && (
          <Button className="delete" onClick={handleBorrarDatos}>Borrar Historial</Button>
        )}
      </div>
    </Container>
  );
}

export default Historial;