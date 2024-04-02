import { contenedorCitas } from "../selectores.js";
import { cargarEdicion } from "../funciones.js";

export default class AdminCitas {
    constructor() {
        this.citas = [];
    }

    //Agrega una nueva cita a la lista.
    agregar(cita) {
        this.citas.push(cita);
        this.mostrar();
    }

    //Edita una cita existente en la lista.
    editar(citaActualizada) {
        this.citas = this.citas.map(cita => (cita.id === citaActualizada.id ? citaActualizada : cita));
        this.mostrar();
    }

    //Elimina una cita de la lista.
    eliminar(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        this.mostrar();
    }

    mostrar() {
        contenedorCitas.innerHTML = "";
        if (this.citas.length === 0) {
            contenedorCitas.innerHTML = "<p class='text-xl mt-5 mb-10 text-center'>No Hay Pacientes</p>";
            return;
        }
        this.citas.forEach(cita => {
            const divCita = document.createElement("div");
            divCita.classList.add("mx-5", "my-10", "bg-white", "shadow-md", "px-5", "py-10", "rounded-xl", "p-3");

            const campos = ["paciente", "propietario", "email", "fecha", "sintomas"];
            campos.forEach(campo => {
                const p = document.createElement("p");
                p.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
                p.innerHTML = `<span class="font-bold uppercase">${campo.replace(/^\w/, c => c.toUpperCase())}: </span> ${cita[campo]}`;
                divCita.appendChild(p);
            });


            // Crear botones para editar y eliminar la cita
              //btn  editar 
              const btnEditar = document.createElement('button');
              btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
              btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
              const clone = structuredClone(cita) //{...cita}
              //event handler
              btnEditar.onclick=()=>{
                  cargarEdicion(clone)
              }
  
              //btn  eliminar
              const btnEliminar = document.createElement('button');
              btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
              btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
              //event handler
              btnEliminar.onclick=()=>{
                  this.eliminar(cita.id)
              }
              const contenedorBotones=document.createElement("DIV")
              contenedorBotones.classList.add("flex", "justify-between", "mt-10")
              contenedorBotones.appendChild(btnEditar)
              contenedorBotones.appendChild(btnEliminar)
              divCita.appendChild(contenedorBotones)

            contenedorCitas.appendChild(divCita);
        });
    }
}