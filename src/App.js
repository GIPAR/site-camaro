import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./autheContext";

import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
// import Rastreio from "./Rastreio";

import Pedido from "./forms/Pedido";
import Pedidos from "./tables/Pedidos";

import Produtos from "./tables/Produtos";
import Produto from "./forms/Produto";

import Lojas from "./tables/Lojas";
import Loja from "./forms/Loja";

import Dispositivos from "./tables/Dispositivos";
import Dispositivo from "./forms/Dispositivo";

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
          {/* Rota de Rastreio é desnecessária pelo uso do ChatBot */}
          {/* <Route path="/rastreio" element={<Rastreio />} /> */}

          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedido" element={<Pedido />} />

          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/produto/:id" element={<Produto />} />

          <Route path="/lojas" element={<Lojas />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/loja/:id" element={<Loja />} />

          <Route path="/dispositivos" element={<Dispositivos />} />
          <Route path="/dispositivo" element={<Dispositivo />} />
          <Route path="/dispositivo/:id" element={<Dispositivo />} />

          {/* Rota padrão, em caso de rota inexistente */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
