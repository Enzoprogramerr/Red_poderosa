// Función para renderizar películas en el contenedor
function renderMovies(movies, containerId) { //recibe lista de películas que vamos a mostrar y recibe el ID del elemento HTML donde vamos a mostrar las películas.
    const container = document.getElementById(containerId);//Busca el elemento HTML con el ID que pasamos como parámetro (containerId) y lo guarda en la variable container.
    container.innerHTML = ''; // Borra el contenido previo dentro del contenedor.

    if (movies && Array.isArray(movies) && movies.length > 0) { // si existe peliculas, existe una lista de peliculas y no existe una lista vacia.
        movies.forEach(movie => { //Recorre todas las películas en la lista movies. forEach es un bucle que ejecuta la función para cada elemento en el array. Cada elemento individual se guarda en la variable movie.
            const movieLink = document.createElement('a'); // Crea un nuevo elemento HTML de tipo <a> (un enlace o link).
            movieLink.href = `movie.html?title=${encodeURIComponent(movie.name)}`;

            const movieImage = document.createElement('img');
            movieImage.src = movie.imageUrl;
            movieImage.alt = movie.name;

            movieLink.appendChild(movieImage); //Añade la imagen de la película dentro del enlace (haciendo que la imagen sea clickeable).
            container.appendChild(movieLink);
        });
    } else {
        container.innerHTML = '<p>No se encontraron películas.</p>';
        //else: Si no hay películas (es decir, la lista de movies está vacía o no es válida), el código dentro del else se ejecuta.
    }
}

// Cargar todas las películas al inicio
getMoviesByGenre('all', (movies) => { //Llama a la función getMoviesByGenre (que habías visto antes) con el parámetro 'all', lo que significa que queremos obtener todas las películas, sin filtrar por género.

    renderMovies(movies, 'best_reviewed_container'); //Esta es una función de callback que se ejecuta cuando las películas se han obtenido correctamente. Recibe las películas como parámetro y las pasa a la función renderMovies, indicando que deben mostrarse en el contenedor con el ID best_reviewed_container.
}, (error) => {
    console.log('Error al obtener las películas:', error);
});

// Evento para filtrar películas por género
document.getElementById('category_reviewed_container').addEventListener('change', (event) => { //Busca el elemento en la página con el ID category_reviewed_container, que probablemente es un select (menú desplegable) con los géneros de las películas.
    //Escucha el evento de cambio (cuando el usuario selecciona un nuevo género) en ese elemento y ejecuta la función proporcionada.
    const selectedGenreId = event.target.value; // Obtener el ID del género seleccionado

    // Si se selecciona un género, filtrar por ID, sino traer todas
    getMoviesByGenre(selectedGenreId || 'all', (movies) => { //Llama a la función getMoviesByGenre. Si el usuario seleccionó un género, se pasa ese género (selectedGenreId), pero si no se seleccionó nada, se pasa 'all' para mostrar todas las películas.
        renderMovies(movies, 'best_reviewed_container'); //Si las películas se obtienen correctamente, se pasan a la función renderMovies para mostrarlas en el contenedor con ID best_reviewed_container.
    }, (error) => {
        console.error("Error al filtrar películas:", error);
    });
});
