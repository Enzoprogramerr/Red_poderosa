import { searchMovie } from './Movie-Section.js';

class Comment {
    constructor(comment) {
        this.avatar = comment.avatarUser;
        this.idUser = comment.idUser;
        this.userName = comment.userName;
        this.text = comment.text;
        this.date = comment.createdAt;
    }

    getTemplate() {
        return `<section class="comment oculto">
                    <div class="user-film">
                        <a href="#"><img src="${this.avatar}" alt="foto de perfil del usuario"></a>
                        <a class="link-profile" href="#">user-profile.html?user=${this.userName}</a>
                    </div>
                    <div class="comment-film">
                        <p>${this.text}</p>
                    </div>
                </section>`;
    }
}

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
        let commentsHTML = '';

        for (let comment of this.comments) {
            let c = new Comment(comment);
            commentsHTML += c.getTemplate();
        }

        return `<div class="profile-film">
                    <article class="contain-port-pel">
                        <h1>${this.title}</h1>
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
                                <div class="view-plus">
                                    <button id="view-comment" class="view-button">Ver comentarios</button>
                                </div>
                                <div id="contenedor">${commentsHTML}</div>
                                <h2 id="title-critique">AGREGAR CRITICA</h2>
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
}

/*window.onload = () => {
    const comments = document.querySelectorAll('.comment');
    console.log(comments)
    comments.forEach(comment => {
        comment.classList.add('oculto');
    });
};*/
//TODO- VER SI LOS COMMENTARIOS LOS ESTOY OBTENIENDO
document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');
    if (movieTitle) {
        await searchMovie(movieTitle);
    }
    const movieData = JSON.parse(localStorage.getItem('movieData'));
    showMovie(movieData);

    // Manejador de eventos para el botón "Ver comentarios"
    const viewComment = document.getElementById('view-comment');
    console.log("contenedor",viewComment)
    if (viewComment) {
        viewComment.addEventListener('click', () => {
            const comments = document.querySelectorAll('.comment.oculto, .comment:not(.oculto)');
            comments.forEach(comment => {
                comment.classList.toggle('oculto');
            });
            if (viewComment.textContent === "Ver más") {
                viewComment.textContent = "Ver menos";
            } else {
                viewComment.textContent = "Ver más";
            }
        });
    }

    // Manejador de eventos para el botón "Agregar comentario"
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
});
