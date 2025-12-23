import React from 'react';
import QuoteForm from '../components/feature/QuoteForm';
import '../styles/home.css';

function Home() {
  return (
    <div className="home-div">
      <h1 className="main-title">Cotizador de Seguros de Hogar</h1>
      <QuoteForm />
      <p className='by-me'>Irribarren Axel</p>
    </div>
  );
}

export default Home;
