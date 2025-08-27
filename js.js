
// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form.container');

  // Função para alternar a visualização da senha
  function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }

  // Adiciona evento ao botão "olhinho" das senhas
  const btnSenha = document.getElementById('togglepassword');
  if (btnSenha) btnSenha.addEventListener('click', function () { togglePassword('senha', 'iconSenha'); });
  const btnConfSenha = document.getElementById('toggleconfpassword');
  if (btnConfSenha) btnConfSenha.addEventListener('click', function () { togglePassword('conf_senha', 'iconConfSenha'); });

  // Cálculo automático do IR ao sair do campo dependentes
  const dependentesInput = document.getElementById('dependentes');
  if (dependentesInput) {
    dependentesInput.addEventListener('blur', function () {
      const salario = Number(document.getElementById('salario').value);
      const dependentes = Number(document.getElementById('dependentes').value);
      let base = salario - (dependentes * 200);
      if (isNaN(base) || base < 0) base = 0;
      let aliquota = 0;
      // Faixas de IR
      if (base > 4500) {
        aliquota = 0.225;
      } else if (base > 3000) {
        aliquota = 0.15;
      } else if (base > 2000) {
        aliquota = 0.075;
      } else {
        aliquota = 0;
      }
      let ir = base * aliquota;
      document.getElementById('ir').value = ir.toFixed(2);
    });
  }

  // Função para mostrar mensagem ao lado do campo
  function setFeedback(input, message, ok = false) {
    let feedback = input.parentNode.querySelector('.feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'feedback';
      input.parentNode.appendChild(feedback);
    }
    feedback.textContent = message || '';
    feedback.classList.remove('ok', 'err');
    if (ok) feedback.classList.add('ok');
    else if (message) feedback.classList.add('err');
  }

  // Limpa mensagens e classes visuais
  function clearFeedbacks() {
    form.querySelectorAll('.feedback').forEach(fb => fb.textContent = '');
    form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
  }

  // Valida todos os campos do formulário
  function validateForm(focusFirst = false) {
    clearFeedbacks();
    let valid = true;
    let firstInvalid = null;

    // Validação de cada campo
    const nome = document.getElementById('name');
    if (!nome.value || nome.value.trim().length < 3) {
      setFeedback(nome, 'Obrigatório, mínimo de 3 caracteres.');
      nome.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = nome;
    } else {
      setFeedback(nome, '', true);
      nome.classList.add('is-valid');
    }

    const cpf = document.getElementById('cpf');
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf.value || !cpfRegex.test(cpf.value)) {
      setFeedback(cpf, 'Obrigatório, formato 000.000.000-00.');
      cpf.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = cpf;
    } else {
      setFeedback(cpf, '', true);
      cpf.classList.add('is-valid');
    }

    const login = document.getElementById('login');
    const loginRegex = /^[A-Za-z0-9._-]{4,}$/;
    if (!login.value || !loginRegex.test(login.value)) {
      setFeedback(login, 'Obrigatório, mínimo 4 caracteres, apenas letras, números, ., _, -.');
      login.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = login;
    } else {
      setFeedback(login, '', true);
      login.classList.add('is-valid');
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.value || !emailRegex.test(email.value)) {
      setFeedback(email, 'Obrigatório, formato válido.');
      email.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = email;
    } else {
      setFeedback(email, '', true);
      email.classList.add('is-valid');
    }

    const senha = document.getElementById('senha');
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!senha.value || !senhaRegex.test(senha.value)) {
      setFeedback(senha, 'Obrigatória, mínimo 8 caracteres, pelo menos 1 letra e 1 número.');
      senha.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = senha;
    } else {
      setFeedback(senha, '', true);
      senha.classList.add('is-valid');
    }

    const confSenha = document.getElementById('conf_senha');
    if (!confSenha.value || confSenha.value !== senha.value) {
      setFeedback(confSenha, 'Obrigatória e igual à senha.');
      confSenha.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = confSenha;
    } else {
      setFeedback(confSenha, '', true);
      confSenha.classList.add('is-valid');
    }

    const salario = document.getElementById('salario');
    if (!salario.value || isNaN(salario.value) || Number(salario.value) <= 0) {
      setFeedback(salario, 'Obrigatório, valor numérico maior que zero.');
      salario.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = salario;
    } else {
      setFeedback(salario, '', true);
      salario.classList.add('is-valid');
    }

    const dependentes = document.getElementById('dependentes');
    if (!dependentes.value || isNaN(dependentes.value) || !Number.isInteger(Number(dependentes.value)) || Number(dependentes.value) < 0) {
      setFeedback(dependentes, 'Obrigatório, inteiro maior ou igual a zero.');
      dependentes.classList.add('is-invalid');
      valid = false;
      if (!firstInvalid) firstInvalid = dependentes;
    } else {
      setFeedback(dependentes, '', true);
      dependentes.classList.add('is-valid');
    }

    // Foca no primeiro campo inválido, se houver
    if (!valid && focusFirst && firstInvalid) {
      firstInvalid.focus();
    }
    return valid;
  }

  // Evento de submit customizado
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede envio padrão
    if (validateForm(true)) {
      alert('Usuário cadastrado com sucesso');
      form.reset(); // Limpa o formulário
      clearFeedbacks(); // Limpa feedbacks visuais
      document.getElementById('ir').value = '0.00'; // Reseta IR
    }
  });

  // Botão Limpar customizado
  const btnReset = form.querySelector('button[type="reset"]');
  if (btnReset) {
    btnReset.addEventListener('click', function (e) {
      setTimeout(() => {
        clearFeedbacks();
        document.getElementById('ir').value = '0.00';
      }, 10);
    });
  }
});
// Validação de formulário simples para index.html

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form.container');

  // Visualização da senha
  function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
  const btnSenha = document.getElementById('togglepassword');
  if (btnSenha) btnSenha.addEventListener('click', function () { togglePassword('senha', 'iconSenha'); });
  const btnConfSenha = document.getElementById('toggleconfpassword');
  if (btnConfSenha) btnConfSenha.addEventListener('click', function () { togglePassword('conf_senha', 'iconConfSenha'); });

  // Cálculo automático do IR 
  const dependentesInput = document.getElementById('dependentes');
  if (dependentesInput) {
      dependentesInput.addEventListener('blur', function () {
        const salario = Number(document.getElementById('salario').value);
        const dependentes = Number(document.getElementById('dependentes').value);
        let base = salario - (dependentes * 200);
        if (isNaN(base) || base < 0) base = 0;
        let aliquota = 0;
        if (base > 4500) {
          aliquota = 0.225;
        } else if (base > 3000) {
          aliquota = 0.15;
        } else if (base > 2000) {
          aliquota = 0.075;
        } else {
          aliquota = 0;
        }
        let ir = base * aliquota;
        document.getElementById('ir').value = ir.toFixed(2);
    });
  }

  form.addEventListener('submit', function (e) {
    let valid = true;
    let messages = [];

    // Nome Completo
    const nome = document.getElementById('name');
    if (!nome.value || nome.value.trim().length < 3) {
      valid = false;
      messages.push('Nome Completo: obrigatório, mínimo de 3 caracteres.');
    }

    // CPF
    const cpf = document.getElementById('cpf');
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf.value || !cpfRegex.test(cpf.value)) {
      valid = false;
      messages.push('CPF: obrigatório, formato 000.000.000-00.');
    }

    // Login
    const login = document.getElementById('login');
    const loginRegex = /^[A-Za-z0-9._-]{4,}$/;
    if (!login.value || !loginRegex.test(login.value)) {
      valid = false;
      messages.push('Login: obrigatório, mínimo 4 caracteres, apenas letras, números, ., _, -.');
    }

    // E-mail
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.value || !emailRegex.test(email.value)) {
      valid = false;
      messages.push('E-mail: obrigatório, formato válido.');
    }

    // Senha
    const senha = document.getElementById('senha');
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!senha.value || !senhaRegex.test(senha.value)) {
      valid = false;
      messages.push('Senha: obrigatória, mínimo 8 caracteres, pelo menos 1 letra e 1 número.');
    }

    // Confirmação de Senha
    const confSenha = document.getElementById('conf_senha');
    if (!confSenha.value || confSenha.value !== senha.value) {
      valid = false;
      messages.push('Confirmação de Senha: obrigatória e igual à senha.');
    }

    // Salário
    const salario = document.getElementById('salario');
    if (!salario.value || isNaN(salario.value) || Number(salario.value) <= 0) {
      valid = false;
      messages.push('Salário: obrigatório, valor numérico maior que zero.');
    }

    // Dependentes
    const dependentes = document.getElementById('dependentes');
    if (!dependentes.value || isNaN(dependentes.value) || !Number.isInteger(Number(dependentes.value)) || Number(dependentes.value) < 0) {
      valid = false;
      messages.push('Dependentes: obrigatório, inteiro maior ou igual a zero.');
    }

    if (!valid) {
      e.preventDefault();
      alert(messages.join('\n'));
    }
  });
});
