import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './autheContext';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Pedido from './Pedido';
import Rastreio from './Rastreio';

function App() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            {/* Cria a rota padrão*/}
            <Route exact path="/" element={<Login />} />

            {/* Demais rotas*/}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pedido" element={<Pedido />} />
            <Route path="/rastreio" element={<Rastreio />} />

            {/* Rota padrão, em caso de rota inexistente */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    );
}

export default App;
