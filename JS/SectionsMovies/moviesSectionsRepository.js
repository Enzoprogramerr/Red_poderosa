function getMovies(queryParam, page, pageSize = 5, success, error) {
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 5;
    const url = `http://localhost:5297/Movie/MovieGener?Query=${queryParam}&page=${page}&pageSize=${pageSize}`;

    console.log("URL construida:", url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.movies) {
                totalPages = Math.ceil(data.totalRecords / pageSize);
                if (typeof success === 'function') {
                    success(data.movies, data.totalRecords);  // Llamar a success
                } else {
                    console.error('La función success no está definida correctamente.');
                }
            } else {
                if (typeof error === 'function') {
                    error("No se encontraron películas.");
                } else {
                    console.error('La función error no está definida correctamente.');
                }
            }
        })
        .catch(err => {
            console.error("Hubo un error al obtener las películas:", err);
            if (typeof error === 'function') {
                error(err);
            }
        });
}

// Llamada para obtener películas por género
function getMoviesByGenre(genreId, success, error) {
    const queryParam = genreId ? genreId : 'all';  // Si no hay género, usar 'all'
    getMovies(queryParam, 1, 5, success, error); // Llamada a la función principal con el ID del género o 'all'.
}

