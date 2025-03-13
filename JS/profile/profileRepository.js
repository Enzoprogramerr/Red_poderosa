function getProfile(success, error) {
    const userId = localStorage.getItem("idUser");

    fetch(`http://localhost:5297/User/GetUser?UserId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then((json) => {
        if (json.success) {
            // Crear una instancia de ProfileUser con los datos recibidos
            const userProfile = new Profile({
                id: json.id,
                name: json.nameUser,
                lastName: json.lastnameUser,
                email: json.emailUser,
                birthdate: json.birthdate, // Asegúrate de que el backend devuelve este campo
                description: json.descriptionUser
            });
            success(userProfile);
        } else {
            throw new Error(json.message || "Error al obtener el usuario");
        }
    })
    .catch((e) => error(e));
}
