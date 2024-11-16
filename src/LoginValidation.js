function Validation(values) {
  const errors = {};
  const passwordErrors = [];

  // Validação do email
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!values.email) {
    errors.email = "O email é obrigatório.";
  } else if (!emailRegex.test(values.email)) {
    errors.email =
      "O email deve conter um formato válido (exemplo@dominio.com).";
  }

  // Validação da senha
  if (!values.password) {
    errors.password = "A senha é obrigatória.";
  } else {
    // Verifica os critérios da senha
    if (values.password.length < 8) {
      passwordErrors.push("ter no mínimo 8 caracteres");
    }
    if (!/[a-z]/.test(values.password)) {
      passwordErrors.push("conter pelo menos uma letra minúscula");
    }
    if (!/[A-Z]/.test(values.password)) {
      passwordErrors.push("conter pelo menos uma letra maiúscula");
    }
    if (!/\d/.test(values.password)) {
      passwordErrors.push("conter pelo menos um número");
    }
    if (!/[@$!%*?&#]/.test(values.password)) {
      passwordErrors.push(
        "conter pelo menos um símbolo (@, $, !, %, *, ?, &, #)"
      );
    }

    // Combina os erros da senha em uma única mensagem
    if (passwordErrors.length > 0) {
      errors.password = `A senha deve ${passwordErrors.join(", ")}.`;
    }
  }

  return errors;
}

export default Validation;
