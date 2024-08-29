class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("pedido")) {
        this.actionProvider.askForPedidoId();
      } else {
        this.actionProvider.handleDefault();
      }
    }
  }
  
  export default MessageParser;
  