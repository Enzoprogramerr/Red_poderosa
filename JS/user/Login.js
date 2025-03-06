// class Login {
//     constructor(user) {
//         this.email = user.email;
//         this.password = user.password;
//     }

//     getNode = () => {
//         let form = document.createElement("form");
//         form.id = "loginForm";

//         form.innerHTML = `
//             <input class="form-txt" type="email" name="usuario" placeholder="Correo electrónico">
//             <input class="form-txt" type="password" name="contraseña" placeholder="Contraseña">
//             <button class="bt-index" type="submit" disabled>INGRESAR</button>
//         `;

//         return form;
//     }
// }

let formLogin = document.getElementById("form_login");

formLogin.addEventListener("submit", (evt) => {
    evt.preventDefault(); //para que no se ejecute

    let emailUser = document.getElementById("txt_email_user");
    let password = document.getElementById("txt_password");

    let pedido = {
        EmailUser: emailUser.value,
        PasswordUser: password.value
    };

    getLogin(pedido,
        (json) => {
            window.location.href = "/home-publish.html"
        }, (e) => {
            let errorLabel = document.getElementById("error_label");
            errorLabel.style.display = "block";
            errorLabel.innerText = "Nombre de usuario o contraseña incorrecto";
        }
    )
})

