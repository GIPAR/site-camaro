import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../autheContext";
import "./Crud.css";
import Navbar from "../Navbar";

function Produtos() {
  const [Produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then((response) => response.json())
      .then((data) => {
        setProdutos(data.produtos);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteProduto = (id) => {
    fetch(`http://localhost:3001/produtos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_produto: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutos(Produtos.filter((produto) => produto.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleEditProduto = (id) => {
    navigate(`/produto/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="table-header">
          <h1>Produtos</h1>
          <Link to="/produto" className="btn btn-primary my-2">
            Adicionar Produto
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da produto</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEditProduto(produto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteProduto(produto.id)}
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

export default Produtos;
