document.addEventListener("DOMContentLoaded", (event) => {
    const body = document.body;
    const btnDarkMode = document.getElementById("dark_mode");
    const btnDarkModeResponsive = document.getElementById("dark_mode_responsive");

    if (btnDarkMode || btnDarkModeResponsive) {
        // Función para manejar el cambio de modo oscuro
        const toggleDarkMode = () => {
            body.classList.toggle("dark");

            // Guardar el estado en localStorage
            if (body.classList.contains("dark")) {
                localStorage.setItem("dark-mode", "true");
            } else {
                localStorage.setItem("dark-mode", "false");
            }   
        };

        // Asignar la función a ambos botones    
        if (btnDarkMode) {
            btnDarkMode.addEventListener("click", toggleDarkMode);
        }
        if (btnDarkModeResponsive) {
            btnDarkModeResponsive.addEventListener("click", toggleDarkMode);
        }

        // Obtener el estado guardado en localStorage y aplicarlo
        if (localStorage.getItem("dark-mode") === "true") {
            body.classList.add("dark");
        } else {
            body.classList.remove("dark");
        }
    }
});
