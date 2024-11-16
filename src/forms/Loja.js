import React, { useState } from "react";
import Navbar from "../Navbar";
import "./form.css";

function Loja() {
  const [nome, setNome] = useState(""); // Store name
  const [categoria, setCategoria] = useState(""); // Store category
  const [telefone, setTelefone] = useState(""); // Store phone number
  const [coordenadaX, setCoordenadaX] = useState(""); // X coordinate
  const [coordenadaY, setCoordenadaY] = useState(""); // Y coordinate
  const [mensagem, setMensagem] = useState("");
  const [lojaId, setLojaId] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/lojas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          categoria: categoria,
          telefone: telefone,
          posicao_x: coordenadaX,
          posicao_y: coordenadaY,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLojaId(data.lojaId);
        setMensagem("Loja adicionada com sucesso!");
        setNome("");
        setCategoria("");
        setTelefone("");
        setCoordenadaX("");
        setCoordenadaY("");
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao adicionar a loja. " + errorData.message);
      }
    } catch (error) {
      setMensagem(
        "Erro ao adicionar a loja. Tente novamente. " + error.message
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <p className="fs-4">Adicionar Loja</p>

          {/* Nome da Loja */}
          <p>Nome da Loja</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o nome da loja"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* Categoria da Loja */}
          {/* 
            // TODO: VERIFICAR CAMPOS
            // TODO: TROCAR TEXTO POR CAIXA DE SELECAO
          */}
          <p className="mt-4">Categoria da Loja</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite a categoria da loja"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />

          {/* Telefone da Loja */}
          <p className="mt-4">Telefone da Loja</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o telefone da loja"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          {/* Coordenada X */}
          <p className="mt-4">Coordenada X</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite a coordenada X"
            value={coordenadaX}
            onChange={(e) => setCoordenadaX(e.target.value)}
          />

          {/* Coordenada Y */}
          <p className="mt-4">Coordenada Y</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite a coordenada Y"
            value={coordenadaY}
            onChange={(e) => setCoordenadaY(e.target.value)}
          />

          {/* Submit Loja */}
          <button className="btn btn-warning w-100 mt-4" onClick={handleSubmit}>
            Adicionar Loja
          </button>

          {mensagem && <p className="mt-3">{mensagem}</p>}
          {lojaId && <p className="mt-3">ID da Loja: {lojaId}</p>}
        </div>
      </div>
    </>
  );
}

export default Loja;
