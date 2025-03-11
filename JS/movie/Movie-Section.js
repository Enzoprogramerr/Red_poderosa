export async function searchMovieRedirection(movieName) {
    try {
        const response = await fetch(`http://localhost:5297/Movie/byName?Title=${encodeURIComponent(movieName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Movie data:", data);
        let info = data.title
        if(info.title == movieName)
        localStorage.setItem('movieData', JSON.stringify(data));
        localStorage.setItem('idMovie', data.id);

        window.location.href = `movie.html?title=${encodeURIComponent(movieName)}`;

    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

export async function searchMovie(movieName) {
    try {
        const response = await fetch(`http://localhost:5297/Movie/byName?Title=${encodeURIComponent(movieName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Movie data:", data);
        localStorage.setItem('movieData', JSON.stringify(data));
        localStorage.setItem('idMovie', data.id);
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchBox = document.getElementById("search-box");

    searchButton.addEventListener("click", function() {
        const movieName = searchBox.value;
        if (movieName) {
            searchMovieRedirection(movieName);
        } else {
            alert("Por favor, ingresa el nombre de una película.");
        }
    });

    searchBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Se presionó la tecla Enter.");
            searchButton.click();
        }
    });
});
