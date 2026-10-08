const contenedorQR = document.getElementById("contenedorQR");
const formulario = document.getElementById("formulario");
const descargaBtn = document.getElementById("descargar-btn");

// Referencias del modal dinámico
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalTexto = document.getElementById("modal-texto");
const modalCerrar = document.getElementById("modal-cerrar");

// Configuración de QRCode con menor complejidad (CorrectLevel.L)
const QR = new QRCode(contenedorQR, {
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L 
});

// Función para mostrar el modal con título y mensaje personalizados
function mostrarModal(titulo, mensaje) {
    modalTitulo.textContent = titulo;
    modalTexto.textContent = mensaje;
    modal.classList.add("active");
}

function cerrarModal() {
    modal.classList.remove("active");
}

// Eventos para cerrar el modal
modalCerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

// Generar QR con validación de campo vacío
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const enlace = formulario.link.value.trim();

    // Comprobación: No permitir generar QR si el input está vacío
    if (enlace === "") {
        // Opcional: Limpiamos cualquier QR previo si se borró el campo
        QR.clear();
        const qrImagen = contenedorQR.querySelector("img");
        if (qrImagen) qrImagen.removeAttribute("src");

        mostrarModal(
            "¡Atención!",
            "Ups, parece que olvidaste ingresar el enlace. Agregalo y vuelve a dar clic en el boton Generar QR"
        );
        return;
    }

    // Generar el código QR simplificado
    QR.makeCode(enlace);
});

// Descargar QR
descargaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const qrImagen = contenedorQR.querySelector("img");
    
    if (qrImagen && qrImagen.getAttribute("src")) {
        const enlaceTemporal = document.createElement("a");
        enlaceTemporal.href = qrImagen.src;
        enlaceTemporal.download = "codigo-qr.png";
        
        document.body.appendChild(enlaceTemporal);
        enlaceTemporal.click();
        document.body.removeChild(enlaceTemporal);
    } else {
        mostrarModal(
            "¡Atención!",
            "Por favor, genera un código QR antes de intentar descargarlo."
        );
    }
});