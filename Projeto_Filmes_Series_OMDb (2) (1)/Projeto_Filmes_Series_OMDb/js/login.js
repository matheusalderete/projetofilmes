const usuarioCorreto = "admin";
const senhaCorreta = "1234";

const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (usuario === "" || senha === "") {

        mensagem.innerHTML = `
            <div class="alert alert-warning">
                Preencha todos os campos.
            </div>
        `;

        return;
    }

    if (usuario === usuarioCorreto && senha === senhaCorreta) {

        mensagem.innerHTML = `
            <div class="alert alert-success">
                Login realizado com sucesso!
            </div>
        `;

        localStorage.setItem("logado", "true");
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1000);

    } else {

        mensagem.innerHTML = `
            <div class="alert alert-danger">
                Login inválido
            </div>
        `;

    }

});