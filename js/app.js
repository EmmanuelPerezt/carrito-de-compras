//variables


const carrito= document.querySelector('#carrito')

const listaCurso= document.querySelector('#lista-cursos')

const contenedorCarrito=document.querySelector('#lista-carrito tbody')

const vaciarCarritoBtn= document.querySelector('#vaciar-carrito')

let elementosDelCarrito= []

cargarEventsListeners();


function cargarEventsListeners(){
    listaCurso.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarItem)
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

}
//funciones
function agregarCurso(e){//e es el proop del evento o funcion
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado= e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado)
  }
}
function eliminarItem(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id')
        //elimina por data id
        elementosDelCarrito= elementosDelCarrito.filter(curso => curso.id !== cursoId)
        console.log(elementosDelCarrito)
        carritoHtml()
    }
}
function vaciarCarrito(){
    elementosDelCarrito=[]
    console.log(elementosDelCarrito)
    carritoHtml()
}
function leerDatosCurso(curso){
    console.log(curso)
    //crear un objeto con el curso actual
    const infoCurso ={ 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,


    }
    //comprobar si un elemento ya existe
    if( elementosDelCarrito.some( curso => curso.id === infoCurso.id ) ) { 
        const cursos = elementosDelCarrito.map( curso => {
             if( curso.id === infoCurso.id ) {
                  curso.cantidad++;
                   return curso;
              } else {
                   return curso;
           }
        })
        elementosDelCarrito = [...cursos];
   }  else {
        elementosDelCarrito = [...elementosDelCarrito, infoCurso];
   }
    
    console.log(elementosDelCarrito)
    carritoHtml()
}
//muestra el carrito de compras en el html
function carritoHtml() {

    limpiarHtml();

    elementosDelCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

}

//elimina los cursos del tbody

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}