class Profile {
    constructor(user) {
        this.id = user.id;
        this.name = `${user.name} ${user.lastName}`;
        this.email = user.email;
        this.birthdate = user.birthdate || "No disponible"; 
        this.description = user.description || "Sin descripción";
    }

    getTemplate() {
        return `
        <section class="data-profile">
            <h2>${this.name}</h2>
            <p>Correo Electrónico: ${this.email}</p>
            <p>Fecha de Nacimiento: ${this.birthdate}</p>
            <p>Descripción: ${this.description}</p>
        </section>
        `;
    }
}

function renderUserProfile(profile) {
    const container = document.getElementById("profile_container");
    if (container) {
        container.innerHTML = profile.getTemplate();
    }

    // Llenar formulario con datos actuales del usuario
    const [name, lastname] = profile.name.split(" ");

    document.getElementById("user_name").value = name || "";
    document.getElementById("user_lastname").value = lastname || "";

    document.getElementById("user_email").value = profile.email || "";
    
    // Convertir la fecha de nacimiento al formato adecuado si está disponible
    document.getElementById("user_birthdate").value = profile.birthdate !== "No disponible" ? profile.birthdate.split(" ")[0] : ""; 

    document.getElementById("user_description").value = profile.description || "";
}

// Llamar a la función para obtener y mostrar el perfil
getProfile(
    (profile) => renderUserProfile(profile),
    (error) => console.error("Error al obtener el perfil del usuario:", error)
);

// Evento de actualización del perfil
document.querySelector("#edit_profile_modal form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const userId = localStorage.getItem("idUser"); // Obtener ID del usuario
    const updatedUser = {
        IdUser: userId,
        Name: document.getElementById("user_name").value,
        LastName: document.getElementById("user_lastname").value,
        Email: document.getElementById("user_email").value,
        Birthdate: document.getElementById("user_birthdate").value,
        Description: document.getElementById("user_description").value
    };

    updateUserProfile(updatedUser) // Llamamos a la función
        .then(result => {
            if (result.success) {
                alert(result.message);
                window.location.reload(); // Recargar la página para ver los cambios
            } else {
                document.getElementById("error_label").style.display = "block";
                document.getElementById("error_label").innerText = `* ${result.message}`;
            }
        })
        .catch(error => {
            console.error("Error al actualizar el perfil:", error);
        });
});
