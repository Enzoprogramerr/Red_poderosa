let signUp = document.getElementById("formulario");

signUp.addEventListener('submit', (event) => {
    event.preventDefault();

    let submitButton = document.getElementById("boton_registro");
    submitButton.disabled = true; //obtenemos el boton de envio y lo deshabilitamos

    let txtUserName = document.getElementById("user");
    let txtUserBirthdate = document.getElementById("date");
    let txtUserMail = document.getElementById("email");
    let txtUserPassword = document.getElementById("password");

    let pedido = {
        userName: txtUserName.value,
        birthdate: txtUserBirthdate.value,
        mail: txtUserMail.value,
        password: txtUserPassword.value
    };

    getLogin(pedido, (json) => {
        if (json.success) {
            window.location.href = "/index.html";
        } else {
            submitButton.disabled = false; //si hay un error, habilitamos el boton para otro intento 
            let errorLabel = document.getElementById("error_label");
            errorLabel.style.display = "block";
            errorLabel.innerText = `* ${json.message}`;
        }
    });
});