document.getElementById("cadstroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Aqui vamos capturar os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Todos os campos são obrigatórios!");
    }

    // Coloca os dados na tabela
    const tabelaUsuarios = document.getElementById("tabeUsuarios").getElementsByTagName("tbody")[0];
    const novaLinha = tabelaUsuarios.insertRow();

    const celulaNome = novaLinha.insertCell(0);
    const celulaEmail = novaLinha = novaLinha.insertCell(1)

    celulaNome.textContent = nome;
    celulaEmail.textContent = email;
})