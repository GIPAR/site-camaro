import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../autheContext";
import "./Crud.css";
import Navbar from "../Navbar";

function Dispositivos() {
  const [Dispositivos, setDispositivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3001/dispositivos")
      .then((response) => response.json())
      .then((data) => {
        setDispositivos(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteDispositivo = (id) => {
    fetch(`http://localhost:3001/dispositivo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setDispositivos(
          Dispositivos.filter((dispositivo) => dispositivo.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  const handleEditDispositivo = (id) => {
    navigate(`/dispositivo/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="table-header">
          <h1>Dispositivos</h1>
          <Link to="/dispositivo" className="btn btn-primary my-2">
            Adicionar Dispositivo
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do dispositivo</th>
              <th>Endereço IP</th>
              <th>Permissão de Acesso</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Dispositivos.map((dispositivo) => (
              <tr key={dispositivo.id}>
                <td>{dispositivo.id}</td>
                <td>{dispositivo.nome}</td>
                <td>{dispositivo.IP}</td>
                <td>{dispositivo.permissao_acesso}</td>
                <td>{dispositivo.tipo}</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEditDispositivo(dispositivo.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteDispositivo(dispositivo.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dispositivos;
