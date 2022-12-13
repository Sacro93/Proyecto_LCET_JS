//***************************CLASS USUARIO********************************//

class Usuario {
  constructor(nombre, apellido, fechaNac, correoElectronico, telefono, clave) {
    this.nombre = nombre;
    this.apellido = apellido;
    (this.fechaNac = fechaNac), (this.correoElectronico = correoElectronico);
    (this.telefono = telefono), (this.clave = clave);
  }
}

//***************************Class Producto********************************//

class Producto {
  constructor(id, marca, modelo, condicion, segmento, precio, imagen) {
    (this.id = id),
      (this.marca = marca),
      (this.modelo = modelo),
      (this.condicion = condicion),
      (this.segmento = segmento),
      (this.precio = precio),
      (this.imagen = imagen);
  }
}

//*************catalogo DINAMICO**************///

let catalogo = [];

const articulosPublicados = async () => {
  const response = await fetch("productos.json");
  const info = await response.json();

  for (let producto of info) {
    let articuloNuevo = new Producto(
      producto.id,
      producto.marca,
      producto.modelo,
      producto.condicion,
      producto.segmento,
      producto.precio,
      producto.imagen
    );
    catalogo.push(articuloNuevo);
  }
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
};

if (localStorage.getItem("catalogo")) {
  catalogo = JSON.parse(localStorage.getItem("catalogo"));
} else {
	articulosPublicados();
}

///************productos en Carrito**************///

let productoAComprar = [];

if (localStorage.getItem("carrito")) {
  productoAComprar = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify(productoAComprar));
}

///************Lista usuario**************///

const usuario1 = new Usuario(
  1,
  "fran",
  "sacro",
  11 / 05 / 1993,
  "sacroisky.f@gmail.com",
  1162991392,
  1234
);
let listaUsuarios = [];
if (localStorage.getItem("listaUsuarios")) {
  listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
} else {
  listaUsuarios.push(usuario1);
  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
}

//*************************************Capturar DOM*****************//
let productosPublicados = document.getElementById("productosPublicados");

let btnGuardarProducto = document.getElementById("guardarProducto");

let cardArticulo = document.getElementById("cardArticulo");

let btnCarrito = document.getElementById("btnCarrito");

let btnRegistrarUsuario = document.getElementById("btnRegistrar");

// let divUsuariosRegistrados = document.getElementById("usuariosRegistrados");

let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

let divCompra = document.getElementById("precioTotal");

let mayorPrecio = document.getElementById("mayorPrecio");

//***************************Eventos *******************************//

btnGuardarProducto.addEventListener("click", () => {
  crearProducto(catalogo);
});

btnCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productoAComprar);
});

btnRegistrarUsuario.addEventListener("click", () => {
  registrarCliente(listaUsuarios);
});

// btnMostrarUsuarios.addEventListener("click" ,()=> {
//   mostrarListado
// })

btnFinalizarCompra.addEventListener("click", () => {
  finalizarCompra();
});

mayorPrecio.addEventListener("click", () => {
  ordenarPorPrecio(catalogo);
});

//***************************FUNCTION MOSTRAR CATALOGO PUBLICADO ********************************//

let tickets = 200;

function productosPagina(detallesProducto) {
	productosPublicados.innerHTML = "";
  for (let producto of detallesProducto) {
    let nuevoProducto = document.createElement("div");

    nuevoProducto.innerHTML = ` <div class="card align-items-center border border-3 border-white" style="width: 17rem;">
                             <img src="../imagenes/productos/${
                               producto.imagen
                             }" class=" imagenesCard d-flex  alt="...">
							 <div class="card-body">
                          		<div class="list-group list-group-flush">

                              <h4 class="list-group-item fw-semibold  text-center ">${
                                producto.marca
                              }</h4>

                              <h5 class="list-group-item fw-semibold  text-center">${
                                producto.modelo
                              }</h5>

                              <p class="list-group-item fw-semibold  text-center ">Condicion:  ${
                                producto.condicion
                              }</p>

                             <p class="list-group-item fw-semibold text-center ">  Valor de Cuotaparte: $${
                               producto.precio / tickets
                             }</p>

                              <a href="#" id= "agregarBtn${
                                producto.id
                              }" class="btn btn-outline-dark">Agregar</a> </div>
							 
                             </div>
							 </div>`;
							 productosPublicados.appendChild(nuevoProducto);

    let bntAgregar = document.getElementById(`agregarBtn${producto.id}`);
    bntAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  }
}
productosPagina(catalogo);

//***************************Function agregar producto desde Perfil  al menu*******************************//

function crearProducto(nuevo) {
  let inputMarca = document.getElementById("marcaInput");
  let inputModelo = document.getElementById("modeloInput");
  let inputCondicion = document.getElementById("condicionInput");
  let inputSegmento = document.getElementById("segmentoInput");
  let inputPrecio = document.getElementById("precioInput");
  let productoCreado = new Producto(
    nuevo.length + 1,
    inputMarca.value,
    inputModelo.value,
    inputSegmento.value,
    inputCondicion.value,
    parseInt(inputPrecio.value),
    "cafetera.jpeg"
  );
  nuevo.push(productoCreado);
  localStorage.setItem("catalogo", JSON.stringify(nuevo));
  productosPagina(nuevo);

  inputMarca.value = "";
  inputModelo.value = "";
  inputSegmento.value = "";
  inputCondicion.value = "";
  inputPrecio.value = "";
}

//***********************FUNCION capturar DATOS DEL USUARIO MODAL******************//

function registrarCliente(nuevoCliente) {
  let inputNombre = document.getElementById("nombreInput");
  let inputApellido = document.getElementById("apellidoInput");
  let inputNacimiento = document.getElementById("nacimientoInput");
  let inputMail = document.getElementById("mailInput");
  let inputTelefono = document.getElementById("telefonoInput");
  let inputClave = document.getElementById("claveInput");
  let nuevoPerfil = new Usuario(
    nuevoCliente.length + 1,
    inputNombre.value,
    inputApellido.value,
    inputNacimiento.value,
    inputMail.value,
    inputTelefono.value,
    inputClave.value
  );
  nuevoCliente.push(nuevoPerfil);
  localStorage.setItem("listaUsuarios", JSON.stringify(nuevoCliente));
  mostrarUsuariosRegistrados(nuevoCliente);

  inputNombre.value = "";
  inputApellido.value = "";
  inputNacimiento.value = "";
  inputMail.value = "";
  inputTelefono.value = "";
  inputClave.value = "";
}

//***********************MOSTRAR LISTADO DE CLIENTES REGISTRADOS******************//

function mostrarUsuariosRegistrados(datos) {
  divUsuariosRegistrados.innerHTML = "";
  for (let usuario of datos) {
    let nuevoUsuario = document.createElement(`ul`);

    nuevoUsuario.innerHTML = `<ul class="">
                              <li>${usuario.nombre}</li>
                              <li>${usuario.apellido}</li>
                              <li>${usuario.fechaNac}</li>
                              <li>${usuario.correoElectronico}</li>
                              <li>${usuario.telefono}</li>
                              <li>${usuario.clave}</li>
                              </ul>`;
    divUsuariosRegistrados.appendChild(nuevoUsuario);
  }
}
mostrarUsuariosRegistrados(listaUsuarios);

//***************************Function agregar producto al carrito  *******************************//

function agregarAlCarrito(articulo) {
  productoAComprar.find(
    (art) => art.id === articulo.id
  );
  if (1) {
    productoAComprar.push(articulo);
    localStorage.setItem("carrito", JSON.stringify(productoAComprar));
    Swal.fire({
      title: "Producto Agregado",
      icon: "success",
      confirmButtonText: "Entendido",
      timer: 800,
      text: `Producto ${articulo.modelo} agregado`,
    });
  } 
//   else
//     Swal.fire({
//       title: "Producto ya en carrito",
//       icon: "warning",
//       confirmButtonText: "Entendido",
//       timer: 1000,
//     });
}

//function calcular total
function compraTotal(total) {
  let acumulador = 0;
  acumulador = total.reduce(
    (acc, productoCarrito) => acc + productoCarrito.precio / tickets,
    0
  );
  acumulador == 0
    ? (divCompra.innerHTML = `No hay productos en el carrito`)
    : (divCompra.innerHTML = `EL total de su carrito es $${acumulador}`);
}

//*************funcion mostrar producto  en modal************/

function cargarProductosCarrito(detalles) {
	cardArticulo.innerHTML = "";
  detalles.forEach((productoCarrito) => {
    cardArticulo.innerHTML += `<div class="card border-dark mb-1 container-fluid " id="productoCarrito${
      productoCarrito.id
    }" style="max-width: 300px;">
                      <img class="card-img-top" heigth="100px"  src="../imagenes/productos/${
                        productoCarrito.imagen
                      }" alt="${productoCarrito.nombre}">
                      <div class="card-body ">
                      <h3 class="list-group-item text-center">${
                        productoCarrito.marca
                      }</h3>
                      <h4 class="list-group-item text-center">${
                        productoCarrito.modelo
                      }</h4>
                      <p class="card-text  text-center"> Precio cuotaparte $${
                        productoCarrito.precio / tickets
                      }</p>
			<div class=" d-flex justify-content-center">
       <button class="btn btn-primary" id="botonSumarProductoCarrito"><i class="fas fa-trash-alt">+</i></button>
     
                
      
      <button class="btn btn-danger" id="botonEliminar${
        productoCarrito.id
      }"><i class="fas fa-trash-alt">Eliminar</i></button>
			</div>
                      </div>
                      </div>`;
  });

  detalles.forEach((productoCarrito, indice) => {
    document
      .getElementById(`botonEliminar${productoCarrito.id}`)
      .addEventListener("click", () => {



      				  //**************Eliminar del DOM*******//

        let cardProducto = document.getElementById(
          `productoCarrito${productoCarrito.id}`
        );
        cardProducto.remove();

       						 //**********Eliminar del array comprar*******//
        let productoEliminar = detalles.find(
          (articulo) => articulo.id === productoCarrito.id
        );
        let posicion = detalles.indexOf(productoEliminar);

        detalles.splice(posicion, 1);
        console.log(productoAComprar);

        // productosEnCarrito.splice(indice, 1);

        //**********Eliminar el Storage*******//

        localStorage.setItem(`carrito`, JSON.stringify(productoAComprar));
        //vuelvo a calcular el total
        compraTotal(detalles);
      });
  });
  compraTotal(detalles);
}




/********************Function registrar ordenar por precio de producto********************/

function ordenarPorPrecio(valor) {
  let ordenMasCaro = [].concat(valor);
  ordenMasCaro.sort((a, b) => b.precio - a.precio);
  console.log(ordenMasCaro);
  productosPagina(ordenMasCaro);
}



/********************Function rregistrar compra (btn carrito FINALIZAR********************/

function finalizarCompra() {
  Swal.fire({
    title: "Está seguro de realizar la compra",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, seleccionar medio de pago",
    cancelButtonText: "No, volver al carrito",
    confirmButtonColor: "blue",
    cancelButtonColor: "orange",
  }).then((result) => {
    if (result.isConfirmed) {
      let totalFinal = compraTotal(array);
      Swal.fire({
        title: "Compra realizada",
        icon: "success",
        confirmButtonColor: "blue",
        text: `Excelente! En breve recibiras informacion de tu/s comunidades , exitos en el proceso  `,
      });

      productoAComprar = [];
      localStorage.removeItem("carrito");
    } else {
      Swal.fire({
        title: "Compra no realizada",
        icon: "info",
        text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
        confirmButtonColor: "green",
        timer: 3500,
      });
    }
  });
}
