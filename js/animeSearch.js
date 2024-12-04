
window.addEventListener("DOMContentLoaded", () => {
    searchAnime("Zodiaco"); 
});

document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    searchAnime(query); 
});

// Función para buscar animes
async function searchAnime(query) {
    const resultsContainer = document.getElementById("results");

    // Limpia los resultados previos
    resultsContainer.innerHTML = "";

    if (!query) {
        resultsContainer.innerHTML = "<p class='text-danger'>Por favor, ingresa un término de búsqueda.</p>";
        return;
    }

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        const data = await response.json();

        if (data.data.length === 0) {
            resultsContainer.innerHTML = "<p class='text-warning'>No se encontraron resultados.</p>";
            return;
        }

        // Muestra los resultados
        data.data.forEach((anime) => {
            const animeCard = document.createElement("div");
            animeCard.classList.add("col-md-4", "anime-card");

            animeCard.innerHTML = `
            <div class="card">
                <img src="${anime.images.jpg.image_url}" class="card-img-top img-fluid" alt="${anime.title}" />
                <div class="card-body">
                    <h5 class="card-title">${anime.title}</h5>
                    <p class="card-text">${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sin descripción."}</p>
                    <a href="${anime.url}" target="_blank" class="btn btn-sm btn-info">Ver más</a>
                </div>
            </div>
        `;
        
            resultsContainer.appendChild(animeCard);
        });
    } catch (error) {
        resultsContainer.innerHTML = "<p class='text-danger'>Ocurrió un error al realizar la búsqueda.</p>";
        console.error(error);
    }
}
