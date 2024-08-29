import React, { useState } from "react";
import ChatBot from "react-chatbotify";


const MyChatBot = () => {
  const [pedidoDetails, setPedidoDetails] = useState(null);

  const options = {
    theme: {
      primaryColor: "#f4c542", // Cor primária
      secondaryColor: "#f4c542", // Cor secundária
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", // Fonte
      showHeader: true,
      showFooter: true,
      showInputRow: true,
      embedded: true,
    },
    header: {
      title: "Assistente Virtual Mall Delivery",
      showAvatar: true,
      avatar: "https://example.com/avatar.png", // URL da imagem do avatar
    },
    footer: {
      text: "Estamos aqui para ajudar!",
    },
    botBubble: {
      animate: true,
      showAvatar: true,
      avatar: "https://example.com/bot-avatar.png", // URL da imagem do avatar do bot
      simStream: true,
      streamSpeed: 50,
    },
    userBubble: {
      animate: true,
      showAvatar: false,
    },
    chatInput: {
      disabled: false,
      enabledPlaceholderText: "Digite sua mensagem...",
      disabledPlaceholderText: "Chat desativado",
      showCharacterCount: true,
      characterLimit: 200,
      sendButtonIcon: "https://example.com/send-icon.png", // URL da imagem do ícone de envio
    },
  };

  const flow = {
    start: {
      message: "Olá! Qual é o ID do pedido que você gostaria de rastrear?",
      path: "getPedidoDetails"
    },
    getPedidoDetails: {
      message: async (params) => {
        const pedidoId = params.userInput;
        try {
          const response = await fetch(`http://localhost:3001/pedido/${pedidoId}`);
          if (response.ok) {
            const data = await response.json();
            setPedidoDetails(data);
            return `Pedido encontrado!\n\nID: ${data.id_pedido}\nStatus: ${data.status}\nEndereço: ${data.endereco_entrega}\nProdutos: ${data.produtos}`;
          } else {
            return "Pedido não encontrado. Por favor, verifique o ID e tente novamente.";
          }
        } catch (error) {
          return `Erro ao buscar o pedido: ${error.message}`;
        }
      },
      path: "end"
    },
    end: {
      message: "Se precisar de mais alguma coisa, estou aqui para ajudar!",
      path: "start"
    }
  };

  return (
    <ChatBot options={options} flow={flow} />
  );
};

export default MyChatBot;
