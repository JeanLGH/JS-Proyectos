document.addEventListener("DOMContentLoaded", function () {

    const email = {
        email: "",
        emailCC:'',
        asunto: "",
        mensaje: "",
    }
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //cc desde js variables
    const divCC = document.createElement("DIV");
    const inputCC= document.createElement("input");
    const labelCC = document.createElement("label");
    // manipulacion de la clase 
    divCC.classList.add("flex", "flex-col" ,"space-y-2");
    inputCC.classList.add("border", "border-gray-300", "px-3", "py-2", "rounded-lg");
    labelCC.classList.add("font-regular", "font-medium");
    //asiganacion de atributos
    inputCC.setAttribute("type", "email");
    inputCC.setAttribute("id", "emailCC");
    inputCC.setAttribute("placeholder", "Destinatario copia");

    labelCC.textContent='CC:';
    //agregar a formulario
    divCC.appendChild(labelCC)
    divCC.appendChild(inputCC)
    console.log(formulario.childNodes);
    

    formulario.insertBefore(divCC, formulario.children[1])
    // console.log(inputEmail)
    //console.log(inputAsunto)
    //console.log(inputMensaje)
    /** 
    inputEmail.addEventListener("blur", function(e){
        console.log(e.target.value)
    });
    */
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    inputCC.addEventListener('blur', validarCC)

    formulario.addEventListener("submit", enviarEmail),


        btnReset.addEventListener("click", function (e) {
            e.preventDefault();
            resetFormulario();
        });


    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");

            resetFormulario();

            //alerta
            const alertaExito=document.createElement("P");
            alertaExito.classList.add(
                "bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold","text-sm", "uppercase"
                )
            alertaExito.textContent="Mensaje enviado correctamente";
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }
    function validarCC(e) {
        if (e.target.value.trim() === "") {
            // Si está vacío, no hagas ninguna validación
            limpiarAlerta(e.target.parentElement);
            email.emailCC = ""; // Asegúrate de actualizar el valor en el objeto email
            comprobarEmail();
            return;
        }
        if (!validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es válido`, e.target.parentElement);
            email.emailCC = "";
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
        email.emailCC = e.target.value.trim().toLowerCase();
        comprobarEmail();
        console.log(email);
    }
    

    function validar(e) {
        if (e.target.value.trim() === "") {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        const valuesToCheck = Object.values(email).filter(value => value !== 'emailCC');
        console.log("dasd",valuesToCheck)
        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
        console.log(email)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove();
        }
    }
    function mostrarAlerta(mensaje, referencia) {
        //para que no se repita la alerta más de una vez
        limpiarAlerta(referencia);

        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center")
        console.log(error)
        // formulario.innerHTML=error.innerHTML;
        referencia.appendChild(error)
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        console.log(resultado);
        return resultado;
    }

    function comprobarEmail() {
        console.log(email);
        // Excluye emailCC de la comprobación de valores vacíos
        const valuesToCheck = Object.keys(email).filter(key => key !== 'emailCC');
        if (valuesToCheck.some(key => email[key] === '')) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }


    function resetFormulario() {
        email.email = "";
        email.emailCC = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();

    }




});