import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Historial from './pages/Historial';
import { QuotesProvider } from './context/QuotesContext';

function App() {
  return (
    <QuotesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </Router>
    </QuotesProvider>
  );
}

export default App;
