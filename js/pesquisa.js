const API_KEY = "7609de3d";

async function buscarFilme() {

    const termo = document.getElementById("pesquisa").value.trim();
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    document.getElementById("loading").style.display = "block";

    if (termo === "") {

        resultado.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    Digite o nome de um filme ou série.
                </div>
            </div>
        `;

        return;

    }

    try {

        const resposta = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(termo)}`);

        const dados = await resposta.json();

        console.log(dados);

        if (dados.Response === "False") {

            document.getElementById("loading").style.display = "none";

            resultado.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        Filme ou série não encontrado.
                    </div>
                </div>
            `;

            return;

        }

        document.getElementById("loading").style.display = "none";

        dados.Search.slice(0, 12).forEach(filme => {

            resultado.innerHTML += `

            <div class="col-md-4 mb-4">

                <div class="card movie-card h-100">

                    <img src="${filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/300x450?text=Sem+Imagem"}">

                    <div class="card-body">

                        <h5>${filme.Title}</h5>

                        <p>Ano: ${filme.Year}</p>

                        <p><strong>IMDb:</strong> ${filme.imdbID}</p>

                        <p>Tipo: ${filme.Type}</p>

                        <button
                            class="btn btn-primary w-100"
                            onclick="verDetalhes('${filme.imdbID}')">

                            Ver detalhes

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    } catch (erro) {

        resultado.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Erro ao conectar com a API.
                </div>
            </div>
        `;

        console.error(erro);

    }

}


function verDetalhes(id) {

    localStorage.setItem("imdbID", id);

    window.location.href = "detalhes.html";

}


document.getElementById("pesquisa").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        buscarFilme();

    }

});