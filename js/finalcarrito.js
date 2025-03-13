
const recuperaTabla=JSON.parse(localStorage.getItem("tablasDatos"));

function generarcontenedores() {
    const contenedorelementos = document.querySelector('section');
    contenedorelementos.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas tarjetas
   
    const recuperaTabla = JSON.parse(localStorage.getItem("tablasDatos"));

    if (!recuperaTabla || recuperaTabla.length === 0) {
      const mensajeVacio = document.createElement('h4');
      mensajeVacio.textContent = "El carrito está vacío";
      contenedorelementos.appendChild(mensajeVacio);
      return;
    } //agregado

   const tituloelementos = document.createElement('div');
   tituloelementos.innerHTML=  `
   <h3 class="tit-magen"> Imagen </h3>
   <h3 class="tit-producto"> Producto </h3>
   <h3 class="tit-precio"> Precio </h3>
   <h3 class="tit-cantidad"> SKU </h3>
   `
   contenedorelementos.appendChild(tituloelementos);
  
    recuperaTabla.forEach((producto, index) => {
      // Crear la tarjeta de producto
      const elementotarjeta = document.createElement('div');
      elementotarjeta.classList.add('compra');
     
      // HTML de la tarjeta
      elementotarjeta.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.articulo}" class="mi-imagen">  
          <p class="alin-producto"> ${producto.articulo}</p>
          <h2 class="alin-precio"> $${producto.precio}</h2>
          <p class="alin-cantidad"> ${producto.cantidad}</p>      
         
      `; // HTML de la tarjeta
     
      contenedorelementos.appendChild(elementotarjeta);
        
    });
   }


generarcontenedores()
var boton = document.createElement("button");  //crear boton 
boton.innerHTML = "vaciar carrito";

boton.addEventListener("click", function() {
  localStorage.removeItem("tablasDatos"); // borra
  generarcontenedores()
  boton.remove();
 /*  location.reload(); */
});

var contenedor = document.getElementById("borrarCarrito");
contenedor.appendChild(boton);

const seccionformadepago = document.querySelector('.contenedorformadepago');
const mensajeFormaPago = document.createElement('h5');
mensajeFormaPago.textContent = "FORMA DE PAGO";
seccionformadepago.appendChild(mensajeFormaPago);

const formadepago = document.createElement('label');
formadepago.innerHTML=  `
<input type="radio" name="nivel" id="1" style="margin-right: 10px; ">Efectivo 
<input type="radio" name="nivel" id="2" style="margin-right: 10px; ">tarjeta
<br>
`
seccionformadepago.appendChild(formadepago);

// Seleccionamos los botones de radio
const botonEfectivo = document.getElementById('1');
const botonTarjeta = document.getElementById('2');

// Función para ejecutar al seleccionar la opción de "tarjeta"
botonTarjeta.addEventListener('change', function() {
    if (botonTarjeta.checked) {
  const elementofrentetarjeta = document.createElement('div');
  mensajeFormaPago.style.marginTop = '-5%';
  
  elementofrentetarjeta.innerHTML=  `
 <div id="tarjeta" class="tarjeta">
   <div class="frente">
   <h3>Frente de la tarjeta</h3>
   <p>Tarjeta de crédito</p>

   <div class="campo">
      <label for="numeroTarjeta">Número de tarjeta:</label>
      <input type="text" id="numeroTarjeta" placeholder="1234 5678 9012 3456" />
     </div>

     <div class="campo">
      <label for="nombreTitular">Nombre del titular:</label>
      <input type="text" id="nombreTitular" placeholder="Nombre del titular" />
     </div>

     <div class="campo">
      <label for="fechaExpiracion">Fecha de expiración:</label>
      <input type="month" id="fechaExpiracion" />
     </div>

     <div class="campo">
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" placeholder="123" />
     </div>
     </div>
    
     <div class="dorso">
      
     </div>
     </div>
 <!-- Tarjeta virtual (se actualiza en tiempo real) -->
        <div id="tarjetaVirtual" class="tarjetaVirtual">
        <div class="frente">
         <h3 id="tituloTarjeta">frente</h3>
         <p id="numeroTarjetaVirtual">**** **** **** ****</p>
         <p id="nombreTitularVirtual">Nombre Titular</p>
         <p id="fechaExpiracionVirtual">MM/AA</p>
        </div>
        <div class="dorso">
         <h3 id="dorsoTarjeta">*dorso*</h3>
         <p id="cvvVirtual">CVV: ***</p>
        </div>
        </div>
      `;
  
      // Agregar la tarjeta al contenedor adecuado
      seccionformadepago.appendChild(elementofrentetarjeta);

      // Escuchar eventos en los campos para actualizar la tarjeta virtual
      document.getElementById('numeroTarjeta').addEventListener('input', actualizarTarjetaVirtual);
      document.getElementById('nombreTitular').addEventListener('input', actualizarTarjetaVirtual);
      document.getElementById('fechaExpiracion').addEventListener('input', actualizarTarjetaVirtual);
      document.getElementById('cvv').addEventListener('input', actualizardorsoTarjetaVirtual); //cambio el input
  
      document.getElementById('numeroTarjeta').addEventListener('click', actualizarTarjetaVirtual);
      document.getElementById('nombreTitular').addEventListener('click', actualizarTarjetaVirtual);
      document.getElementById('fechaExpiracion').addEventListener('click', actualizarTarjetaVirtual);
      document.getElementById('cvv').addEventListener('click', actualizardorsoTarjetaVirtual); //cambio el input
    }
  } 
);

// Función para actualizar la tarjeta virtual
function actualizarTarjetaVirtual() {
  document.getElementById("tituloTarjeta").style.display = "block";
  document.getElementById("dorsoTarjeta").style.display = "none";

  document.getElementById("numeroTarjetaVirtual").style.display = "block";
  document.getElementById("nombreTitularVirtual").style.display = "block";
  document.getElementById("fechaExpiracionVirtual").style.display = "block";
  document.getElementById("cvvVirtual").style.display = "none";

  const numeroTarjeta = document.getElementById('numeroTarjeta').value.replace(/\D/g, '').slice(0, 16);
  const nombreTitular = document.getElementById('nombreTitular').value;
  const fechaExpiracion = document.getElementById('fechaExpiracion').value;
 

  // Actualizar los campos de la tarjeta virtual
  document.getElementById('numeroTarjetaVirtual').textContent = formatearNumeroTarjeta(numeroTarjeta);
  document.getElementById('nombreTitularVirtual').textContent = nombreTitular || 'Nombre Titular';
  document.getElementById('fechaExpiracionVirtual').textContent = fechaExpiracion || 'MM/AA';
  /* document.getElementById('cvvVirtual').textContent = 'CVV: ' + (cvv || '***');  esto no estaba*/
}

// Función para formatear el número de la tarjeta
function formatearNumeroTarjeta(numero) {
  // Agrega un espacio cada 4 dígitos
  return numero.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// Evento para eliminar el formulario de tarjeta al seleccionar "efectivo"
botonEfectivo.addEventListener('change', function() {
  if (botonEfectivo.checked) {
    mensajeFormaPago.style.marginTop = '1%';
    const tarjetaElemento = document.getElementById('tarjeta');
    const tarjetaVirtualElemento = document.getElementById('tarjetaVirtual');
   
      if (tarjetaElemento) tarjetaElemento.remove();
      if (tarjetaVirtualElemento) tarjetaVirtualElemento.remove();
      if (seccionformadepago.contains(botonPagar)) botonPagar.remove();
  }
});

//escucha el evento codigo de seguridad
function actualizardorsoTarjetaVirtual() {
  const cvv = document.getElementById('cvv').value;

  document.getElementById("tituloTarjeta").style.display = "none";
  document.getElementById("dorsoTarjeta").style.display = "block";

  document.getElementById("numeroTarjetaVirtual").style.display = "none";
  document.getElementById("nombreTitularVirtual").style.display = "none";
  document.getElementById("fechaExpiracionVirtual").style.display = "none";
  document.getElementById("cvvVirtual").style.display = "block";
  
  document.getElementById('cvvVirtual').textContent = 'CVV: ' + (cvv || '***');
}

// Crear botón de pago y deshabilitarlo inicialmente
var botonPagar = document.createElement("button");
botonPagar.innerHTML = "Realizar Pago";
botonPagar.setAttribute("disabled", "true");

const existenumeroTarjeta = document.getElementById('numeroTarjetaVirtual');
const existenombreTitular = document.getElementById('nombreTitularVirtual');
const existenombreTitularfechaExpiracion = document.getElementById('fechaExpiracionVirtual');
 

// Crear botón de pago y deshabilitarlo inicialmente
var botonPagar = document.createElement("button");
botonPagar.innerHTML = "Realizar Pago";
botonPagar.setAttribute("disabled", "true");

// Agregar botón al DOM cuando se selecciona "tarjeta"
botonTarjeta.addEventListener('change', function () {
    if (botonTarjeta.checked) {
        // Solo agregarlo si aún no existe
        if (!seccionformadepago.contains(botonPagar)) {
            seccionformadepago.appendChild(botonPagar);
        }

        // Seleccionar los campos correctamente después de que se hayan creado
        const numeroTarjeta = document.getElementById('numeroTarjeta');
        const nombreTitular = document.getElementById('nombreTitular');
        const fechaExpiracion = document.getElementById('fechaExpiracion');
        const cvv = document.getElementById('cvv');

        // Función para validar los campos y habilitar el botón
        function validarPago() {
            if (
                numeroTarjeta.value.trim().length === 16 &&
                nombreTitular.value.trim() !== "" &&
                fechaExpiracion.value.trim() !== "" &&
                cvv.value.trim().length === 3
            ) {
                botonPagar.removeAttribute("disabled"); // Habilitar botón
  botonPagar.style.padding = "10px 20px"; // Espaciado interno
  botonPagar.style.backgroundColor = "#323232"; // Color de fondo
  botonPagar.style.color = "white"; // Color del texto
  botonPagar.style.marginLeft = "600px"; 
  botonPagar.style.marginTop = "-400opx"; 
  botonPagar.style.border = "none"; // Sin borde
  botonPagar.style.borderRadius = "5px"; // Bordes redondeados
  botonPagar.style.cursor = "pointer"; // Cursor en forma de mano al pasar sobre el botón
  botonPagar.style.fontSize = "16px"; // Tamaño de la fuente
  botonPagar.style.transition = "background-color 0.4s"; // Tr
  botonPagar.style.opacity = "0.";

            } else {
                botonPagar.setAttribute("disabled", "true"); // Deshabilitar botón
                
            }
        }

        // Escuchar eventos en los inputs
        numeroTarjeta.addEventListener("input", validarPago);
        nombreTitular.addEventListener("input", validarPago);
        fechaExpiracion.addEventListener("input", validarPago);
        cvv.addEventListener("input", validarPago);
    }

    
});


if (botonPagar) { // Asegurar que el botón existe 

    // Crear el modal pero sin mostrarlo
    const modal = document.createElement("div");
    modal.id = "modalGracias";
    modal.style.display = "none"; // Oculto por defecto
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(75, 69, 69, 0.5)";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";

    // Crear contenido del modal
    const modalContenido = document.createElement("div");
    modalContenido.style.background = "white";
    modalContenido.style.padding = "20px";
    modalContenido.style.borderRadius = "10px";
    modalContenido.style.textAlign = "center";
    modalContenido.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.3)";

    // Agregar mensaje de compra
    const mensaje = document.createElement("h2");
    mensaje.textContent = "¡Gracias por su compra!";

    // Crear botón de cerrar
    const botonCerrar = document.createElement("button");
    botonCerrar.textContent = "Cerrar";
    botonCerrar.style.marginTop = "10px";
    botonCerrar.style.padding = "8px 15px";
    botonCerrar.style.border = "none";
    botonCerrar.style.backgroundColor = "black";
    botonCerrar.style.color = "white";
    botonCerrar.style.borderRadius = "5px";
    botonCerrar.style.cursor = "pointer";

    // Evento para cerrar el modal
    botonCerrar.addEventListener("click", function () {
        modal.style.display = "none"; // Ocultar modal
    });

    // Agregar elementos al modal
    modalContenido.appendChild(mensaje);
    modalContenido.appendChild(botonCerrar);
    modal.appendChild(modalContenido);
    document.body.appendChild(modal);

    // Evento para mostrar el modal cuando se haga clic en "Realizar Pago"
    botonPagar.addEventListener("click", function () {
        modal.style.display = "flex"; // Mostrar modal
    });
}

