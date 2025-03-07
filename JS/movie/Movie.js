class Comment{
    constructor(comment)
    {
        this.id = comment.IdComment;
        this.text = comment.Text;
        this.userImg = comment.AvatarUser;
        this.userId = comment.IdUser;
        this.userName = comment.UserName;
        this.createdAt = comment.CreatedAt;
    }

    getTemplate(){
        return `<section class="comments-film">
                        <div class="view-plus">
                            <button class="view-button" onclick="">Ver más comentarios</button>
                        </div>
                        <div class="user-film">
                            <a href="#"><img src="${this.userImg}" alt="foto de perfil del usuario"></a>
                            <a class="link-profile" href="#">${this.userName}</a>
                        </div>
                        <div class="comment-film">
                            <p>${this.text}</p>
                        </div>
                    </section>`
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
        this.hasOscar = movie.hasOscar
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
                    <img src="${this.imageURL}" alt="">
                    <div class="description-pel">
                        <p>
                        ${this.description}
                        </p>
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
                        <input type="radio" name="rate" id="rating-opt5" data-idx="0" hidden>
                        <label class="label-movie" for="rating-opt5"><span>Muy Bueno</span></label>

                        <input type="radio" name="rate" id="rating-opt4" data-idx="1" hidden>
                        <label class="label-movie" for="rating-opt4"><span>Bueno</span></label>

                        <input type="radio" name="rate" id="rating-opt3" data-idx="2" hidden>
                        <label class="label-movie" for="rating-opt3"><span>Normal</span></label>

                        <input type="radio" name="rate" id="rating-opt2" data-idx="3" hidden>
                        <label class="label-movie" for="rating-opt2"><span>Malo</span></label>

                        <input type="radio" name="rate" id="rating-opt1" data-idx="4" hidden>
                        <label class="label-movie" for="rating-opt1"><span>Muy Malo</span></label>
                    </div>
                </div>
                <div class="critique-form">
                    <section class="comments-film">
                        <p>${this.comments}</p>
                    </section>
                    <div class="critique-user">
                        <h2>AGREGAR CRITICA</h2>
                        <textarea id="commentMovie" class="text-film" type="text" placeholder="Ingresar texto"></textarea>
                        <input id="commentButton" class="button-critique" type="submit" value="Agregar">
                    </div>
                </div>
            </section>
        </div>`
    }
}

function showMovie(movie){
    let movieContainer = document.getElementsByClassName("profile-film")[0];
    if (!movieContainer) {
        console.error("El elemento 'profile-film' no se encontró.");
        return;}
    console.log(movieContainer)
    movieContainer.innerHTML = "";
    console.log(movie);
    console.log(movie.comments);
    let m = new Movie(movie);
    let node = document.createElement('div');
    node.innerHTML = m.getTemplate();
    movieContainer.append(node);
    }



document.addEventListener("DOMContentLoaded", function() {
    const movieData = JSON.parse(localStorage.getItem('movieData'));
    if (movieData) {
        showMovie(movieData);
    } else {
        console.error("No se encontraron datos de la película en localStorage.");
    } 
});

/*let placeholder = document.getElementById("commentButton");
placeholder.addEventListener("click", function(event){
    event.preventDefault();*/
document.addEventListener('DOMContentLoaded', (event) => {
    const commentButton = document.getElementById('commentButton');

    if (commentButton) {
        commentButton.addEventListener('click', () => {
            const commentInput = document.getElementById('commentMovie');
            const comment = commentInput ? commentInput.value : '';

            if (comment) {
                console.log('Comentario ingresado:', comment);
                let idUser = localStorage.getItem("idUser");
                let idMovie = localStorage.getItem("idMovie");
                let dataTime = new Date().toISOString()
                fetch("http://localhost:5297/api/Comment",{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        idUser: idUser,
                        idMovie: idMovie,
                        text: comment,
                        createdAt:  dataTime      
                    })
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.success) {
                        console.log('Éxito:', json.message);
                        success(json.message); 
                    } else {
                        console.error('Error:', json.message);
                        error(json.message); 
                    }
                })
                .catch((e) => {
                    console.error('Error:', e);
                    error(e); // Manejar errores de red u otros errores
                });
                // Aquí puedes procesar el comentario, por ejemplo, agregarlo a una lista de comentarios.
                
                // Ejemplo: Mostrar el comentario en algún elemento del DOM
                /*const commentsSection = document.getElementById('commentsSection');
                if (commentsSection) {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = comment;
                    commentsSection.appendChild(commentElement);
                }*/
                
                // Limpia el campo de entrada después de enviar el comentario.
                commentInput.value = '';
            } else {
                console.error('El campo de comentario está vacío');
            }
        });
    } else {
        console.error('El botón commentButton no existe en el DOM');
    }
});
    
