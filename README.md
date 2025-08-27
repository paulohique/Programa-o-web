# Exemplo de tela

![Exemplo de tela do formulário](./formulario-exemplo.png)
# Formulário de Cadastro de Usuário

Este projeto é um formulário web desenvolvido para fins didáticos, com foco em boas práticas de validação, feedback visual e experiência do usuário. Ele foi criado para a disciplina de Programação para Internet 2.

## Funcionalidades

- **Validação completa dos campos**: Todos os campos do formulário são validados conforme regras específicas, impedindo o envio caso haja erros.
- **Feedback visual**: Inputs válidos recebem destaque visual, enquanto campos inválidos mostram mensagens de erro claras ao lado do campo.
- **Foco no primeiro campo inválido**: Ao tentar cadastrar, o formulário foca automaticamente no primeiro campo com erro.
- **Cálculo automático do IR**: O campo de IR é preenchido automaticamente ao sair do campo "Dependentes", seguindo as regras de cálculo fornecidas.
- **Botão "olhinho"**: Os campos de senha e confirmação possuem botão para alternar entre mostrar e ocultar o valor digitado.
- **Mensagens de sucesso**: Ao cadastrar com sucesso, o usuário recebe uma mensagem de confirmação e o formulário é limpo.
- **Botão Limpar**: Limpa todos os campos, remove feedbacks visuais e reseta o campo IR para "0,00".

## Estrutura dos arquivos principais

- `index.html`: Estrutura do formulário e inclusão dos scripts e estilos.
- `css.css`: Estilos visuais, incluindo feedback de validação, layout e responsividade.
- `js.js`: Toda a lógica de validação, feedback, cálculo do IR e interatividade dos botões.

## Regras de validação

- **Nome Completo**: Obrigatório, mínimo de 3 caracteres.
- **CPF**: Obrigatório, formato 000.000.000-00.
- **Login**: Obrigatório, mínimo de 4 caracteres, apenas letras, números, ponto, underline e hífen.
- **E-mail**: Obrigatório, formato válido.
- **Senha**: Obrigatória, mínimo de 8 caracteres, pelo menos 1 letra e 1 número.
- **Confirmação de Senha**: Obrigatória, deve ser idêntica à senha.
- **Salário**: Obrigatório, valor numérico maior que zero.
- **Dependentes**: Obrigatório, inteiro maior ou igual a zero.
- **IR**: Calculado automaticamente, somente leitura.

## Como usar

1. Abra o arquivo `index.html` em um navegador.
2. Preencha todos os campos conforme as regras.
3. O botão "Cadastrar" só funcionará se todos os campos estiverem válidos.
4. Use o botão "Limpar" para resetar o formulário a qualquer momento.

## Observações

- O projeto utiliza apenas HTML, CSS e JavaScript puro, sem frameworks.
- O layout é responsivo e adaptado para diferentes tamanhos de tela.
- O código está comentado para facilitar o entendimento e manutenção.

---

Este projeto foi desenvolvido para fins educacionais.
