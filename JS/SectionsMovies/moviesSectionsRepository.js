// Función para obtener películas por género o todas las películas (incluyendo Oscar)
function getMovies(queryParam, success, error) { // Cambié el nombre de 'genreId' a 'queryParam' para ser más flexible.
    const url = `http://localhost:5297/Movie/MovieGener?Query=${queryParam}`; // URL con el query dinámico.

    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            if (data && data.movies) {
                success(data.movies); // Llamamos al callback para renderizar las películas
            } else {
                error("No se encontraron películas.");
            }
        })
        .catch(err => {
            console.error("Hubo un error al obtener las películas:", err);
            error(err);
        });
}

// Llamada para obtener todas las películas de Oscar
function getOscarMovies(success, error) {
    getMovies('oscar', success, error); // Llamada a la función principal con 'oscar' como query.
}

// Llamada para obtener películas por género
function getMoviesByGenre(genreId, success, error) {
    const queryParam = genreId ? genreId : 'all';  // Si no hay género, usar 'all'
    getMovies(queryParam, success, error); // Llamada a la función principal con el ID del género o 'all'.
}

