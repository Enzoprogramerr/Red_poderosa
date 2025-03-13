//ARCHIVO paginationMovies.js
let currentPage = 1;  // Página actual
let totalPages = 1;   // Total de páginas

let currentOscarPage = 1;  // Página actual de Oscar
let totalOscarPages = 1;   // Total de páginas de Oscar

// Nueva función para obtener películas de Oscar con paginación - SOLO PARA OSCAR
function getOscarMoviesByPage(page) {
    const pageSize = 5;
    
    getMoviesOscar('oscar', page, pageSize, (movies, totalRecords) => {
        totalOscarPages = Math.ceil(totalRecords / pageSize);
        renderMoviesOscar(movies, 'best_oscar_container', page, totalOscarPages); // SOLO PARA OSCAR
        updateOscarPaginationButtons(page, totalOscarPages);
    }, (error) => {
        console.log('Error al obtener las películas de Oscar:', error);
    });
}


// Función para actualizar los botones de paginación en la sección de Oscar
function updateOscarPaginationButtons(page, totalOscarPages) {
    const prevOscarButton = document.getElementById('prev-oscar');
    const nextOscarButton = document.getElementById('next-oscar');

    prevOscarButton.disabled = (page <= 1);
    nextOscarButton.disabled = (page >= totalOscarPages);

    currentOscarPage = page;  // Actualizar la página actual de Oscar
}

// Evento para botón "Anterior" en la sección de Oscar
document.getElementById('prev-oscar').addEventListener('click', () => {
    if (currentOscarPage > 1) {
        getOscarMoviesByPage(currentOscarPage - 1);
    }
});

// Evento para botón "Siguiente" en la sección de Oscar
document.getElementById('next-oscar').addEventListener('click', () => {
    if (currentOscarPage < totalOscarPages) {
        getOscarMoviesByPage(currentOscarPage + 1);
    }
});

// Función para actualizar los botones de paginación
function updatePaginationButtons(page, totalPages) {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Habilitar/deshabilitar los botones según la página actual
    prevButton.disabled = (page <= 1);
    nextButton.disabled = (page >= totalPages);

    // Actualizar el estado de las páginas
    currentPage = page;
}

// Función para obtener las películas de acuerdo a la página - SOLO PARA MEJORES PELÍCULAS
function getMoviesByPage(page) {
    const genreCheckboxes = document.querySelectorAll('#category_best_reviewed input[type="checkbox"]:checked');
    const genre = genreCheckboxes.length > 0 ? Array.from(genreCheckboxes).map(cb => cb.value).join(',') : 'all';

    const pageSize = 5;

    getMovies(genre, page, pageSize, (movies, totalRecords) => {
        totalPages = Math.ceil(totalRecords / pageSize);
        renderMovies(movies, 'best_reviewed_container', page, totalPages); // SOLO PARA MEJORES PELÍCULAS
        updatePaginationButtons(page, totalPages);
    }, (error) => {
        console.log('Error al obtener las películas:', error);
    });
}

// Función para manejar el clic en el botón de 'Anterior'
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        getMoviesByPage(currentPage - 1);
    }
});

// Función para manejar el clic en el botón de 'Siguiente'
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        getMoviesByPage(currentPage + 1);
    }
});

// Evento para cambiar de filtros (checkboxes) - SOLO PARA MEJORES PELÍCULAS
document.querySelectorAll('#category_best_reviewed input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        getMoviesByPage(1);  // Regresar a la primera página con los filtros aplicados SOLO EN MEJORES PELÍCULAS
    });
});

// Llamada inicial para cargar la primera página
getMoviesByPage(currentPage);
// Cargar la primera página de películas premiadas al Oscar al inicio
getOscarMoviesByPage(currentOscarPage);
