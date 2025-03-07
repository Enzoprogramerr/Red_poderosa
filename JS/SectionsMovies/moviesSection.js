// Función para renderizar películas en el contenedor
function renderMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar el contenedor de películas antes de agregar nuevas

    if (movies && Array.isArray(movies) && movies.length > 0) { 
        movies.forEach(movie => {
            const movieLink = document.createElement('a'); 
            movieLink.href = `movie.html?title=${encodeURIComponent(movie.name)}`; // Enlace a la página de la película

            const movieImage = document.createElement('img');
            movieImage.src = movie.imageUrl; // Imagen de la película
            movieImage.alt = movie.name; // Texto alternativo para la imagen

            movieLink.appendChild(movieImage); // Añadir la imagen al enlace
            container.appendChild(movieLink); // Añadir el enlace al contenedor
        });
    } else {
        container.innerHTML = '<p>No se encontraron películas.</p>'; // Mensaje en caso de que no haya películas
    }
}

// Función para obtener películas filtradas por género o tipo de Oscar
function filterMoviesByGenre(containerId, genreType) {
    const selectedGenres = [];
    const checkboxes = document.querySelectorAll(`#${containerId} input[type="checkbox"]`);

    // Obtener todos los géneros seleccionados
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });

    // Si no se selecciona ningún género o tipo de Oscar, mostramos todas las películas de Oscar
    if (selectedGenres.length === 0 && genreType === 'oscar') {
        getOscarMovies((movies) => { 
            renderMovies(movies, 'best_oscar_container');
        }, (error) => {
            console.log("Error al obtener las películas de Oscar:", error);
        });
    } else {
        // Si se seleccionan géneros, filtramos por esos géneros
        selectedGenres.forEach(genreId => {
            getMoviesByGenre(genreId, (movies) => { 
                renderMovies(movies, genreType === 'oscar' ? 'best_oscar_container' : 'best_reviewed_container');
            }, (error) => {
                console.log("Error al obtener las películas filtradas:", error);
            });
        });
    }

    // Si no se selecciona ningún género y no estamos en 'oscar', mostramos todas las películas generales
    if (selectedGenres.length === 0 && genreType !== 'oscar') {
        getMoviesByGenre('all', (movies) => { 
            renderMovies(movies, genreType === 'oscar' ? 'best_oscar_container' : 'best_reviewed_container');
        }, (error) => {
            console.log("Error al obtener las películas:", error);
        });
    }
}

// Cargar todas las películas de Oscar al inicio
getOscarMovies((movies) => { 
    renderMovies(movies, 'best_oscar_container'); 
}, (error) => {
    console.log('Error al obtener las películas de Oscar:', error);
});

// Cargar todas las películas generales al inicio
getMoviesByGenre('all', (movies) => { 
    renderMovies(movies, 'best_reviewed_container'); 
}, (error) => {
    console.log('Error al obtener las películas:', error);
});

// Evento para filtrar películas por género en 'Mejores Películas'
document.getElementById('category_reviewed_container').addEventListener('change', () => {
    filterMoviesByGenre('category_reviewed_container', 'reviewed');
});

// Evento para filtrar películas por género en 'Películas Premidas Oscar'
document.getElementById('category_oscar_container').addEventListener('change', () => {
    filterMoviesByGenre('category_oscar_container', 'oscar');
});
