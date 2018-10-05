// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCouee6t_RJA2a7-TO_H30YirySMbd-2Aw",
    authDomain: "getmeappadmin-61d15.firebaseapp.com",
    databaseURL: "https://getmeappadmin-61d15.firebaseio.com",
    projectId: "getmeappadmin-61d15",
    storageBucket: "getmeappadmin-61d15.appspot.com",
    messagingSenderId: "551176956579"
  };
  firebase.initializeApp(config);



// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Añadir productos
function guardar(){

  var nombre = document.getElementById('nombre').value;
  var descripcion = document.getElementById('descripcion').value;
  var precio = document.getElementById('precio').value;

  db.collection("productos").add({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('nombre').value='';
    document.getElementById('descripcion').value='';
    document.getElementById('precio').value='';
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}


// Ver productos
var tabla = document.getElementById('tabla');

db.collection("productos").onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().descripcion}</td>
        <td>${doc.data().precio}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')" >Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar()">Editar</button></td>
        </tr>

        `
    });
});




var menu = document.getElementById('menu');

db.collection("productos").onSnapshot((querySnapshot) => {
  menu.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        menu.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().descripcion}</td>
        <td>${doc.data().precio}</td>
        </tr>

        `
    });
});





// Borrar productos
function eliminar(idDeProducto){

  db.collection("productos").doc(idDeProducto).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });


}
