//ARCHIVO oscarsSectionsRepository.js
function getMoviesOscar(queryParamOscar, page, pageSize = 5, success, error) {
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 5;
    const urlOscar = `http://localhost:5297/Movie/MovieOscar?Query=${queryParamOscar}&page=${page}&pageSize=${pageSize}`;

    console.log("URL construida:", urlOscar);

    fetch(urlOscar)
        .then(response => response.json())
        .then(data => {
            if (data && data.movies) {
                totalOscarPages = Math.ceil(data.totalRecords / pageSize);
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


// Llamada para obtener todas las películas de Oscar
function getOscarMovies(genreId, page, pageSize = 5, success, error) {
    const queryParamOscar = genreId ? genreId : 'oscar';  // Si no hay género, usa 'oscar' para traer todas las películas
    getMoviesOscar(queryParamOscar, page, pageSize, success, error);
}