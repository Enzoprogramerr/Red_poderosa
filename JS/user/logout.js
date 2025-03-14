document.addEventListener("DOMContentLoaded", () => {
    let btnLogout = document.getElementById("logout-btn");

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            // Petición al backend para cerrar sesión
            fetch("http://localhost:5297/Login/LogOut", { // Ajusta la URL si es necesario
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.Success) {
                    // Eliminar datos del usuario del localStorage
                    console.log(localStorage.getItem("idUser"));  // Muestra el valor de idUser o null si no existe
                    localStorage.removeItem("idUser");
                    localStorage.removeItem("nameUser");
                    console.log(localStorage.getItem("nameUser")); 

                    // Redirigir a la página de inicio de sesión
                    window.location.href = "/index.html";
                } else {
                    alert("Error al cerrar sesión: " + json.Message);
                }
            })
            .catch(error => console.error("Error al cerrar sesión:", error));
        });
    } else {
        console.error("El botón de cerrar sesión no se encontró en el DOM.");
    }
});
