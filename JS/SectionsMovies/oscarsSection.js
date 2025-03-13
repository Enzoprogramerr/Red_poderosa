// Función para renderizar películas OSCAR en el contenedor específico
function renderMoviesOscar(movies, page = 1, totalOscarPages = 1) {
    const container = document.getElementById('best_oscar_container'); // Contenedor fijo
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas películas

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
    // Actualizar los botones de paginación
    updateOscarPaginationButtons(page, totalOscarPages);
}

// Función para obtener películas filtradas por género o tipo de Oscar
function filterMoviesByGenreOscar() {
    const selectedGenres = [];
    const checkboxes = document.querySelectorAll(`#category_oscar_container input[type="checkbox"]`);

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });

    const genreQueryOscar = selectedGenres.length > 0 ? selectedGenres.join(',') : 'oscar';
    console.log(`Filtrando por género:`, genreQueryOscar);

    // Llamar a la función para obtener y renderizar las películas de Oscar filtradas
    getOscarMovies(genreQueryOscar, 1, 5, (movies, totalOscarPages) => {
        renderMoviesOscar(movies, currentOscarPage, totalOscarPages);
    });
}

// Para la sección de Oscar - Aseguramos que solo afecta a la sección de Oscar
const categoryOscarContainer = document.getElementById('category_oscar_container');
if (categoryOscarContainer) {
    categoryOscarContainer.addEventListener('change', () => {
        filterMoviesByGenreOscar(); // Filtra solo en la sección de Oscar
    });
}
