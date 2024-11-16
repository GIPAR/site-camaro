import React, { useState } from "react";
import Navbar from "../Navbar";
import "./form.css";

function Produto() {
  const [nome, setNome] = useState(""); // Product name
  const [descricao, setDescricao] = useState(""); // Product description
  const [mensagem, setMensagem] = useState("");
  const [produtoId, setProdutoId] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          descricao: descricao,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProdutoId(data.produtoId);
        setMensagem("Produto adicionado com sucesso!");
        setNome("");
        setDescricao("");
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao adicionar o produto. " + errorData.message);
      }
    } catch (error) {
      setMensagem(
        "Erro ao adicionar o produto. Tente novamente. " + error.message
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <p className="fs-4">Adicionar Produto</p>

          {/* Nome do Produto */}
          <p>Nome do Produto</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* Descrição do Produto */}
          <p className="mt-4">Descrição do Produto</p>
          <textarea
            className="form-control form-control-sm"
            placeholder="Digite a descrição do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          {/* Submit Produto */}
          <button className="btn btn-warning w-100 mt-4" onClick={handleSubmit}>
            Adicionar Produto
          </button>

          {mensagem && <p className="mt-3">{mensagem}</p>}
          {produtoId && <p className="mt-3">ID do Produto: {produtoId}</p>}
        </div>
      </div>
    </>
  );
}

export default Produto;
