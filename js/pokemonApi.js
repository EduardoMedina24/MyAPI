const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

function getPokemon(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillPokemonData(json.results);
            handlePokemonPagination(json);
        })
        .catch((error) => {
            console.error("Error consumiendo la API de Pokémon", error);
        });
}

function fillPokemonData(results) {
    let cards = "";

    results.forEach((pokemon) => {
        // Para obtener más datos, hacemos otra solicitud a la URL específica del Pokémon
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((details) => {
                cards += `
                    <div class="col">
                        <div class="card h-100" style="width: 12rem;">
                            <img src="${details.sprites.front_default}" class="card-img-top" alt="Imagen de ${details.name}">
                            <h2 class="card-title">${details.name}</h2>
                            <div class="card-body">
                                <h5 class="card-title">Status: ${details.stats[0].base_stat} HP</h5>
                                <h5 class="card-title">Species: ${details.types.map((type) => type.type.name).join(", ")}</h5>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById("pokemonData").innerHTML = cards;
            });
    });
}

function handlePokemonPagination(json) {
    const prevDisabled = !json.previous ? "disabled" : "";
    const nextDisabled = !json.next ? "disabled" : "";

    const paginationHTML = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getPokemon('${json.previous}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getPokemon('${json.next}')">Next</a>
        </li>
    `;

    document.getElementById("pokemonPagination").innerHTML = paginationHTML;
}

// Inicializamos el consumo de la API
getPokemon(API_POKEMON);
