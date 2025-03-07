// Función para obtener películas por género o todas las películas
function getMoviesByGenre(genreId, success, error) { //getMoviesByGenre es una función de orden superior porque recibe funciones como parámetros y las ejecuta.
    const queryParam = genreId ? genreId : 'all';  // Si no hay género, usar 'all'
    const url = `http://localhost:5297/Movie/MovieGener?Query=${queryParam}`; //Esto envía una solicitud al servidor para obtener las películas del género con ID 3.

    //Es una forma de construir cadenas de texto (string) en JavaScript de manera más flexible. Se usa el acento grave (backtick) ` ` en lugar de comillas (' ' o " ").

    fetch(url)//fetch() es una función de Js para hacer solicitudes HTTP osea una peticion  HTTP a la URL del servidor
        .then(response => response.json()) //// Convertimos la respuesta en JSON
        .then(data => { //Cuando llamas a .then(), estás diciendo:
//"Cuando esta promesa se resuelva correctamente, ejecuta esta función."
            if (data && data.movies) { //significa: "Si data existe y si data.movies también existe". Si la respuesta (data) tiene una propiedad movies, llama a la función success(), pasando las películas.
                success(data.movies); // Llamamos al callback para renderizar las películas
            } else { //Si movies no existe, llama a error() con un mensaje de error.
                error("No se encontraron películas.");
            }
        })
        .catch(err => { //Si fetch() falla (problema de conexión o error del servidor), captura el error.
            console.error("Hubo un error al obtener las películas:", err);
            error(err); //Llama a error() para manejar el error en la interfaz.
        });
}

//.then(function(response) {  Esta es una función flecha que toma un argumento (response) y retorna el resultado de response.json().
//    return response.json();
//})

