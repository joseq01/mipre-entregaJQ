let jugueteria =[
  {
      articulo:'Soldado Toy',
      precio:2999,
      imagen:"../assets/image/soldjuguete.jpg"
  },
  {
      articulo:'Barbie',
      precio:7000,
      imagen:"../assets/image/casabarbjuguete.avif"
  },
  {
      articulo:'Spiderman',
      precio:3500,
      imagen:"../assets/image/spiderjuguete.webp"
  },
  {
    articulo:'Mickey',
    precio:14999,
    imagen:"../assets/image/soldjuguete.jpg"
},
{
    articulo:'Daisy',
    precio:14000,
    imagen:"../assets/image/casabarbjuguete.avif"
},
{
    articulo:'Marciano',
    precio:35000,
    imagen:"../assets/image/spiderjuguete.webp"
},
{
  articulo:'Rambo',
  precio:8000,
  imagen:"../assets/image/casabarbjuguete.avif"
},
{
  articulo:' Sirenita',
  precio:29999,
  imagen:"../assets/image/soldjuguete.jpg"
},

];   //finaliza listado//


let tablas=[]

//guarda los datos//
let articulos= JSON.stringify(jugueteria);
localStorage.setItem("articulo",articulos)
localStorage.getItem(articulos) //guarda datos

//comienza prueba
function generarTarjetas() {
  const contenedor = document.getElementsByClassName('menu')[0];
  contenedor.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas tarjetas
 
  jugueteria.forEach((producto, index) => {
    // Crear la tarjeta de producto
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('compra');
   
    // HTML de la tarjeta
    tarjeta.innerHTML = `
        
        <img src="${producto.imagen}" alt="${producto.articulo}" class="compra">  
        <p class="alin-producto"> ${producto.articulo}</p>
        <h2 class="alin-precio"> $${producto.precio}</h2>
        <button class="agregar-carrito" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
          
     
    `; // HTML de la tarjeta
   
    contenedor.appendChild(tarjeta);
  });
 
}


// Seleccionamos el contenedor de las tarjetas y las flechas
const cardsContainer = document.querySelector('.menu');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
let offset = 0;
const itemWidth = 300;  // Incluye margen

rightArrow.addEventListener('click', () => {
  cardsContainer.scrollLeft += itemWidth + 40; // Mueve a la derecha
});

leftArrow.addEventListener('click', () => {
  cardsContainer.scrollLeft -= itemWidth + 40; // Mueve a la izquierda
});
//agregado 29


// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
// crea cantidad de carritos
let agregaindice = document.querySelector('.item_2');
if (!agregaindice.querySelector('.carr')) {
let carr = document.createElement('p');
carr.classList.add('carr'); 
agregaindice.appendChild(carr); // agrega class carr
}

  const producto = jugueteria[index];
  let datoa= {
    articulo: jugueteria[index].articulo,
    precio:  jugueteria[index].precio,
    cantidad: 1,
    imagen: jugueteria[index].imagen, //agregado
    }
 /*    tablas.push(datoa) //inserta viejo estaba junto al let datoa */
  let sumacar=document.getElementsByClassName('carr')[0];
  let inc=sumacar.innerHTML++;
    inc.innerHTML;
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya está en el carrito
  const productoExistente = tablas.find(item => item.articulo === producto.articulo); //era carrito
  if (productoExistente) {
   productoExistente.precio +=producto.precio;
   productoExistente.cantidad += 1; // Si ya existe, aumentamos la cantidad
  } else {
    tablas.push(datoa) //inserta viejo estaba junto al let datoa
   
  }
  
   // Guardar el carrito en localStorage
   localStorage.setItem('tablasDatos', JSON.stringify(tablas));
   const recuperaTabla=JSON.parse(localStorage.getItem("tablasDatos"));
 
  /* alert(`${producto.articulo} ha sido agregado al carrito.`);
  insertartabla()  */
  // Mostrar el mensaje flotante en pantalla
  mostrarMensaje(`${producto.articulo} ha sido agregado al carrito.`);
    
  insertartabla(); // Llama a la tabla
}

// Función para mostrar el mensaje flotante modo prueba
function mostrarMensaje(mensaje) {
  let mensajeDiv = document.createElement('div');
  mensajeDiv.classList.add('mensaje-flotante');
  mensajeDiv.textContent = mensaje;
  
  document.body.appendChild(mensajeDiv);

  // Desaparece después de 3 segundos
  setTimeout(() => {
      mensajeDiv.remove();
  }, 5000); // Función para mostrar el mensaje flotante modo prueba
}


// Llamar a la función para generar las tarjetas cuando cargue la página
document.addEventListener('DOMContentLoaded', generarTarjetas);

let sumacar=document.getElementsByClassName('carr')[0];
   


function insertartabla() {
  let totalGeneral = 0; //agregado
  let modelotabla=('<table>');
  modelotabla=modelotabla+('<tr> <th>Articulo</th>  <th>Precio</th>  <th>Cantidad</th> </tr> ');
  tablas.forEach(Array => { //era tablas
  /*  let totalArticulo = Array.precio * Array.cantidad; //agregado */
  /* let totalArticulo = Array.precio ; */
  totalGeneral += Array.precio;
  modelotabla=modelotabla+'<td id="colarticulo"> '+Array.articulo+'</td>';
  modelotabla=modelotabla+'<td id="colcprec">'+Array.precio+'</td>';
  modelotabla=modelotabla+'<td id="colcdad">'+Array.cantidad+'</td>';
  /* modelotabla = modelotabla + '<td>' + totalArticulo + '</td>';  */
  modelotabla=modelotabla+'<td> <button onclick="supr()">eliminar</button> </td>'; //crea boton suma
  modelotabla=modelotabla+'</tr > ';
  });
  
modelotabla = modelotabla + '<tr id="totalgral"><td colspan="1"><strong>Total</strong></td><td><strong>' + totalGeneral + '</strong></td></tr>';
  modelotabla=modelotabla+('</table>');
  document.getElementById('lista').innerHTML=modelotabla;
}

function supr() {

const eventoclic = document.getElementById("lista"); //este funciona
eventoclic.addEventListener('click', function(event) {
  if (event.target.tagName==="BUTTON") {
  const copiadato=event.target.parentNode.parentNode;
  const recuperarticulo= copiadato.firstElementChild; //saca el articulo
  const articuloValue = recuperarticulo.textContent.trim(); // eliminar espacios innecesarios
  event.target.parentNode.parentNode.remove();
   
  const borraarticulo = tablas.findIndex(item => item.articulo.trim() === articuloValue.trim()); //era tablas
 
  const carritomenos = tablas.findIndex(item=> item.articulo.trim() === articuloValue.trim());
  if (carritomenos !== -1) {
    const cantidadcarritos=document.getElementsByClassName('carr')[0];
    
    let totalGeneralElement = document.getElementById('totalgral'); // para acceder al total gral de la tabla
    let totalValue = parseFloat(totalGeneralElement.getElementsByTagName('td')[1].innerText); 
   
    let descuentacarritos=cantidadcarritos.innerHTML-=tablas[carritomenos].cantidad;
        
    let descuentatotalgeneral= totalValue -tablas[carritomenos].precio; //arreglo
     totalGeneralElement.getElementsByTagName('td')[1].innerText = descuentatotalgeneral.toFixed(2); // actualizar el tota
     };

  
  if (borraarticulo !== -1) {
    tablas.splice(borraarticulo, 1);
    };

    // Guardar el carrito en localStorage
    localStorage.setItem('tablasDatos', JSON.stringify(tablas));
    const recuperaTabla=JSON.parse(localStorage.getItem("tablasDatos"));

}}
) 
}

const menunavbar = document.querySelectorAll('.item_2 li');

function advertenciasalidacarrito(event) {
  event.preventDefault(); // Evita la navegación automática

  let confirmacion = confirm("¿Estás seguro de que quieres salir?. Se borraran articulos seleccionados");
  
  if (confirmacion) {
    window.location.href = event.target.href; // Redirige si el usuario acepta
  } else {
      console.log("El usuario decidió quedarse en la página.");
  }
}
// Asigna el evento a cada elemento del menú
menunavbar.forEach(link => {
  link.addEventListener("click", advertenciasalidacarrito);
});

 