// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Lógica para index.html (DataTables)
    if (document.getElementById('tablaUsuarios')) {
        cargarUsuariosDataTables();
    }

    // 2. Lógica para formulario.html (Validaciones y Botones)
    if (document.getElementById('registroForm')) {
        configurarFormulario();
    }
});

/**
 * Función para obtener datos de JSONPlaceholder e inicializar DataTables
 * Cumple con Criterio 3.3 (Uso de arreglos y objetos) y DataTables.
 */
function cargarUsuariosDataTables() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            // Mapeamos el arreglo de objetos que nos devuelve la API a un formato simple
            const datosFormateados = data.map(usuario => {
                return [
                    usuario.name,
                    usuario.username,
                    usuario.email,
                    usuario.website
                ];
            });

            // Inicializamos jQuery DataTables
            $('#tablaUsuarios').DataTable({
                data: datosFormateados,
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' // Traducción al español
                }
            });
        })
        .catch(error => console.error("Error al cargar los usuarios:", error));
}

/**
 * Función principal para configurar eventos del formulario
 */
function configurarFormulario() {
    const form = document.getElementById('registroForm');
    const btnCancelar = document.getElementById('btnCancelar');

    // Evento para botón Enviar (Submit del formulario)
    form.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Evita que la página se recargue
        validarFormulario();
    });

    // Evento para botón Cancelar
    btnCancelar.addEventListener('click', limpiarFormulario);
}

/**
 * Función que realiza las validaciones individuales modificando el DOM (Criterio 3.1 y 3.2)
 */
function validarFormulario() {
    let esValido = true;

    // Obtener referencias de los inputs
    const nombre = document.getElementById('txtNombre');
    const usuario = document.getElementById('txtUsuario');
    const fecha = document.getElementById('txtFecha');
    const email = document.getElementById('txtEmail');
    const sitio = document.getElementById('txtSitio');

    // Limpiar clases previas
    const inputs = [nombre, usuario, fecha, email, sitio];
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    });

    // Validación Nombre (No vacío)
    if (nombre.value.trim() === '') {
        nombre.classList.add('is-invalid');
        esValido = false;
    } else {
        nombre.classList.add('is-valid');
    }

    // Validación Usuario (No vacío)
    if (usuario.value.trim() === '') {
        usuario.classList.add('is-invalid');
        esValido = false;
    } else {
        usuario.classList.add('is-valid');
    }

    // Validación Fecha (No vacía y formato que el input HTML5 devuelve internamente: YYYY-MM-DD)
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/; 
    if (fecha.value.trim() === '' || !regexFecha.test(fecha.value)) {
        fecha.classList.add('is-invalid');
        esValido = false;
    } else {
        fecha.classList.add('is-valid');
    }

    // Validación Email (Formato texto@texto.dominio)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        email.classList.add('is-invalid');
        esValido = false;
    } else {
        email.classList.add('is-valid');
    }

    // Validación Sitio Web (Si tiene texto, debe ser una URL válida)
    const regexUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (sitio.value.trim() !== '' && !regexUrl.test(sitio.value)) {
        sitio.classList.add('is-invalid');
        esValido = false;
    } else if (sitio.value.trim() !== '') {
        sitio.classList.add('is-valid');
    }

    // Acción Final si todo es correcto
    if (esValido) {
        alert("¡Datos enviados correctamente! Simulación exitosa.");
        limpiarFormulario();
        window.location.href = 'index.html'; // Redirección
    }
}

/**
 * Función para limpiar el formulario y resetear las clases de validación
 */
function limpiarFormulario() {
    const form = document.getElementById('registroForm');
    form.reset(); // Restablece valores por defecto

    // Remover las clases de validación de Bootstrap
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    });
}