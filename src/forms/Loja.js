import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./form.css";

function Loja() {
  const { id } = useParams();
  const [nome, setNome] = useState(""); // Store name
  const [categoria, setCategoria] = useState(""); // Store category
  const [telefone, setTelefone] = useState(""); // Store phone number
  const [coordenadaX, setCoordenadaX] = useState(""); // X coordinate
  const [coordenadaY, setCoordenadaY] = useState(""); // Y coordinate
  const [mensagem, setMensagem] = useState("");
  const [lojaId, setLojaId] = useState(null);

  // UseEffect para buscar dados da loja, caso o ID seja fornecido
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/lojas/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro ao carregar os dados da loja.");
          }
        })
        .then((data) => {
          const dados = data.loja;
          setNome(dados.nome);
          setCategoria(dados.categoria);
          setTelefone(dados.telefone);
          setCoordenadaX(dados.posicao_x);
          setCoordenadaY(dados.posicao_y);
        })
        .catch((error) => setMensagem(error.message));
    }
  }, [id]);

  // Função de Submit para criar ou atualizar loja
  const handleSubmit = async () => {
    const method = id ? "PATCH" : "POST"; // Se houver id, é uma edição (PATCH); caso contrário, é uma nova loja (POST)
    const url = "http://localhost:3001/lojas";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          categoria: categoria,
          telefone: telefone,
          posicao_x: coordenadaX,
          posicao_y: coordenadaY,
          id: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLojaId(data.lojaId || id); // Use o ID retornado ou o fornecido na URL
        setMensagem(
          id ? "Loja atualizada com sucesso!" : "Loja adicionada com sucesso!"
        );
        // Limpar campos se for nova loja
        if (!id) {
          setNome("");
          setCategoria("");
          setTelefone("");
          setCoordenadaX("");
          setCoordenadaY("");
        }
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao salvar a loja. " + errorData.message);
      }
    } catch (error) {
      setMensagem("Erro ao salvar a loja. Tente novamente. " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <p className="fs-4">{id ? "Editar Loja" : "Adicionar Loja"}</p>

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
            {id ? "Atualizar Loja" : "Adicionar Loja"}
          </button>

          {mensagem && <p className="mt-3">{mensagem}</p>}
          {lojaId && <p className="mt-3">ID da Loja: {lojaId}</p>}
        </div>
      </div>
    </>
  );
}

export default Loja;
