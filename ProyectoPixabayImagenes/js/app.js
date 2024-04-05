const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const paginacionDiv = document.querySelector('#paginacion');

const API_KEY = "43246120-8d93b3f6c1117704019bdd62e";
const REGISTROS_POR_PAGINA = 30;

let totalPaginas;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
    e.preventDefault();
    const terminoBusqueda = document.querySelector("#termino").value;

    if (terminoBusqueda === "") {
        mostrarAlerta("Agrega un término de búsqueda");
        return;
    }
    buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center");
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function buscarImagenes(termino) {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${termino}&per_page=${REGISTROS_POR_PAGINA}&page=${paginaActual}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits);
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
            // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje de error al usuario.
        });
}

function calcularPaginas(total) {
    return Math.ceil(total / REGISTROS_POR_PAGINA);
}

function mostrarImagenes(imagenes) {
    resultado.innerHTML = ""; 
    imagenes.forEach(imagen => {
        const { likes, views, previewURL, largeImageURL } = imagen;
        const divImagen = document.createElement("div");
        divImagen.classList.add("w-1/2", "md:w-1/3", "lg:w-1/4", "mb-4", "p-3");
        const img = document.createElement("img");
        img.src = previewURL;
        img.alt = "{tags}";
        img.classList.add("w-full", "h-64", "object-cover");
        divImagen.appendChild(img);
        const divContenido = document.createElement("div");
        divContenido.classList.add("bg-white", "p-4");
        divContenido.innerHTML = `
            <p class="card-text">${likes} Me Gusta</p>
            <p class="card-text">${views} Vistas</p>
            <a href="${largeImageURL}" rel="noopener noreferrer" target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
        `;
        divImagen.appendChild(divContenido);
        resultado.appendChild(divImagen);
    });
    actualizarPaginacion();
}


function actualizarPaginacion() {
    paginacionDiv.innerHTML = ""; 
    for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement("a");
        botonPagina.href = "#";
        botonPagina.textContent = i;
        botonPagina.dataset.pagina = i;
        botonPagina.classList.add("pagina", "bg-yellow-400", "px-4", "py-1", "mr-2", "mx-auto", "mb-10", "font-bold", "uppercase", "rounded");
        botonPagina.onclick = () => {
            paginaActual = i;
            buscarImagenes(document.querySelector("#termino").value);
        };
        paginacionDiv.appendChild(botonPagina);
    }
}
