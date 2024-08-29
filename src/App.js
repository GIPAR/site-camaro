import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/pedido" element={<Pedido />} />
                    <Route path="/rastreio" element={<Rastreio />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
