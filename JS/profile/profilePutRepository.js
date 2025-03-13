function updateUserProfile(updatedUser) {
    return fetch("http://localhost:5297/User", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            return {
                success: true,
                message: "Perfil actualizado con éxito"
            };
        } else {
            return {
                success: false,
                message: result.Message
            };
        }
    })
    .catch(error => {
        console.error("Error al actualizar el perfil:", error);
        return {
            success: false,
            message: "Error al actualizar el perfil. Intenta de nuevo más tarde."
        };
    });
}
