let signUp = document.getElementById("form_register");

signUp.addEventListener("submit", (event) => {
    event.preventDefault();

    let userName = document.getElementById("user_name").value;
    let userLastname = document.getElementById("user_lastname").value;
    let userBirthdate = document.getElementById("user_birthdate").value;
    let userDescription = document.getElementById("user_description").value;
    let userMail = document.getElementById("user_email").value;
    let userPassword = document.getElementById("user_password").value;


   // Convertimos la fecha a ISO 8601 o la dejamos como null si está vacía
    const formattedBirthdate = userBirthdate ? new Date(userBirthdate).toISOString() : null;


    let pedido = {
        Name: userName,
        LastName: userLastname,
        Birthdate: formattedBirthdate,
        Description: userDescription,
        Email: userMail,
        Password: userPassword
    };


    // getRegister(pedido, (json) => {
    //     if (json.success) {
    //         alert("Registro exitoso. ¡Bienvenido/a!");
    //         window.location.href = "/index.html";
    //     } else {
    //         let errorLabel = document.getElementById("error_label");
    //         errorLabel.style.display = "block";
    //         errorLabel.innerText = `* ${json.message}`;
    //     }
    // });

    getRegister(pedido, (json) => {
        if (json.success) {
            Swal.fire({
                title: "Registro exitoso",
                text: "¡Bienvenido!",
                icon: "success",
                confirmButtonText: "Aceptar"
            }).then(() => {
                window.location.href = "/index.html";
            });
        } else {
            let errorLabel = document.getElementById("error_label");
            errorLabel.style.display = "block";
            errorLabel.innerText = `* ${json.message}`;
        }
    });
    

});


