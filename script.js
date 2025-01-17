document.getElementById("cadstroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Aqui vamos capturar os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Todos os campos são obrigatórios!");
    }
})