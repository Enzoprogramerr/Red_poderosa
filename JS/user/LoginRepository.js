//Content-type sirve para saber que recibe un json "application/json; que tipo de objeto le estoy enviando

function getLogin(pedido, success, error) {
    fetch("http://localhost:5297/Login/Login", {
        method: "POST",
        body: JSON.stringify(pedido),
        headers: {
        "Content-type": "application/json; charset = UTF-8" 
        }
    })  .then((response) => response.json()) //lo convierte en json
        .then((json) => success(json)) //si todo esta ok llama a success realiza el get login y redirige a la pag
        .catch((e) => error(e)); //devuelve el error que esta en get login
}
