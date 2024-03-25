//variables
const carrito= document.querySelector("#carrito");
const contenedorCarrito= document.querySelector("#lista-carrito tbody");
const vaciarCarritoB= document.querySelector("#vaciar-carrito");
const listaFrutas= document.querySelector("#lista-frutas");
let articuloCarrito=[];



cargarEventListener();
function cargarEventListener(){
    actualizarEstadoBotonVaciarCarrito();
    //cuando se da click al botón de "agregando al carrito"
    listaFrutas.addEventListener("click", agregarFruta)

    

    //elimina la fruta
    carrito.addEventListener("click", eliminarFruta)

    //cargar del Local Storage
    document.addEventListener("DOMContentLoaded", ()=>{
        articuloCarrito= JSON.parse(localStorage.getItem("carrito") || []);
        carritoHtml();
    })
    //vaciar el carrito
    vaciarCarritoB.addEventListener("click", ()=>{
        articuloCarrito=[];
        limpiarHTML();
        actualizarEstadoBotonVaciarCarrito();
    })
    
}

function actualizarEstadoBotonVaciarCarrito() {
    if (articuloCarrito.length === 0) {
        vaciarCarritoB.style.display = 'none';
    } else {
        vaciarCarritoB.style.display = 'block';
    }
}


function eliminarFruta(e){
    if(e.target.classList.contains("borrar-fruta")){
        const frutaId= e.target.getAttribute("data-id");

        //elimina del arreglo  por el data-id
        articuloCarrito= articuloCarrito.filter(fruta =>fruta.id!==frutaId);
        carritoHtml();
        actualizarEstadoBotonVaciarCarrito();
        
    }
}

//funciones
function agregarFruta(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const frutaSeleccionado=e.target.parentElement.parentElement;
        leerDatosFruta(frutaSeleccionado);
        actualizarEstadoBotonVaciarCarrito();
    }
}

//lee el contenido del hmtl y extrae la información de la fruta
function leerDatosFruta(fruta){
    
    //crear un objeto con el contenido de la fruta
    const infoFruta={
        imagen: fruta.querySelector("img").src,
        titulo: fruta.querySelector("h4").textContent,
        precio: fruta.querySelector(".u-pull-right").textContent,
        id: fruta.querySelector("a").getAttribute("data-id"),
        cantidad:1,
    }
    //revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some(fruta => fruta.id===infoFruta.id); 

    if(existe){
        const frutas=  articuloCarrito.map(fruta => {
            if( fruta.id===infoFruta.id){
                fruta.cantidad++;
                return fruta;//objs actualizados
            }else{
                return fruta;//objs no duplicados
            }
        });
        articuloCarrito=[...frutas]
    }else{
        articuloCarrito.push(infoFruta);
    }
    //llenar arreglo con los objetos(articulos)
    //articuloCarrito =[...articuloCarrito, infoFruta]
    
    console.log(articuloCarrito)

    carritoHtml();

}


//muestra el carrito de compras en el html
function carritoHtml(){
    //limpiar HTML
    limpiarHTML();
    //recorre el carrito y lo pone en el carrito
    articuloCarrito.forEach(fruta=>{
        const {imagen, titulo, precio, cantidad, id}= fruta;
        const row=document.createElement("tr");
        row.innerHTML=` 
            <td>
                <img src= "${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-fruta" data-id="${id}">x</a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    });
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articuloCarrito ))
}

//elimina las frutas del tbody
function limpiarHTML(){
    //contenedorCarrito.innerHTML=" ";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}