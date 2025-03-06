// movie.js

// Obtener el nombre de la película desde la URL
const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get('title'); // El título de la película será pasado como parámetro en la URL

// Obtener los elementos donde se mostrará la información
const movieTitleElement = document.querySelector('h1');
const movieImageElement = document.querySelector('img');
const movieDescriptionElement = document.querySelector('.description_pel p');

// Llamamos a la función del repository para obtener los detalles de la película
getMovieByName(movieTitle, (movie) => {
  // Asignamos los datos obtenidos a los elementos del DOM
  movieTitleElement.textContent = movie.title;  // Título de la película
  movieImageElement.src = movie.imageUrl;      // Imagen de la película
  movieImageElement.alt = movie.title;          // Alt de la imagen
  movieDescriptionElement.textContent = movie.description || 'No hay descripción disponible.'; // Descripción
}, (error) => {
  console.error('Error al obtener los detalles de la película:', error);
});
