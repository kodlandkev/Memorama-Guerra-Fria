const iconos = ['🇺🇸/🇷🇺', '🇺🇸/🇷🇺', '🧱', '🧱', '🚀', '🚀', '☢️', '☢️', '🤝', '🤝', '⏱️', '⏱️'];

const datosInteligencia = {
    '🇺🇸/🇷🇺': '<strong>El Mundo Bipolar:</strong> Tras 1945, el mundo se reconfiguró en dos grandes bloques de influencia. El bloque occidental (EE.UU.) promovía el capitalismo y la democracia liberal, mientras que el bloque del este (URSS) impulsaba el socialismo científico y la economía planificada. Esta rivalidad dominó la política exterior, la cultura y la economía global durante más de cuatro décadas.',
    '🧱': '<strong>El Muro de Berlín (1961-1989):</strong> Fue una barrera de seguridad que formó parte de la frontera interalemana. Más que una división física en la ciudad de Berlín, simbolizó la "Cortina de Hierro" que separaba a Europa occidental de la influencia soviética. Su caída en 1989 marcó el principio del fin de los regímenes comunistas en Europa del Este.',
    '🚀': '<strong>La Carrera Espacial:</strong> Fue una competencia tecnológica y propagandística entre 1955 y 1975. La URSS logró hitos iniciales con el Sputnik (1957) y Yuri Gagarin (1961), el primer hombre en el espacio. EE.UU. respondió con el programa Apolo, logrando el primer alunizaje tripulado en 1969, lo que demostró la capacidad científica y militar de ambas superpotencias.',
    '☢️': '<strong>Destrucción Mutua Asegurada (MAD):</strong> Esta doctrina de estrategia militar sostenía que el uso masivo de armas nucleares por parte de dos bandos enfrentados resultaría en la aniquilación completa tanto del atacante como del defensor. Esta paradoja sirvió como un método de disuasión; el miedo a un final global evitó un conflicto armado directo entre las dos potencias.',
    '🤝': '<strong>La Distensión (Détente):</strong> Fue un periodo de relajación de las tensiones internacionales que comenzó en los años 70. Líderes como Richard Nixon y Leonid Brézhnev firmaron los tratados SALT (Conversaciones sobre Limitación de Armas Estratégicas) para reducir el riesgo de guerra nuclear y promover la cooperación diplomática por encima de la confrontación.',
    '⏱️': '<strong>El Reloj del Apocalipsis:</strong> Fundado por el Boletín de Científicos Atómicos, es un símbolo que representa la proximidad de la humanidad a una catástrofe global causada por tecnologías creadas por el hombre (inicialmente armas nucleares). Durante la Guerra Fría, las manecillas se movieron según el clima político, reflejando qué tan cerca estaba el mundo de un conflicto terminal.'
};

let primeraTarjeta, segundaTarjeta;
let bloquearTablero = false; 
let paresEncontrados = 0;

const tablero = document.getElementById('GameBoard');
const puntuacionDisplay = document.getElementById('puntuacion');
const estadoDisplay = document.getElementById('estado-op');
const infoTextDisplay = document.getElementById('InfoText');

function iniciarJuego() {
    paresEncontrados = 0;
    bloquearTablero = false;
    primeraTarjeta = null;
    segundaTarjeta = null;
    puntuacionDisplay.textContent = paresEncontrados;
    estadoDisplay.textContent = "Sesión Iniciada";
    estadoDisplay.style.color = "#d3d3d3";
    infoTextDisplay.innerHTML = "Seleccione las tarjetas para descubrir los conceptos fundamentales que definieron el equilibrio de poder en el siglo XX.<br><br>Haga coincidir los pares para desplegar el análisis detallado de cada evento.";
    tablero.innerHTML = '';

    iconos.sort(() => Math.random() - 0.5);

    iconos.forEach(icono => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.dataset.icono = icono; 
        
        tarjeta.innerHTML = `
            <div class="tarjeta-inner">
                <div class="tarjeta-frente">★</div>
                <div class="tarjeta-atras">
                    <div style="background: rgba(255, 215, 0, 0.8); border-radius: 50%; padding: 5px;">${icono}</div>
                </div>
            </div>
        `;
        
        tarjeta.addEventListener('click', voltearTarjeta);
        tablero.appendChild(tarjeta);
    });
}

function voltearTarjeta() {
    if (bloquearTablero) return;
    if (this === primeraTarjeta) return; 

    this.classList.add('volteada');

    if (!primeraTarjeta) {
        primeraTarjeta = this;
        return;
    }

    segundaTarjeta = this;
    verificarCoincidencia();
}

function verificarCoincidencia() {
    let esCoincidencia = primeraTarjeta.dataset.icono === segundaTarjeta.dataset.icono;

    if (esCoincidencia) {
        primeraTarjeta.removeEventListener('click', voltearTarjeta);
        segundaTarjeta.removeEventListener('click', voltearTarjeta);
        paresEncontrados++;
        puntuacionDisplay.textContent = paresEncontrados;
        
        infoTextDisplay.innerHTML = `<span style="color: #cd0000; font-weight: bold; font-family: 'Courier New';">CONTEXTO HISTÓRICO:</span><br><br>${datosInteligencia[primeraTarjeta.dataset.icono]}`;

        if (paresEncontrados === 6) {
            estadoDisplay.textContent = "ANÁLISIS COMPLETADO";
            estadoDisplay.style.color = "#ffd700"; 
            infoTextDisplay.innerHTML += "<br><br><strong>Felicidades. Ha completado el repaso de los puntos clave de la Guerra Fría.</strong>";
        }
        resetearTurno();
    } else {
        bloquearTablero = true;
        setTimeout(() => {
            primeraTarjeta.classList.remove('volteada');
            segundaTarjeta.classList.remove('volteada');
            resetearTurno();
        }, 1000);
    }
}

function resetearTurno() {
    bloquearTablero = false;
    primeraTarjeta = null;
    segundaTarjeta = null;
}

function reiniciarJuego() {
    iniciarJuego();
}

iniciarJuego();