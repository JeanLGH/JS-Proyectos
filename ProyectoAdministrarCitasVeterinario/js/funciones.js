import Notificacion from "./classes/Notificacion.js";
import { editando, citaObj } from "./variables.js";
import AdminCitas from "./classes/AdminCitas.js";
import { formulario, formularioInput, camposInput } from "./selectores.js";

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}
const citas = new AdminCitas();
export let DB;


// Maneja el envío del formulario de citas.
export function submitCita(e) {
    e.preventDefault();
    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");

    if (Object.values(citaObj).some(valor => valor.trim() === "")) {
        new Notificacion({
            texto: "Todos los campos son obligatorios",
            tipo: "error"
        });
        return;
    }

    if (editando.value) {


        // Actualizar la cita existente en la base de datos
       
        citas.editar({ ...citaObj });
        
        objectStore.put(citaObj);
        console.log("entra edicion", citaObj)
        //hasta aqui llega
        transaction.oncomplete = function () {
            new Notificacion({
                texto: "Actualizado",
                tipo: "exito"
            });
        };
        transaction.onerror = (e) => {
            console.log("Hubo un error", e)
        };
    } else {
        citas.agregar({ ...citaObj });

        // Insertar una nueva cita en la base de datos
        objectStore.add(citaObj);
        transaction.oncomplete = function () {
            console.log("cita agregada")
            new Notificacion({
                texto: "Registrado",
                tipo: "exito"
            });
        };
    }


    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value = "Registrar Paciente";
    editando.value = false;


}

//Reinicia el objeto de la cita.
export function reiniciarObjetoCita() {
    if (!editando.value) {
        Object.assign(citaObj, {
            id: generarId(),
            paciente: "",
            propietario: "",
            email: "",
            fecha: "",
            sintomas: ""
        });
    } else {
        // Si estamos editando, no reiniciamos el ID
        Object.assign(citaObj, {
            paciente: "",
            propietario: "",
            email: "",
            fecha: "",
            sintomas: ""
        });
    }
}
//simula id
export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function eliminarCita(id) {
    citas.eliminar(id)
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita);
    camposInput.forEach(input => (input.value = cita[input.name]));
    editando.value = true;
    formularioInput.value = "Guardar Cambios";
}

export function crearDB() {
    const crearDB = window.indexedDB.open("citas", 1);
    //erro
    crearDB.onerror = function () {
        console.log("Error");
    };

    //cuando se cree de manera correcta
    crearDB.onsuccess = function () {
        console.log("Success");
        DB = crearDB.result;
        citas.mostrar(); // Muestra las citas después de que se complete la creación de la base de datos
    };

    //una vez se ejecuta, cuando la base de datos no esté
    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore("citas", {
            keypath: "id",
            autoIncrement: true
        });

        //se define las columnas de la bd, unique es para q no se repita,
        objectStore.createIndex("paciente", "paciente", { unique: false });
        objectStore.createIndex("propietario", "propietario", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("fecha", "fecha", { unique: false });
        objectStore.createIndex("sintomas", "sintomas", { unique: false });




        console.log("columnas creadas")
    };
}
