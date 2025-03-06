class Movie {
    constructor(movie) {
        this.imageURL = movie.imageURL;
        this.description = movie.description;
        this.id = movie.id;
    }

    getTemplete = () => {
        return `
            <a href="movie.html?id=${this.id}">
                <img 
                    src="${this.imageURL}" 
                    alt="${this.description}">
            </a>
        `;
    }
}


