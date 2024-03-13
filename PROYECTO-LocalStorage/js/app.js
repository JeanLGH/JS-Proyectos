// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event listeners
eventListeners();

function eventListeners() {
    // Cuando se coloca un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);
    // Cuando el documento está listo
    document.addEventListener("DOMContentLoaded", cargarTweets);
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();
    const tweetInput = document.querySelector("#tweet");
    const tweetTexto = tweetInput.value.trim();

    if (tweetTexto === "") {
        mostrarError("No puede ir vacío");
        return;
    }

    const tweetObj = {
        id: Date.now(), // Simula ser un ID
        tweet: tweetTexto, //tweet // tweet : tweet
    };

    tweets.push(tweetObj);
    tweetInput.value = ""; // Limpiar el campo de entrada después de agregar el tweet
    crearHTML();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function cargarTweets() {
    const tweetsGuardados = JSON.parse(localStorage.getItem("tweets")) || [];
    tweets = [...tweetsGuardados];
    crearHTML();
}

function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "x";

            btnEliminar.addEventListener("click", () => {
                borrarTweet(tweet.id);
            });

            const li = document.createElement("li");
            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function limpiarHTML() {
    listaTweets.innerHTML = ""; 
    /* 
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
    */
}
