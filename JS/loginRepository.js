function getLogin(pedido, success, error) {
    fetch('http://localhost:5297/Login/Login', {
        method: 'POST',
        body: JSON.stringify(pedido),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((json) => success(json))
        .catch((e) => error (e))
}