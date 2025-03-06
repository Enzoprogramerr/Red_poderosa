// Función para obtener películas por género o todas las películas
function getMoviesByGenre(genreId, success, error) {
    const queryParam = genreId ? genreId : 'all';  // Si no hay género, usar 'all'
    const url = `http://localhost:5297/Movie/MovieGener?Query=${queryParam}`;

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

