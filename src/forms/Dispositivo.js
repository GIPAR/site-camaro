import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./form.css";

function Dispositivo() {
  const { id } = useParams(); // Captura o ID da URL
  const [nome, setNome] = useState("");
  const [IP, setIP] = useState("");
  const [permissaoAcesso, setPermissaoAcesso] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Caso o ID esteja presente, busque os dados do dispositivo
    if (id) {
      fetch(`http://localhost:3001/dispositivos/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Erro ao carregar os dados do dispositivo.");
          }
        })
        .then((data) => {
          const dados = data.dispositivo;
          setNome(dados.nome);
          setIP(dados.IP);
          setPermissaoAcesso(dados.permissao_acesso);
          setTipo(dados.tipo);
        })
        .catch((error) => setMensagem(error.message));
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const method = id ? "PATCH" : "POST"; // Se id existir, use PATCH; caso contrário, POST
      const url = "http://localhost:3001/dispositivos";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          IP: IP,
          permissao_acesso: permissaoAcesso,
          tipo: tipo,
          id: id,
        }),
      });

      if (response.ok) {
        const message = id
          ? "Dispositivo atualizado com sucesso!"
          : "Dispositivo adicionado com sucesso!";
        setMensagem(message);
        if (!id) {
          setNome("");
          setIP("");
          setPermissaoAcesso("");
          setTipo("");
        }
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao salvar o dispositivo. " + errorData.message);
      }
    } catch (error) {
      setMensagem("Erro ao salvar o dispositivo. " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <p className="fs-4">
            {id ? "Editar Dispositivo" : "Adicionar Dispositivo"}
          </p>

          {/* Nome do Dispositivo */}
          <p>Nome do Dispositivo</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o nome do dispositivo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* IP do Dispositivo */}
          <p className="mt-4">IP do Dispositivo</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o endereço IP do dispositivo"
            value={IP}
            onChange={(e) => setIP(e.target.value)}
          />

          {/* Permissão de Acesso */}
          <p className="mt-4">Permissão de Acesso</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite a permissão de acesso"
            value={permissaoAcesso}
            onChange={(e) => setPermissaoAcesso(e.target.value)}
          />

          {/* Tipo do Dispositivo */}
          <p className="mt-4">Tipo do Dispositivo</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o tipo do dispositivo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          {/* Submit Dispositivo */}
          <button className="btn btn-warning w-100 mt-4" onClick={handleSubmit}>
            {id ? "Atualizar Dispositivo" : "Adicionar Dispositivo"}
          </button>

          {mensagem && <p className="mt-3">{mensagem}</p>}
        </div>
      </div>
    </>
  );
}

export default Dispositivo;
