firebase.initializeApp({
    apiKey: "AIzaSyATHYRDFn17PFsmiY149_3LFe3UdNSBWQw",
    authDomain: "getmeapp-deda5.firebaseapp.com",
    projectId: "getmeapp-deda5"
  });

  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
//lista de productos

var producto = [];

var total = 0;
//clase producto
class Producto{
    constructor(id, nombre, precio){
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
    }
}

//funcion que agrega un producto a la lista
 function agregarProductoLista(p){
        this.producto.push(p);
}
//funcion que verifica si esta en el array el producto, si esta devuelve true, si no false
 function verificarProductoEnLista(p){
    var check = false;
        for(var i = 0; i < producto.length; i++){
            if(producto[i].id == p.id){
                check = true;
                break;
            }
        }
    return check;
}
//funcion para sumar la cantidad del producto ya existente en el array de productos
function sumarCantidad(p){
    for(var i=0; i< producto.length;i++){
        if(producto[i].id == p.id){
            producto[i].cantidad ++;
            break;
        }
    }
}

function restarCantidad(id){
    //console.log("en la funcion restar cantidad");
   // console.log("ID DEL PRODUCTO: "+ id);
    for(var i=0; i< producto.length;i++){
        if(producto[i].id == id){
            producto[i].cantidad --;
            break;
        }
    }
}
//con esto cargamos la tabla de los productos disponibles
var tabla = document.getElementById("menu");
db.collection("producto").onSnapshot((querySnapshot) => {
  tabla.innerHTML = "";
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data().nombre} => ${doc.data().cantidad}`);
    tabla.innerHTML += `
        <tr onclick="agregar('${doc.id}','${doc.data().nombre}','${doc.data().precio}');M.toast({html: 'Agregado!', classes: 'rounded orange'});">
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().precio}</td>
        </tr>
        `
  });
});

function calcularTotal(){
    total = 0;
    producto.forEach(function(element){
        total = total + element.precio * element.cantidad;
    });
}

//funcion que recibe un el id del producto para poder ubicarlo en el array y descontarle 1 de la cantidad
function eliminar(id){
    var tabla = document.getElementById("carrito");
    
    //console.log("estoy en la funcion eliminar, id del producto: "+ id);
    //for que verifica el id que recibe por parametro con todos los elementos del array de productos, si es igual el id llama a la funcion restar cantidad que recibe el id y le resta la cantidad
    for(var i = 0; i < producto.length; i++){
        if(producto[i].id == id){
            console.log("Se elimino 1 de la cantidad");
            restarCantidad(id);
            break;
        }
    }

    //producto.forEach(function(element){
     //   console.log(element);
    //});
    //console.log("despues de bajar el stock");

    tabla.innerHTML = "";
    //console.log(jsonArray.length);
    //for que llena la tabla con el id: tablaCarrito
    
        for(var i = 0; i< producto.length; i++){
            //si la cantidad del producto es mayor a 0 lo muestra, sino lo elimina del array
            if(producto[i].cantidad == 0 ){
                producto.splice(i, 1);
                cargarTablaConArray(tabla);
                calcularTotal();
                document.getElementById("total").innerHTML = total +"$";
            }else{
                cargarTablaConArray(tabla);
                calcularTotal();
                document.getElementById("total").innerHTML = total +"$";
            }
      
        }
}
//funcion para agregar el producto al carrito.
function agregar(id, nombre, precio){
  var tabla = document.getElementById("carrito");
  var productoNuevo = new Producto(id, nombre, precio);
    //si el array de productos tiene 0 lo agrega directamente, si no hace un for para verificar
    //que recorre el array, si el producto ya esta en el array suma la cantidad dle producto +1
    // si no, lo agrega directamente como un producto nuevo en la lista.
    if(producto.length==0){
        this.agregarProductoLista(productoNuevo);
        this.cantidad ++;
    }else{
        for(var i = 0; i<producto.length; i++){
            
            if(this.verificarProductoEnLista(productoNuevo)){
                console.log("Esta en la lista");
                this.sumarCantidad(productoNuevo);
                break;
            }else{
                console.log("Se agrego a la lista");
                this.agregarProductoLista(productoNuevo);
                break;
            }
        }
    }
  //console.log(JSON.stringify(producto));
  //for para ver lo que va cargando el array
  //.forEach(function(element){
   //   console.log(element);
  //});
    //console.log(producto.length);
    //paso el array a un json
    var jsonArray = JSON.stringify(producto);
    cargarTablaConArray(tabla);
    calcularTotal();
    document.getElementById("total").innerHTML = total + "$";
}
//funcion que carga la tabla con el array, recibe la tabla a la que quiere cargar los elementos
function cargarTablaConArray(tabla){
    tabla.innerHTML = "";
    //console.log(jsonArray.length);
    //for que llena la tabla con el id: tablaCarrito
    for(var i = 0; i< producto.length; i++){
        var row = tabla.insertRow(i);
        var idCell = row.insertCell(0),
         nameCell = row.insertCell(1),
         precioCell = row.insertCell(2),
         cantidadCell =  row.insertCell(3),
         btnEliminar = row.insertCell(4);
            try {

                idCell.innerHTML = producto[i].id;
                nameCell.innerHTML = producto[i].nombre;
                precioCell.innerHTML = producto[i].precio;
                cantidadCell.innerHTML = producto[i].cantidad;
                btnEliminar.innerHTML = `<td><button class="btn btn-danger" onclick="eliminar('${producto[i].id}'); M.toast({html: 'Eliminado!', classes: 'rounded red'});">Eliminar</button></td>`;
            } catch (error) {
                console.log("Error: " + error);
            }    
         tabla.appendChild(row);
    }
}

//Aca se suben todos los datos cargados en el array.
function pushDatabase(){
    var modal = document.getElementById("message");
    producto.forEach(function(element) {
        db.collection("pedidos").add({
            nombre: element.nombre,
            precio: element.precio,
            cantidad: element.cantidad
        })
        .then(function(docRef) {
            modal.innerHTML = '<h3>Su pedido se envio con exito!!</h3>';
        })
        .catch(function(error) {
            modal.innerHTML = '<h3>Error al cargar pedido</h3>';
        });
    });
}