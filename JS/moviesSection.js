// JS/moviesSection.js
// Llamada a getMovies para obtener las películas
getMovies((data) => {
    // Verificar si la respuesta tiene un arreglo de películas
    if (data.movies && Array.isArray(data.movies)) {
        const movies = data.movies;  // Aquí obtenemos el array de películas

        // Obtenemos el contenedor de la sección de mejores películas
        const bestMovieSection = document.getElementById('movies');

        // Limpiamos la sección antes de agregar las películas
        bestMovieSection.innerHTML = '';

        // Iteramos sobre las películas y las agregamos al HTML
        movies.forEach(movie => {
            // Creamos un enlace para cada película
            const movieLink = document.createElement('a');
            movieLink.href = movieLink.href = `movie.html?title=${encodeURIComponent(movie.name)}`; // Enlace a la página de la película con el nombre como parámetro

            // Creamos una imagen para la película
            const movieImage = document.createElement('img');
            movieImage.src = movie.imageUrl; // URL de la imagen
            movieImage.alt = movie.name; // Nombre de la película como alt de la imagen

            // Añadimos la imagen al enlace
            movieLink.appendChild(movieImage);

            // Añadimos el enlace a la sección de mejores películas
            bestMovieSection.appendChild(movieLink);
        });
    } else {
        console.error("No se encontraron películas en la respuesta.");
    }
}, (error) => {
    console.log('Error al obtener las películas:', error);
});
