class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    askForPedidoId = () => {
      const message = this.createChatBotMessage("Por favor, insira o ID do pedido.");
      this.updateChatbotState(message);
    };
  
    handleDefault = () => {
      const message = this.createChatBotMessage("Desculpe, não entendi. Você pode fornecer o ID do pedido?");
      this.updateChatbotState(message);
    };
  
    updateChatbotState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  