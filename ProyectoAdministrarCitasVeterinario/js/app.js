import {camposInput,formulario} from "./selectores.js"
import { datosCita, submitCita } from "./funciones.js";



camposInput.forEach(input => input.addEventListener("change", datosCita));
formulario.addEventListener("submit", submitCita);



