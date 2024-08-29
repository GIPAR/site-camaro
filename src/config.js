import { createChatBotMessage } from "react-chatbotify";
import Rastreio from "./Rastreio"; // Ajuste o caminho conforme necessário

const config = {
  botName: "PedidoBot",
  initialMessages: [createChatBotMessage("Olá! Qual é o ID do pedido que você gostaria de rastrear?")],
  customComponents: {
    header: () => <div style={{ backgroundColor: '#4A90E2', padding: '10px', borderRadius: '3px' }}>Rastreio de Pedido</div>,
  },
  widgets: [
    {
      widgetName: "rastreioPedido",
      widgetFunc: (props) => <Rastreio {...props} />,
    },
  ],
};

export default config;
