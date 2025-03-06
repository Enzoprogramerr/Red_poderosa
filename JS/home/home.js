class Post {
    constructor(home) {
        this.imageURL = movie.imageURL;
        this.description = movie.description;
        this.id = movie.id;
    }

    getTemplete = () => {
        return `
            <label for="publication">Escribe tu publicación:</label>
            <textarea id="publication" name="publication" rows="5" cols="90" label="" placeholder="Crea una publicacion..."></textarea>
            <input type="submit" value="Publicar">
        `;
    }
}


