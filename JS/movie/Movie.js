import { searchMovie } from './Movie-Section.js';

class Movie {
    constructor(movie) {
        this.id = movie.id;
        this.title = movie.title;
        this.genre = movie.genre;
        this.description = movie.description;
        this.imageURL = movie.imageUrl;
        this.videoURL = movie.videoUrl;
        this.average = movie.averageQualify;
        this.hasOscar = movie.hasOscar;
        this.comments = Array.isArray(movie.Comments) ? movie.Comments : [];
    }

    getTemplate = () => {
        return `<div class="profile-film">
                    <article class="contain-port-pel">
                        <div id="movie-title-container">
                            <h1>${this.title}</h1>
                        </div>    
                        <section class="contain-film">
                            <img src="${this.imageURL}" loading="lazy" alt="${this.title}">
                            <div class="description-pel">
                                <p>${this.description}</p>
                            </div>
                        </section>
                    </article>
                    <section class="sec-pel">
                        <iframe src="${this.videoURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </section>
                    <section class="comment-calify">
                        <div class="rating-evaluation">
                            <input class="button-pel" type="submit" value="Agregar a mi lista">
                            <div class="rating">
                                <input type="radio" name="rate" id="rating-opt5" data-idx="0" value="5" hidden>
                                <label class="label-movie" for="rating-opt5"><span>Muy Bueno</span></label>
                                <input type="radio" name="rate" id="rating-opt4" data-idx="1" value="4" hidden>
                                <label class="label-movie" for="rating-opt4"><span>Bueno</span></label>
                                <input type="radio" name="rate" id="rating-opt3" data-idx="2" value="3" hidden>
                                <label class="label-movie" for="rating-opt3"><span>Normal</span></label>
                                <input type="radio" name="rate" id="rating-opt2" data-idx="3" value="2" hidden>
                                <label class="label-movie" for="rating-opt2"><span>Malo</span></label>
                                <input type="radio" name="rate" id="rating-opt1" data-idx="4" value="1" hidden>
                                <label class="label-movie" for="rating-opt1"><span>Muy Malo</span></label>
                            </div>
                        </div>
                        <div class="critique-form">
                            <section class="comments-film">
                                <div id="contenedor"></div>
                                <div id="container-critique">
                                    <h2 id="title-critique">AGREGAR CRITICA</h2>
                                </div>
                                <textarea id="commentMovie" class="text-film" type="text" placeholder="Ingresar texto"></textarea>
                                <input id="commentButton" class="button-critique" type="submit" value="Agregar">
                            </section>
                        </div>
                    </section>
                </div>`;
    }
}

function showMovie(movie) {
    let movieContainer = document.getElementsByClassName("profile-film")[0];
    if (!movieContainer) {
        console.error("El elemento 'profile-film' no se encontró.");
        return;
    }
    movieContainer.innerHTML = "";
    let m = new Movie(movie);
    let node = document.createElement('div');
    node.innerHTML = m.getTemplate();
    movieContainer.append(node);
    localStorage.setItem("idMovie", movie.id);
    localStorage.setItem("titleMovie", movie.title);
    cargarComentarios();
}

let page = 1;
const pageSize = 3;
async function cargarComentarios() {
    let url = new URLSearchParams(window.location.search);
    let title = url.get('title');
    try{
        const response = await fetch(`http://localhost:5297/Movie/CommentsMovie?Title=${title}&Page=${page}&PageSize=${pageSize}`)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("comentarios",data);
        let comentarioContainer = document.getElementById("contenedor");
        data.forEach(comentario => {
        comentarioContainer.innerHTML += `
            <section class="comment">
                <div class="user-film">
                    <a href="#"><img src="${comentario.avatarUser}" alt="foto de perfil del usuario"></a>
                    <a class="link-profile" href="user-profile.html?user=${comentario.userName}">${comentario.userName}</a>
                    <time datetime="${comentario.createdAt}">${new Date(comentario.createdAt).toLocaleString()}</time>
                </div>
                <div class="comment-film">
                    <p>${comentario.text}</p>
                </div>
            </section>
        `;
        });
        if (data.length > 0) { // Asegúrate de que hay más comentarios para mostrar
            comentarioContainer.innerHTML += `<button id="ver-mas-comentarios" type="button" class="arrow-button">Ver más comentarios</button>`;
            const btnVerMasComentarios = document.getElementById('ver-mas-comentarios');
            btnVerMasComentarios.onclick = function() {
                btnVerMasComentarios.remove(); 
                cargarComentarios();
            };
        page++; 
        }
    }
    catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

async function findSesion(){
    try{
        const response = await fetch(`http://localhost:5297/Login/LogOut`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success == false) {
            alert(`${data.message}`);
        }else{
            alert(`${data.message}`);
            window.location.href = `index.html`;
            
        }
    }
    catch (error) {
        console.error("Error fetching movie data:", error);
    };
}



document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');
    if (movieTitle) {
        await searchMovie(movieTitle);
    }
    const movieData = JSON.parse(localStorage.getItem('movieData'));
    showMovie(movieData);

    const commentButton = document.getElementById('commentButton');
    if (commentButton) {
        commentButton.addEventListener('click', () => {
            const commentInput = document.getElementById('commentMovie');
            const comment = commentInput ? commentInput.value : '';
            if (comment) {
                console.log('Comentario ingresado:', comment);
                let iDUser = localStorage.getItem("idUser");
                let iDMovie = localStorage.getItem("idMovie");
                let dataTime = new Date().toISOString();
                fetch("http://localhost:5297/api/Comment", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        idUser: iDUser,
                        idMovie: iDMovie,
                        text: comment,
                        createdAt: dataTime
                    })
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.success) {
                        cargarComentarios();
                        console.log(json.message);
                    } else {
                        console.log(json.message);
                    }
                })
                .catch((e) => {
                    console.error('Error:', e);
                });
                commentInput.value = '';
            } else {
                console.error('El campo de comentario está vacío');
            }
        });
    } else {
        console.error('El botón commentButton no existe en el DOM');
    }

    document.getElementById('find-sesion').onclick = function (){
        findSesion()
    };
   
    const ratingInputs = document.querySelectorAll('input[name="rate"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            const ratingValue = this.value;
            console.log("Puntuación seleccionada:", ratingValue);
            const iDUser = localStorage.getItem("idUser");
            const iDMovie = localStorage.getItem("idMovie");
            fetch("http://localhost:5297/Qualify",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: iDUser,
                    star: ratingValue,
                    movieId: iDMovie     
                })
            })
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    console.log(json.message);
                } else {
                    console.log(json.message);      
                }
            })
            .catch((e) => {
                console.error('Error:', e);
                error(e); 
            });
        });
    });
});
