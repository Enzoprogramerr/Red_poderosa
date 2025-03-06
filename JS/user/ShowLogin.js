// document.addEventListener("DOMContentLoaded", () => {
//     const formContainer = document.querySelector(".form-index");

//     if (formContainer) {
//         const loginForm = new Login();
//         formContainer.appendChild(loginForm.getNode());
//     }
// });

const formContainer = document.querySelector(".form-index"); // Contenedor del formulario

formContainer.innerHTML = ""; // Limpiar contenido previo

const userData = getUserLogin(); // Obtener datos del usuario (simulados)
const login = new Login(userData.email, userData.password);
const formNode = login.getFormNode();

formContainer.append(formNode);
