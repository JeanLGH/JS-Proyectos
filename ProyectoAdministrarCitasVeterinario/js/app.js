const camposInput = document.querySelectorAll("#paciente, #propietario, #email, #fecha, #sintomas");
const formulario = document.querySelector("#formulario-cita");
const formularioInput = document.querySelector("#formulario-cita input[type='submit']");
const contenedorCitas = document.querySelector("#citas");
let editando = false;

camposInput.forEach(input => input.addEventListener("change", datosCita));
formulario.addEventListener("submit", submitCita);


/**
 * Clase que administra la lista de citas.
 */
class Notificacion {
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

class AdminCitas {
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
            const botones = ["Editar", "Eliminar"];
            botones.forEach(texto => {
                const btn = document.createElement("button");
                btn.classList.add("py-2", "px-10", texto === "Editar" ? "bg-indigo-600" : "bg-red-600", "hover:bg-indigo-700", "hover:bg-red-700", "text-white", "font-bold", "uppercase", "rounded-lg", "flex", "items-center", "gap-2");
                btn.textContent = texto;
                btn.addEventListener("click", () => texto === "Editar" ? cargarEdicion(cita) : citas.eliminar(cita.id));
                divCita.appendChild(btn);
            });

            contenedorCitas.appendChild(divCita);
        });
    }
}

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

const citas = new AdminCitas();

// Maneja el envío del formulario de citas.
function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === "")) {
        new Notificacion({
            texto: "Todos los campos son obligatorios",
            tipo: "error"
        });
        return;
    }

    if (editando) {
        citas.editar({ ...citaObj });
        new Notificacion({
            texto: "Actualizado",
            tipo: "exito"
        });
    } else {
        citas.agregar({ ...citaObj });
        new Notificacion({
            texto: "Registrado",
            tipo: "exito"
        });
    }

    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value = "Registrar Paciente";
    editando = false;
}


//Reinicia el objeto de la cita.
function reiniciarObjetoCita() {
    Object.assign(citaObj, {
        id: generarId(),
        paciente: "",
        propietario: "",
        email: "",
        fecha: "",
        sintomas: ""
    });
}
//simula id
function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
    Object.assign(citaObj, cita);
    camposInput.forEach(input => (input.value = cita[input.name]));
    editando = true;
    formularioInput.value = "Guardar Cambios";
}
