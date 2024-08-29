import React, { useState } from 'react';
import Navbar from './Navbar';

function Rastreio() {
    const [pedidoId, setPedidoId] = useState('');
    const [pedido, setPedido] = useState(null);
    const [mensagem, setMensagem] = useState('');

    const handleRastreio = async () => {
        try {
            const response = await fetch(`http://localhost:3001/pedido/${pedidoId}`);
            if (response.ok) {
                const data = await response.json();
                setPedido(data);
                setMensagem('');
            } else {
                setMensagem('Pedido não encontrado');
            }
        } catch (error) {
            setMensagem('Erro ao buscar o pedido. ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className='pedido-container'>
                <div className='pedido'>
                    <p className='fs-4'>Rastrear Pedido</p>
                    <p>ID do Pedido</p>
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="Digite o ID do pedido"
                        value={pedidoId}
                        onChange={(e) => setPedidoId(e.target.value)}
                        maxLength="6"
                    />
                    <button className="btn btn-warning w-100 mt-4" onClick={handleRastreio}>Rastrear</button>
                    <div className='mt-5'>
                        {mensagem && <p className="text-danger">{mensagem}</p>}
                        {pedido && (
                            <div>
                                <p><strong>ID do Pedido:</strong> {pedido.id_pedido}</p>
                                <p><strong>Status:</strong> {pedido.status}</p>
                                <p><strong>Endereço de Entrega:</strong> {pedido.endereco_entrega}</p>
                                <p><strong>Produtos:</strong> {pedido.produtos}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rastreio;
