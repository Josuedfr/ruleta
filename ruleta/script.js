const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girarBtn');
const resultado = document.getElementById('resultado');

const opciones = [
    "Pollo se la come",
    "Pollo se la come",
    "Pollo se la come",
    "Pollo se la come",
    "Pollo se la come"
];

const colores = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFDD33"];

let anguloInicio = 0;
const tamañoSeccion = (2 * Math.PI) / opciones.length;
let girando = false;
let velocidadActual = 0;
let desaceleracion = 0.05;

function dibujarRuleta() {
    for (let i = 0; i < opciones.length; i++) {
        const angulo = anguloInicio + i * tamañoSeccion;
        
        // Dibujar la sección con un borde
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angulo, angulo + tamañoSeccion);
        ctx.fillStyle = i % 2 === 0 ? "#FFDDC1" : "#FFABAB"; // Colores alternos
        ctx.fill();
        ctx.lineWidth = 5; // Ancho del borde
        ctx.strokeStyle = "#000000"; // Color del borde (negro)
        ctx.stroke(); // Dibujar el borde

        // Guardar y dibujar el texto
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angulo + tamañoSeccion / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000000";
        ctx.font = "bold 20px Arial";
        ctx.fillText(opciones[i], 230, 10);
        ctx.restore();
        
    }

    // Dibujar la flecha después de la ruleta
    dibujarFlecha("dibujar Flecha");
}



function rotarRuleta() {
    if (girando) return;
    girando = true;
    resultado.textContent = '';
    velocidadActual = Math.random() * 20 + 30;
    desaceleracion = 0.05;

    const animacion = setInterval(() => {
        ctx.clearRect(0, 0, 500, 500);
        anguloInicio += velocidadActual * Math.PI / 180;
        dibujarRuleta();

        velocidadActual -= desaceleracion;
        if (velocidadActual <= 0) {
            clearInterval(animacion);
            girando = false;
            const indiceSeleccionado = Math.floor((anguloInicio % (2 * Math.PI)) / tamañoSeccion);
            const resultadoFinal = opciones[opciones.length - 1 - indiceSeleccionado];

            // Aquí puedes enviar el resultado a un servidor o guardarlo de otra manera
            console.log(`Resultado: ${resultadoFinal}`);
        }
    }, 20);
}

function dibujarFlecha() {
    ctx.fillStyle = "#FF0000"; // Color rojo para la flecha
    ctx.beginPath();
    ctx.moveTo(250, 50); // Punto superior de la flecha
    ctx.lineTo(230, 90); // Punto inferior izquierdo de la flecha
    ctx.lineTo(270, 90); // Punto inferior derecho de la flecha
    ctx.closePath();
    ctx.fill();
}

girarBtn.addEventListener('click', rotarRuleta);

dibujarRuleta();

