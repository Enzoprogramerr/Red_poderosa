// JS/moviesSectionsRepository.js
function getMovies(success, error) {
    fetch('http://localhost:5297/Movie/MovieGener?Query=all', {
        method: 'GET',  // Es una solicitud GET, no se necesita body.
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => {
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then((json) => success(json))  // Llamar a la función de éxito con los datos obtenidos
    .catch((e) => error(e));  // Llamar a la función de error si algo falla
}

