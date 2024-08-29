function Validation(values) {
    let errors = {};
  
    // Validação do nome
    if (!values.name) {
      errors.name = "O nome é obrigatório.";
    }
  
    // Validação do ID: deve conter exatamente 6 dígitos
    const idRegex = /^\d{6}$/;
    if (!idRegex.test(values.id)) {
      errors.id = 'ID deve conter exatamente 6 números.';
    }
  
    // Inicializa a mensagem de erro da senha
    let passwordErrors = [];
  
    // Verifica se a senha tem pelo menos 8 caracteres
    if (values.password.length < 8) {
      passwordErrors.push('ter no mínimo 8 caracteres');
    }
  
    // Verifica se a senha tem pelo menos uma letra minúscula
    if (!/[a-z]/.test(values.password)) {
      passwordErrors.push('conter pelo menos uma letra minúscula');
    }
  
    // Verifica se a senha tem pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(values.password)) {
      passwordErrors.push('conter pelo menos uma letra maiúscula');
    }
  
    // Verifica se a senha tem pelo menos um dígito
    if (!/\d/.test(values.password)) {
      passwordErrors.push('conter pelo menos um número');
    }
  
    // Verifica se a senha tem pelo menos um símbolo
    if (!/[@$!%*?&#]/.test(values.password)) {
      passwordErrors.push('conter pelo menos um símbolo (@, $, !, %, *, ?, &, #)');
    }
  
    // Se houver erros, junta-os em uma mensagem única
    if (passwordErrors.length > 0) {
      errors.password = `Senha deve ${passwordErrors.join(', ')}.`;
    }
  
    // Verifica se as senhas correspondem
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'As senhas não correspondem.';
    }
  
    return errors;
  }
  
  export default Validation;
  