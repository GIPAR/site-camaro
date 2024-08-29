import React, { useState, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import "./Pedido.css";
import { AuthContext } from './autheContext';

function Pedido() {
    const [produtos, setProdutos] = useState([]);
    const [produtoAtual, setProdutoAtual] = useState("");
    const [nomeLoja, setNomeLoja] = useState("");
    const [telefoneLoja, setTelefoneLoja] = useState("");
    const [categoriaLoja, setCategoriaLoja] = useState("");
    const [enderecoEntrega, setEnderecoEntrega] = useState("");
    const [pedidoId, setPedidoId] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const { user } = useContext(AuthContext);
    const [lojas, setLojas] = useState([]);

    useEffect(() => {
        // Fetch lojas disponíveis do backend
        fetch('http://localhost:3001/lojas')
            .then(res => res.json())
            .then(data => setLojas(data))
            .catch(err => console.error(err));
    }, []);

    const handleAddProduto = () => {
        if (produtoAtual.trim()) {
            setProdutos([...produtos, { nome: produtoAtual, quantidade: 1 }]);
            setProdutoAtual("");
        }
    };

    const handleInputChange = (e) => {
        setProdutoAtual(e.target.value);
    };

    const handleRemoveProduto = (index) => {
        const novosProdutos = produtos.filter((_, i) => i !== index);
        setProdutos(novosProdutos);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_usuario: user.id_usuario,
                    nome_loja: nomeLoja,
                    telefone_loja: telefoneLoja,
                    categoria_loja: categoriaLoja,
                    endereco_entrega: enderecoEntrega,
                    produtos: produtos,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setPedidoId(data.pedidoId);
                setMensagem("Pedido enviado com sucesso!");
                setProdutos([]);
                setNomeLoja("");
                setTelefoneLoja("");
                setCategoriaLoja("");
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
            <div className='pedido-container'>
                <div className='pedido'>
                    <p className='fs-4'>Realizar Pedido</p>
                    <p>Nome da loja</p>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Digite o nome da loja"
                        value={nomeLoja}
                        onChange={(e) => setNomeLoja(e.target.value)}
                    />
                    <p className='mt-4'>Telefone da loja</p>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Digite o telefone da loja"
                        value={telefoneLoja}
                        onChange={(e) => setTelefoneLoja(e.target.value)}
                    />
                    <p className='mt-4'>Categoria da loja</p>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Digite a categoria da loja"
                        value={categoriaLoja}
                        onChange={(e) => setCategoriaLoja(e.target.value)}
                    />
                    <p className='mt-4'>Endereço de entrega</p>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Digite o endereço de entrega (Ex.: Bloco II, nº 34)"
                        value={enderecoEntrega}
                        onChange={(e) => setEnderecoEntrega(e.target.value)}
                    />
                    <p className='mt-5'>Adicionar Produto</p>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Digite o nome do produto"
                        value={produtoAtual}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-warning w-50 mt-2" onClick={handleAddProduto}>Adicionar</button>
                    <ul className='mt-4'>
                        {produtos.map((produto, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center mt-3">
                                {produto.nome}
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveProduto(index)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-warning w-100 mt-2" onClick={handleSubmit}>Enviar Pedido</button>
                    {mensagem && <p className="mt-3">{mensagem}</p>}
                    {pedidoId && <p className="mt-3">ID do Pedido: {pedidoId}</p>}
                </div>
            </div>
        </>
    );
}

export default Pedido;
