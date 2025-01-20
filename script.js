document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Aqui vamos capturar os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
        alert("Todos os campos são obrigatórios!");
        return; // Impede a execução do restante do código
    }

    // Coloca os dados na tabela
    const tabelaUsuarios = document.getElementById("tabelaUsuarios").getElementsByTagName("tbody")[0];
    const novaLinha = tabelaUsuarios.insertRow();

    const celulaNome = novaLinha.insertCell(0);
    const celulaEmail = novaLinha.insertCell(1);

    // Preenche as células com os dados
    celulaNome.textContent = nome;
    celulaEmail.textContent = email;

    // Limpar os campos do formulário
    document.getElementById("cadastroForm").reset();

    // Exibe uma mensagem de sucesso
    alert("Usuário cadastrado com sucesso!");
});
