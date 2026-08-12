const API_KEY = "7609de3d";


async function carregarDetalhes() {

    const imdbID = localStorage.getItem("imdbID");

    if (!imdbID) {

        alert("Nenhum filme selecionado.");

        window.location.href = "pesquisa.html";

        return;

    }

    try {

        const resposta = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);

        const filme = await resposta.json();

        if (filme.Response === "False") {

            alert("Erro ao carregar o filme.");

            window.location.href = "pesquisa.html";

            return;

        }

        document.getElementById("poster").src =
            filme.Poster !== "N/A"
                ? filme.Poster
                : "https://via.placeholder.com/300x450?text=Sem+Imagem";

        document.getElementById("titulo").textContent = filme.Title;
        document.getElementById("ano").textContent = filme.Year;
        document.getElementById("genero").textContent = filme.Genre;
        document.getElementById("diretor").textContent = filme.Director;
        document.getElementById("atores").textContent = filme.Actors;
        document.getElementById("duracao").textContent = filme.Runtime;
        document.getElementById("idioma").textContent = filme.Language;
        document.getElementById("pais").textContent = filme.Country;
        document.getElementById("nota").textContent = filme.imdbRating;
        document.getElementById("classificacao").textContent = filme.Rated;
        document.getElementById("lancamento").textContent = filme.Released;
        document.getElementById("bilheteria").textContent = filme.BoxOffice;
        document.getElementById("sinopse").textContent = filme.Plot;

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com a API.");

    }

}


carregarDetalhes();