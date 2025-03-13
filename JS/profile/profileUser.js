class ProfileUser {
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

// Renderizar el perfil en el DOM
function renderUserProfile(profile) {
    const container = document.getElementById("profile_user_container");
    if (container) {
        container.innerHTML = profile.getTemplate();
    }
}

// Llamar a la función para obtener y mostrar el perfil
getUserProfile(
    (profile) => renderUserProfile(profile),
    (error) => console.error("Error al obtener el perfil del usuario:", error)
);
