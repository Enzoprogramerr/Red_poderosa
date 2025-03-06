const bestMoviesContainer = document.getElementById("best_movies_container");
const bestReviewedContainer = document.getElementById("best_reviewed_container");
const oscarAwardWinningFilmsContainer = document.getElementById("oscar_award_winning_films_container");


const bestMovies = getBestMovies (); //llamo al get para que me traiga los objetos
const moviesReviewed = getBestReviewedMovies ();
const moviesOscarAwards = getOscarAwardWinningFilms ();

bestMoviesContainer.innerHTML = "";
bestReviewedContainer.innerHTML = "";
oscarAwardWinningFilmsContainer.innerHTML = "";

for(let movie of bestMovies){
    let classMovie = new Movie(movie); //creo la clase y la intancio
    bestMoviesContainer.innerHTML += classMovie.getTemplete();
}

for(let movie of moviesReviewed){
    let classMovie = new Movie(movie); //creo la clase y la intancio
    bestReviewedContainer.innerHTML += classMovie.getTemplete();
}

for(let movie of moviesOscarAwards){
    let classMovie = new Movie(movie); //creo la clase y la intancio
    oscarAwardWinningFilmsContainer.innerHTML += classMovie.getTemplete();
}