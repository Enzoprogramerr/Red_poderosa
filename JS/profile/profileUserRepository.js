// // function getPutProfile(pedido, success) {
// //     fetch('http://localhost:5297/User' , {
// //         method: 'PUT',
// //         body: JSON.stringify(pedido),
// //         headers: {
// //             'Content-type': 'application/json; charset=UTF-8'
// //         }
// //     })
// //         .then((response) => response.json())
// //         .then((json) => success(json))
// //         .catch((e) => console.log(e));
// // }

// function getPutProfile(pedido, success) {
//     fetch('http://localhost:5297/User', {
//         method: 'PUT',
//         body: JSON.stringify(pedido),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
//         }
//         return response.json();
//     })
//     .then((json) => success(json))
//     .catch((e) => {
//         console.error("Error en la petición:", e);
//         let errorLabel = document.getElementById("error_label");
//         if (errorLabel) {
//             errorLabel.style.display = "block";
//             errorLabel.innerText = "* Ocurrió un error al actualizar el perfil. Inténtalo de nuevo.";
//         }
//     });
// }


function getPutProfile(pedido, success) {
    fetch('http://localhost:5297/User', {
        method: 'PUT',
        body: JSON.stringify(pedido),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(async (response) => {
        let data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `Error en la solicitud: ${response.status}`);
        }
        return data;
    })
    .then((json) => success(json))
    .catch((e) => {
        console.error("Error en la petición:", e);
        let errorLabel = document.getElementById("error_label");
        if (errorLabel) {
            errorLabel.style.display = "block";
            errorLabel.innerText = "* Ocurrió un error al actualizar el perfil. Inténtalo de nuevo.";
        }
    });
}
