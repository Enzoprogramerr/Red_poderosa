function getRegister(pedido, success) {
    fetch('http://localhost:5297/User' , {
        method: 'POST',
        body: JSON.stringify(pedido),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((json) => success(json))
        .catch((e) => console.log(e));
}
