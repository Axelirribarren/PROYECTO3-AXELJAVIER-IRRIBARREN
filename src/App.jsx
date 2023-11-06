import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Historial from './pages/Historial';

function App() {
  const [cotizaciones, setCotizaciones] = useState([]); // Estado de cotizaciones

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home cotizaciones={cotizaciones} setCotizaciones={setCotizaciones} />}
          />
          <Route
            path="/Historial"
            element={<Historial cotizaciones={cotizaciones} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;