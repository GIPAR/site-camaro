import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function Qrgenerator() {
    const [id, setId] = useState('');
    const [generate, setGenerate] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        // Permite apenas números e limita a 6 dígitos
        if (value === '' || (/^\d{1,6}$/).test(value)) {
            setId(value);
            setGenerate(false); // Reseta o estado de geração do QR Code
        }
    };

    const handleGenerate = () => {
        if (id.length === 6) {
            setGenerate(true);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="w-25 mb-2"> {/* Ajuste a largura conforme necessário */}
        <p>Insira o ID do destinatário</p>
            <input
                className="form-control form-control-sm" // Classe para um input pequeno
                type="text"
                placeholder="Digite o ID"
                value={id}
                onChange={handleChange}
                maxLength="6"
            />
        </div>
        <div className="w-25 mb-5"> {/* Ajuste a largura conforme necessário */}
            <button className="btn btn-warning w-100" onClick={handleGenerate}>Gerar QR Code</button>
        </div>
        {generate && (
    <div className="mt-5"> {/* Margem superior para separar do botão */}
        <QRCode value={id} size={256} /> {/* Aumente o valor de size conforme necessário */}
    </div>
)}

    </div>
    


    
    );
}

export default Qrgenerator;
