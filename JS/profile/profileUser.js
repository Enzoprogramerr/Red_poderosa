let editProfileModal = document.getElementById("edit_profile_modal");

editProfileModal.addEventListener("submit", (event) => {
    event.preventDefault();

    let userId = localStorage.getItem("userId"); // Asegúrate de obtenerlo correctamente
    let userName = document.getElementById("user_name").value;
    let userLastname = document.getElementById("user_lastname").value;
    let userBirthdate = document.getElementById("user_birthdate").value;
    let userEmail = document.getElementById("user_email").value;
    let userDescription = document.getElementById("user_description").value;

   // Convertimos la fecha a ISO 8601 o la dejamos como null si está vacía
    const formattedBirthdate = userBirthdate ? new Date(userBirthdate).toISOString() : null;


    if (!userId) {
        alert("Error: No se encontró el ID de usuario.");
        return;
    }

    let pedido = {
        IdUser: parseInt(userId),  // 🔹 Agregar IdUser obligatorio
        Name: userName,
        LastName: userLastname,
        Birthdate: formattedBirthdate,
        Description: userDescription,
        Email: userEmail,
    };


    getPutProfile(pedido, (json) => {
        if (json.success) {
            window.location.href = "/profile.html";
        } else {
            let errorLabel = document.getElementById("error_label");
            if (errorLabel) {
                errorLabel.style.display = "block";
                errorLabel.innerText = `* ${json.message}`;
            }
        }
    });
});


