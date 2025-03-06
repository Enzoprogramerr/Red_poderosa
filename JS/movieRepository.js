// movieRepository.js

// Nueva función para obtener los detalles de la película por nombre
function getMovieByName(title, success, error) {
    fetch(`http://localhost:5297/Movie/byName?Title=${title}`, {
      method: 'GET',  // Solicitud GET para obtener los detalles de la película.
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((json) => success(json))  // Llamar a la función de éxito con los datos obtenidos
      .catch((e) => error(e));  // Llamar a la función de error si algo falla
  }
  