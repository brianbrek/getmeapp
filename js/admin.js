firebase.initializeApp({
    apiKey: "AIzaSyATHYRDFn17PFsmiY149_3LFe3UdNSBWQw",
    authDomain: "getmeapp-deda5.firebaseapp.com",
    projectId: "getmeapp-deda5"
  });

  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var arrayId = [];
var tabla = document.getElementById("pedidos");
db.collection("pedidos").onSnapshot((querySnapshot) => {
  tabla.innerHTML = "";
  querySnapshot.forEach((doc) => {
    //arrayId.push(doc.id);
    //console.log(`${doc.id} => ${doc.data().nombre} => ${doc.data().cantidad}`);
    tabla.innerHTML += `<tr>
        
        <th scope="row">${doc.data().cantidad}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().precio}</td>
        <td><button class="btn btn-danger" onclick="eliminarItem('${doc.id}'); M.toast({html: 'Eliminado!', classes: 'rounded red'}); ">Eliminar</button></td>
        </tr>
        `
  });
});

function eliminarItem(id){
    db.collection("pedidos").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

