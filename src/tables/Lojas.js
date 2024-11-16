import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../autheContext";
import "./Crud.css";
import Navbar from "../Navbar";

function Lojas() {
  const [Lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3001/lojas")
      .then((response) => response.json())
      .then((data) => {
        setLojas(data.lojas);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteLoja = (id) => {
    fetch(`http://localhost:3001/lojas`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_loja: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLojas(Lojas.filter((loja) => loja.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleEditLoja = (id) => {
    navigate(`/lojas/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="table-header">
          <h1>Lojas</h1>
          <Link to="/loja" className="btn btn-primary my-2">
            Cadastrar Loja
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Loja</th>
              <th>Categoria</th>
              <th>Telefone</th>
              <th>Coordenadas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Lojas.map((loja) => (
              <tr key={loja.id}>
                <td>{loja.id}</td>
                <td>{loja.nome}</td>
                <td>{loja.categoria}</td>
                <td>{loja.telefone}</td>
                <td>({`${loja.posicao_x}, ${loja.posicao_y}`})</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEditLoja(loja.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteLoja(loja.id)}
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

export default Lojas;
