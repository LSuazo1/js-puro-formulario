//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//validarCampos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

eventListeners();
function eventListeners() {
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    btnReset.addEventListener('click', resetearFormulario);

    //envia el formulario
    formulario.addEventListener('submit', enviarEmail);
}

//funciones
function iniciarApp() {
    btnEnviar.enabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}
//valida el formulario
function validarFormulario(e) {

    if (emailRegex.test(email.value)) {
        const error = document.querySelector('p .error');
        if (error) {
            error.remove();
        }


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('El email no es valido');
    }

    if (e.target.value.length > 0) {
        //Elimina error
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }



    if (emailRegex.test(email.value) && mensaje.value !== "" && asunto.value !== "") {
        btnEnviar.enabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        btnEnviar.enabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = `${mensaje}`;
    mensajeError.classList.add('border', 'border', 'border-red-500', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }


}

function enviarEmail(e) {
    e.preventDefault();

    //const {id}= e.target.attributes;
    //console.log(id);
    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    //despues de 3 segundos oculpar
    setTimeout(() => {
        spinner.style.display = 'none';


        //mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = "El mensaje se envio correctamente.";
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold');
        //inserta el parrafo antes del snipert
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 500);

    }, 3000);
}

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}