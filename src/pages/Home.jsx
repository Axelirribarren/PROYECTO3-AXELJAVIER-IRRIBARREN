import React, { useState } from 'react';
import Compo from '../components/Elements';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home({ cotizaciones, setCotizaciones }) {
  const navigate = useNavigate();

  const handleGoToHistorial = () => {
    navigate('/Historial');
  };

  const agregarCotizacion = (cotizacion) => {
    const updatedCotizaciones = [...cotizaciones, cotizacion];
    setCotizaciones(updatedCotizaciones);
    localStorage.setItem('cotizaciones', JSON.stringify(updatedCotizaciones));
  };

  return (
    <div className="home-div">
      <button className="history-button" onClick={handleGoToHistorial}>
        Ver Historial
      </button>
      <Compo agregarCotizacion={agregarCotizacion} />
      <h1 className="main-title">Cotizador de Seguros de Hogar</h1>
      <p className='by-me'>Irribarren Axel</p>
    </div>
  );
}

export default Home;
