import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./form.css";

function Produto() {
  const { id } = useParams();
  const [nome, setNome] = useState(""); // Product name
  const [descricao, setDescricao] = useState(""); // Product description
  const [mensagem, setMensagem] = useState("");
  const [produtoId, setProdutoId] = useState(null);

  useEffect(() => {
    // Caso o ID esteja presente, busque os dados do dispositivo
    if (id) {
      fetch(`http://localhost:3001/produtos/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro ao carregar os dados do dispositivo.");
          }
        })
        .then((data) => {
          const dados = data.produto;
          setNome(dados.nome);
          setDescricao(dados.descricao);
        })
        .catch((error) => setMensagem(error.message));
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const method = id ? "PATCH" : "POST"; // Se id existir, use PATCH; caso contrário, POST
      const url = "http://localhost:3001/produtos";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          descricao: descricao,
          id: id,
        }),
      });

      if (response.ok) {
        const message = id
          ? "Produto atualizado com sucesso!"
          : "Produto adicionado com sucesso!";
        setMensagem(message);
        if (!id) {
          setNome("");
          setDescricao("");
        }
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao salvar o produto. " + errorData.message);
      }
    } catch (error) {
      setMensagem("Erro ao salvar o produto. " + error.message);
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
