document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Captura os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
        alert("Todos os campos são obrigatórios!");
        return; // Impede a execução do restante do código
    }

    // Cria um objeto com os dados para enviar
    const dadosUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Envia os dados para a API (rota /cadastrar)
    fetch("http://localhost:5000/cadastrar", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Tipo de conteúdo
        },
        body: JSON.stringify(dadosUsuario) // Envia os dados como JSON
    })
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            if (data.mensagem) {
                // Se a resposta contiver a mensagem de sucesso
                alert(data.mensagem); // Exibe a mensagem de sucesso

                // Coloca os dados na tabela (no front-end)
                const tabelaUsuarios = document.getElementById("tabelaUsuarios").getElementsByTagName("tbody")[0];
                const novaLinha = tabelaUsuarios.insertRow();

                const celulaNome = novaLinha.insertCell(0);
                const celulaEmail = novaLinha.insertCell(1);

                // Preenche as células com os dados
                celulaNome.textContent = nome;
                celulaEmail.textContent = email;

                // Limpar os campos do formulário
                document.getElementById("cadastroForm").reset();
            } else if (data.erro) {
                // Se houver um erro, exibe a mensagem de erro
                alert(data.erro);
            }
        })
        .catch(error => {
            console.error("Erro:", error); // Exibe o erro no console
            alert("Ocorreu um erro ao cadastrar o usuário.");
        });
});
