// Función para renderizar películas en el contenedor fijo 'best_reviewed_container'
function renderMovies(movies, page = 1, totalPages = 1) {
    const container = document.getElementById('best_reviewed_container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas películas

    if (movies && Array.isArray(movies) && movies.length > 0) { 
        movies.forEach(movie => {
            const movieLink = document.createElement('a'); 
            movieLink.href = `movie.html?title=${encodeURIComponent(movie.name)}`; // Enlace a la página de la película
            movieLink.className = 'movie-link';
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
    // Actualizar los botones de paginación
    updatePaginationButtons(page, totalPages);
}

// Función para obtener películas filtradas por género
function filterMoviesByGenre(genreType) {
    const selectedGenres = [];
    const checkboxes = document.querySelectorAll(`#category_reviewed_container input[type="checkbox"]`);

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });

    const genreQuery = selectedGenres.length > 0 ? selectedGenres.join(',') : 'all';
    console.log(`Filtrando ${genreType} por género:`, genreQuery);

    // Llamar a la función para obtener y renderizar las películas filtradas
    getMoviesByGenre(genreQuery, (movies, totalPages) => {
        renderMovies(movies, currentPage, totalPages);
    });
}

// Para la sección de películas generales
const categoryContainer = document.getElementById('category_reviewed_container');
if (categoryContainer) {
    categoryContainer.addEventListener('change', () => {
        filterMoviesByGenre('general');
    });
}
