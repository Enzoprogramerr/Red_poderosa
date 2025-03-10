document.addEventListener("DOMContentLoaded", function() {
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
