// Función para renderizar películas en el contenedor
function renderMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar contenido previo

    if (movies && Array.isArray(movies) && movies.length > 0) {
        movies.forEach(movie => {
            const movieLink = document.createElement('a');
            movieLink.href = `movie.html?title=${encodeURIComponent(movie.name)}`;

            const movieImage = document.createElement('img');
            movieImage.src = movie.imageUrl;
            movieImage.alt = movie.name;

            movieLink.appendChild(movieImage);
            container.appendChild(movieLink);
        });
    } else {
        container.innerHTML = '<p>No se encontraron películas.</p>';
    }
}

// Cargar todas las películas al inicio
getMoviesByGenre('all', (movies) => {
    renderMovies(movies, 'best_reviewed_container');
}, (error) => {
    console.log('Error al obtener las películas:', error);
});

// Evento para filtrar películas por género
document.getElementById('category_reviewed_container').addEventListener('change', (event) => {
    const selectedGenreId = event.target.value; // Obtener el ID del género seleccionado

    // Si se selecciona un género, filtrar por ID, sino traer todas
    getMoviesByGenre(selectedGenreId || 'all', (movies) => {
        renderMovies(movies, 'best_reviewed_container');
    }, (error) => {
        console.error("Error al filtrar películas:", error);
    });
});
