import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../autheContext";
import "./Crud.css";
import Navbar from "../Navbar";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3001/pedidos")
      .then((response) => response.json())
      .then((data) => {
        setPedidos(data.pedidos);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeletePedido = (id) => {
    fetch(`http://localhost:3001/pedidos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ id_pedido: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPedidos(pedidos.filter((pedido) => pedido.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleEditPedido = (id) => {
    navigate(`/pedidos/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className='table-header'>
          <h1>Pedidos</h1>
          <Link
            to="/pedido"
            className="btn btn-primary my-2"
          >
            Realizar Pedido
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Cliente</th>
              <th>Endereço de Entrega</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.nome_cliente}</td>
                <td>{pedido.endereco_entrega}</td>
                <td>{pedido.status}</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEditPedido(pedido.id)}
                  >
                    Visualizar
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeletePedido(pedido.id)}
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

export default Pedidos;
