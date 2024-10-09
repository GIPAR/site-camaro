import React, { useState, useContext, useEffect, useCallback } from "react";
import Navbar from "../Navbar";
import "./add.css";
import { AuthContext } from "../autheContext";

function Pedido() {
  const [produtos, setProdutos] = useState([]); // This holds the selected products
  const [produtoSelecionado, setProdutoSelecionado] = useState(""); // This holds the selected product from the dropdown
  const [listaProdutos, setListaProdutos] = useState([]); // This holds the product list from the backend
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [pedidoId, setPedidoId] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const { user } = useContext(AuthContext);
  const [lojas, setLojas] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [lojaSelecionada, setLojaSelecionada] = useState("");
  const [dispositivoSelecionado, setDispositivoSelecionado] = useState("");

  useEffect(() => {
    // Fetch lojas, dispositivos e produtos disponíveis do backend
    fetch("http://localhost:3001/lojas")
      .then((res) => res.json())
      .then((data) => setLojas(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:3001/dispositivos")
      .then((res) => res.json())
      .then((data) => setDispositivos(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then((data) => setListaProdutos(data)) // Fetch the list of products
      .catch((err) => console.error(err));
  }, []);

  const handleAddProduto = () => {
    if (produtoSelecionado.trim()) {
      const produto = listaProdutos.find((p) => p.id == produtoSelecionado);

      if (produto) {
        setProdutos((produtos) => {
          // Check if the product already exists in the list
          const index = produtos.findIndex((p) => p.id == produto.id);
          if (index >= 0) {
            // If it exists, increase the quantity
            const updatedProdutos = [...produtos];
            updatedProdutos[index] = {
              ...updatedProdutos[index],
              quantidade: updatedProdutos[index].quantidade + 1,
            };
            return updatedProdutos;
          } else {
            // If it does not exist, add the product
            return [
              ...produtos,
              { nome: produto.nome, quantidade: 1, id: produto.id },
            ];
          }
        });
        setProdutoSelecionado("");
      }
    }
  };

  const handleRemoveProduto = (index) => {
    const novosProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(novosProdutos);
  };

  const handleIncreaseQuantity = useCallback(
    (index) => {
      setProdutos((produtos) => {
        const updatedProdutos = [...produtos];
        updatedProdutos[index] = {
          ...updatedProdutos[index],
          quantidade: updatedProdutos[index].quantidade + 1,
        };
        return updatedProdutos;
      });
    },
    [setProdutos]
  );

  const handleDecreaseQuantity = useCallback(
    (index) => {
      setProdutos((produtos) => {
        const updatedProdutos = [...produtos];
        if (updatedProdutos[index].quantidade > 1) {
          updatedProdutos[index] = {
            ...updatedProdutos[index],
            quantidade: updatedProdutos[index].quantidade - 1,
          };
        }
        return updatedProdutos;
      });
    },
    [setProdutos]
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: 1, //user.id_usuario
          id_loja: lojaSelecionada,
          id_dispositivo: dispositivoSelecionado,
          endereco_entrega: enderecoEntrega,
          produtos: produtos, // Submit the selected products with ids
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPedidoId(data.pedidoId);
        setMensagem("Pedido enviado com sucesso!");
        setProdutos([]);
        setLojaSelecionada("");
        setDispositivoSelecionado("");
        setEnderecoEntrega("");
      } else {
        const errorData = await response.json();
        setMensagem("Erro ao enviar o pedido. " + errorData.message);
      }
    } catch (error) {
      setMensagem("Erro ao enviar o pedido. Tente novamente. " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <p className="fs-4">Realizar Pedido</p>

          {/* Select Loja */}
          <p>Selecionar Loja</p>
          <select
            className="form-control form-control-sm"
            value={lojaSelecionada}
            onChange={(e) => setLojaSelecionada(e.target.value)}
          >
            <option value="">Selecione uma loja</option>
            {lojas.map((loja) => (
              <option key={loja.id} value={loja.id}>
                {loja.nome}
              </option>
            ))}
          </select>

          {/* Select Dispositivo */}
          <p className="mt-4">Selecionar Dispositivo</p>
          <select
            className="form-control form-control-sm"
            value={dispositivoSelecionado}
            onChange={(e) => setDispositivoSelecionado(e.target.value)}
          >
            <option value="">Selecione um dispositivo</option>
            {dispositivos.map((dispositivo) => (
              <option key={dispositivo.id} value={dispositivo.id}>
                {dispositivo.nome}
              </option>
            ))}
          </select>

          {/* Endereço de Entrega */}
          <p className="mt-4">Endereço de entrega</p>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Digite o endereço de entrega (Ex.: Bloco II, nº 34)"
            value={enderecoEntrega}
            onChange={(e) => setEnderecoEntrega(e.target.value)}
          />

          {/* Adicionar Produto */}
          <p className="mt-5">Selecionar Produto</p>
          <select
            className="form-control form-control-sm"
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {listaProdutos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
          <button
            className="btn btn-warning w-50 mt-2"
            onClick={handleAddProduto}
          >
            Adicionar
          </button>

          <ul className="mt-4">
            {produtos.map((produto, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center mt-3"
              >
                <div className="d-flex align-items-center">
                  <span className="mx-4">{produto.nome}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    -
                  </button>
                  <span className="mx-2">{produto.quantidade}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleRemoveProduto(index)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          {/* Submit Pedido */}
          <button className="btn btn-warning w-100 mt-2" onClick={handleSubmit}>
            Enviar Pedido
          </button>
          {mensagem && <p className="mt-3">{mensagem}</p>}
          {pedidoId && <p className="mt-3">ID do Pedido: {pedidoId}</p>}
        </div>
      </div>
    </>
  );
}

export default Pedido;
