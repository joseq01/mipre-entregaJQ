let jugueteria =[
  {
      articulo:'Soldado Toy',
      precio:2999,
  },
  {
      articulo:'Barbie',
      precio:7000,
  },
  {
      articulo:'Spiderman',
      precio:3500,
  }
];   //finaliza listado//

//guarda los datos//
let articulos= JSON.stringify(jugueteria);
localStorage.setItem("articulo",articulos)
localStorage.getItem(articulos) //guarda datos
  
  // compra1 //
  function boton() {
    let sumacar=document.getElementsByClassName('carr')[0];
   
    if (sumacar.innerHTML < 1) {
    alert("se agrego al carrito")
    let inc=sumacar.innerHTML++
    inc.innerHTML
    } else {
    let producto=document.getElementsByName('jug1')[0] 
    alert(producto.innerHTML+'  ya estaba agregado al carrito ')
    }
   
    
  //  let prod1= JSON.stringify(producto);
  //  localStorage.setItem("nombre",prod1)
  //  let nombre=localStorage.getItem("nombre")


    }
    
    let producto=document.getElementsByName('jug1')[0]
    let precio=document.getElementsByName('prec1')[0]
    console.log(producto,precio)
      

    // compra2 //
   function boton1() {
    let sumacar=document.getElementsByClassName('carr')[0];
    let inc=sumacar.innerHTML++
    inc.innerHTML
        
   }

   let sumacar=document.getElementsByClassName('carr')[0];
   
    // for (var i=0; sumacar.innerHTML[0], i++) {

  //  }

let impresion=[]

