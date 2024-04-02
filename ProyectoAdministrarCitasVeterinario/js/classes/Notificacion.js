import {formulario} from "../selectores.js";

export default class Notificacion {
    constructor({ texto, tipo }) {
        this.texto = texto;
        this.tipo = tipo;
        this.mostrar();
    }

     //Muestra la lista de citas en la interfaz de usuario.
     
    mostrar() {
        const alerta = document.createElement("div");
        alerta.classList.add("text-center", "w-full", "p-3", "text-white", "my-5", "alert", "uppercase", "font-bold", "text-sm", this.tipo === "error" ? "bg-red-500" : "bg-green-500");
        alerta.textContent = this.texto;
        const alertaPrevia = document.querySelector(".alert");
        alertaPrevia?.remove();
        formulario.parentElement.insertBefore(alerta, formulario);
        setTimeout(() => alerta.remove(), 5000);
    }
}