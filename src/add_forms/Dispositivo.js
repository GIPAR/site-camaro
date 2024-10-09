import React, { useState } from "react";
import Navbar from "../Navbar";
import "./add.css";

function Dispositivo() {
  const [nome, setNome] = useState(""); // Store name
  const [ip, setIP] = useState(""); // Store IP address
  const [permissaoAcesso, setPermissaoAcesso] = useState(""); // Store access permission
  const [tipo, setTipo] = useState(""); // Store device type
  const [mensagem, setMensagem] = useState("");
  const [dispositivoId, setDispositivoId] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/dispositivo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          ip: ip,
          permissao_acesso: permissaoAcesso,
          tipo: tipo,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDispositivoId(data.dispositivoId);
        setMensagem("Dispositivo adicionado com sucesso!");
        setNome("");
        setIP("");
        setPermissaoAcesso("");
        setTipo("");
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao adicionar o dispositivo. " + errorData.message);
      }
    } catch (error) {
      setMensagem(
        "Erro ao adicionar o dispositivo. Tente novamente. " + error.message
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <p className="fs-4">Adicionar Dispositivo</p>

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
            value={ip}
            onChange={(e) => setIP(e.target.value)}
          />

          {/* Permissão de Acesso */}
          {/* 
            // TODO: VERIFICAR CAMPOS
            // TODO: TROCAR TEXTO POR CAIXA DE SELECAO
          */}
          <p className="mt-4">Permissão de Acesso</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite a permissão de acesso"
            value={permissaoAcesso}
            onChange={(e) => setPermissaoAcesso(e.target.value)}
          />

          {/* Tipo do Dispositivo */}
          {/* 
            // TODO: VERIFICAR CAMPOS
            // TODO: TROCAR TEXTO POR CAIXA DE SELECAO
          */}
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
            Adicionar Dispositivo
          </button>

          {mensagem && <p className="mt-3">{mensagem}</p>}
          {dispositivoId && (
            <p className="mt-3">ID do Dispositivo: {dispositivoId}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dispositivo;
