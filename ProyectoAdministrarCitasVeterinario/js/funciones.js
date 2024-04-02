import Notificacion from "./classes/Notificacion.js";
import { editando, citaObj } from "./variables.js"; 
import AdminCitas from "./classes/AdminCitas.js";
import { formulario, formularioInput,camposInput } from "./selectores.js";

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}
const citas = new AdminCitas();



// Maneja el envío del formulario de citas.
export function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === "")) {
        new Notificacion({
            texto: "Todos los campos son obligatorios",
            tipo: "error"
        });
        return;
    }

    if (editando.value) {
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
    editando.value = false;
}


//Reinicia el objeto de la cita.
export function reiniciarObjetoCita() {
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
export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita);
    camposInput.forEach(input => (input.value = cita[input.name]));
    editando.value = true;
    formularioInput.value = "Guardar Cambios";
    


}
