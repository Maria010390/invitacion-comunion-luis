
/* =====================================
   ELEMENTOS PRINCIPALES
===================================== */

const sobre = document.getElementById("sobre");
const boton = document.getElementById("abrir");
const escena = document.getElementById("escena");
const invitacionFinal = document.getElementById("invitacionFinal");
const volver = document.getElementById("volver");

const pantallaCelebracion =
    document.getElementById("pantallaCelebracion");

const verCelebracion =
    document.getElementById("verCelebracion");

const volverInvitacion =
    document.getElementById("volverInvitacion");

/* VARIABLES DE CONTROL */

let temporizador;
let animando = false;

/* =====================================
   ABRIR INVITACIÓN
===================================== */

function mostrarInvitacion() {
    if (animando || sobre.classList.contains("cerrando")) return;

    animando = true;
    boton.disabled = true;
    boton.textContent = "Abriendo invitación...";

    sobre.classList.add("abierto");

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const espera = movimientoReducido ? 50 : 2900;

    temporizador = setTimeout(() => {
        escena.classList.add("oculta");

        invitacionFinal.classList.add("visible");
        invitacionFinal.setAttribute("aria-hidden", "false");
        invitacionFinal.scrollTop = 0;

        boton.textContent = "Abrir invitación";
        boton.disabled = false;
        animando = false;
    }, espera);
}

/* =====================================
   VOLVER AL SOBRE
===================================== */

function cerrarInvitacion() {
    clearTimeout(temporizador);

    invitacionFinal.classList.remove("visible");
    invitacionFinal.setAttribute("aria-hidden", "true");

    pantallaCelebracion.classList.remove("visible");
    pantallaCelebracion.setAttribute("aria-hidden", "true");

    escena.classList.remove("oculta");

    sobre.classList.add("cerrando");
    volver.disabled = true;

    setTimeout(() => {
        sobre.classList.remove("abierto");

        setTimeout(() => {
            sobre.classList.remove("cerrando");

            boton.textContent = "Abrir invitación";
            boton.disabled = false;
            volver.disabled = false;
            animando = false;
        }, 1700);
    }, 1400);
}

/* =====================================
   NAVEGACIÓN ENTRE PANTALLAS
===================================== */

function mostrarCelebracion() {
    invitacionFinal.classList.remove("visible");
    invitacionFinal.setAttribute("aria-hidden", "true");

    pantallaCelebracion.classList.add("visible");
    pantallaCelebracion.setAttribute("aria-hidden", "false");
    pantallaCelebracion.scrollTop = 0;
}

function regresarInvitacion() {
    pantallaCelebracion.classList.remove("visible");
    pantallaCelebracion.setAttribute("aria-hidden", "true");

    invitacionFinal.classList.add("visible");
    invitacionFinal.setAttribute("aria-hidden", "false");
    invitacionFinal.scrollTop = 0;
}

/* =====================================
   EVENTOS DE LOS BOTONES
===================================== */

boton.addEventListener("click", mostrarInvitacion);
volver.addEventListener("click", cerrarInvitacion);

verCelebracion.addEventListener("click", mostrarCelebracion);
volverInvitacion.addEventListener("click", regresarInvitacion);

/* =====================================
   CONFIRMACIÓN POR WHATSAPP
===================================== */

const botonConfirmar = document.getElementById("confirmar");
const opcionesWhatsapp = document.getElementById("opcionesWhatsapp");

const whatsappMama = document.getElementById("whatsappMama");
const whatsappPapa = document.getElementById("whatsappPapa");

const numeroMama = "543816407454";
const numeroPapa = "543813370910";

const mensajeConfirmacion =
    "¡Hola! Confirmo mi asistencia a la fiesta de " +
    "Primera Comunión de Luis Daniel, " +
    "el sábado 28 de noviembre de 2026. " +
    "¡Muchas gracias!";

const mensajeCodificado = encodeURIComponent(mensajeConfirmacion);

whatsappMama.href =
    `https://wa.me/${numeroMama}?text=${mensajeCodificado}`;

whatsappPapa.href =
    `https://wa.me/${numeroPapa}?text=${mensajeCodificado}`;

botonConfirmar.addEventListener("click", () => {
    const mostrar = opcionesWhatsapp.hidden;

    opcionesWhatsapp.hidden = !mostrar;

    botonConfirmar.setAttribute(
        "aria-expanded",
        String(mostrar)
    );
});
// Música de fondo
const musicaFondo = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("botonMusica");

musicaFondo.volume = 0.35;

function actualizarBotonMusica() {
    const reproduciendo = !musicaFondo.paused;

    botonMusica.textContent = reproduciendo ? "🔊" : "🔇";
    botonMusica.setAttribute(
        "aria-label",
        reproduciendo ? "Pausar música" : "Reproducir música"
    );
}

async function reproducirMusica() {
    try {
        await musicaFondo.play();
    } catch (error) {
        console.log("La música necesita activarse manualmente.");
    }

    actualizarBotonMusica();
}

botonMusica.addEventListener("click", () => {
    if (musicaFondo.paused) {
        reproducirMusica();
    } else {
        musicaFondo.pause();
        actualizarBotonMusica();
    }
});

musicaFondo.addEventListener("play", actualizarBotonMusica);
musicaFondo.addEventListener("pause", actualizarBotonMusica);

// Comenzar al abrir el sobre
boton.addEventListener("click", reproducirMusica);
