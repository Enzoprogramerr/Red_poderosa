// Seleccionamos el formulario de inicio de sesión
let loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Previene el envío del formulario

    // obtengo los valores de los campos del formulario
    let txtEmail = document.getElementById("txt_email");
    let txtPassword = document.getElementById("txt_password");
    
    // Se crea un objeto 'pedido' con los datos de inicio de sesión
    let pedido = {
        EmailUser: txtEmail.value,
        PasswordUser: txtPassword.value
    };

    // Llamo a getLogin para enviar los datos y manejar la respuesta
    getLogin(pedido, 
        (json) => {
            console.log(json);
            if(json.success) {
                // Si el inicio de sesión es exitoso, redirige al usuario
                window.location.href = "/movie-section.html";
            } else {
                // Si hay un error, muestra el mensaje en la etiqueta de error
                let errorLabel = document.getElementById("error_label");
                errorLabel.style.display = "block";
                errorLabel.innerText = `* ${json.message}`;
            }
        });
});






/*
// Validación básica para asegurarse de que los campos no estén vacíos
if (email.trim() === "" || password.trim() === "") {
    alert("Por favor, completa todos los campos.");
    return;
}

// Simulación de autenticación
if (email === "usuario@redpoderosa.com" && password === "contraseña123") {
    alert("¡Bienvenido a Red Poderosa!");
    // Redirigir al usuario a la página principal o al feed
    window.location.href = "inicio.html";
} else {
    alert("Correo o contraseña incorrectos.");
}*/