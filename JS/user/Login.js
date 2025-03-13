
let formLogin = document.getElementById("form_login");

formLogin.addEventListener("submit", (evt) => {
    evt.preventDefault(); //para que no se ejecute

    let txtEmail = document.getElementById("txt_email_user");
    let txtPassword = document.getElementById("txt_password");

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
                localStorage.setItem("idUser", json.id)
                localStorage.setItem("nameUser", json.nameUser);
                window.location.href = "/movie-section.html";
            } else {
                // Si hay un error, muestra el mensaje en la etiqueta de error
                let errorLabel = document.getElementById("error_label");
                errorLabel.style.display = "block";
                errorLabel.innerText = `* ${json.Message}`;
            }
        });
})

