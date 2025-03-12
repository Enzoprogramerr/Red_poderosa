function cargarComentarios() {
    let title = localStorage.getItem("titleMovie"); 
    let page = 1;
    let pageSize = 6;
    fetch(`http://localhost:5297/Movie/CommentsMovie${title}?page=${page}&pageSize=${pageSize}`)
    .then(response => response.json())
    .then(data => {
        if (!data.success || data.data.length === 0) {
            document.getElementById("view-comment").style.display = "none";
            return;
        }

        data.data.forEach(comentario => {
            comentarioContainer.innerHTML += `
                <p><strong>${comentario.userName}</strong>: ${comentario.text}</p>
            `;
        });

        page++; // Aumentar la página para la próxima carga
    })
    .catch(error => console.error("Error cargando comentarios:", error));
}

// Evento para "Ver más comentarios"
document.getElementById("view-comment").addEventListener("click", function() {
    console.log("boton encontrado")
    var contenedor = document.getElementById("contenedor");
    if (contenedor.classList.contains("oculto")) {
      contenedor.classList.remove("oculto");
    } else {
      contenedor.classList.add("oculto");
    }
    const comentarioContainer = document.getElementById("contenedor");
    cargarComentarios(comentarioContainer);
});
