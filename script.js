const datosProyectos = [
  {
    titulo: "Interfaz electrodoméstico",
    desc: "Primer proyecto: Entradas y salidas de electrodoméstico.",
    media: "interfaz electrodomestico.png",
    isVideo: false,
    link: null
  },
  {
    titulo: "Voice Transcription",
    desc: "Web interactiva que transcribe voz. Análisis de audio: Db, Hz y notas.",
    media: "Voice Transcription.png",
    isVideo: false,
    link: "https://joandbe.github.io/voice-transcription/"
  },
  {
    titulo: "Web interactiva: Idiomas",
    desc: "Juego web interactivo; edición de audio e interfaz de usuario múltiple.",
    media: "Idiomas.png",
    isVideo: false,
    link: "https://joandbe.github.io/Idiomas/"
  },
  {
    titulo: "Sintetizador Max MSP9",
    desc: "Diseño de interfaz en MaxMSP9 con controles dinámicos para edición de audio.",
    media: "max_msp_demo.mp4",
    isVideo: true,
    link: "https://joandbe.github.io/"
  },
  {
    titulo: "Sonificador de imágenes",
    desc: "Herramienta web para sonidificar imágenes mediante mapeo de canales RGB.",
    media: "Sonificador.png",
    isVideo: false,
    link: "https://joandbe.github.io/Sonificacion/"
  }
];

function abrirModal(index) {
  const proj = datosProyectos[index];
  const modal = document.getElementById('modal');
  const mediaContainer = document.getElementById('modal-media');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  const link = document.getElementById('modal-link');

  title.innerText = proj.titulo;
  desc.innerText = proj.desc;

  if (proj.isVideo) {
    mediaContainer.innerHTML = `<video src="${encodeURI(proj.media)}" autoplay loop muted playsinline></video>`;
  } else {
    mediaContainer.innerHTML = `<img src="${encodeURI(proj.media)}" alt="${proj.titulo}">`;
  }

  if (proj.link) {
    link.href = proj.link;
    link.style.display = "inline-block";
  } else {
    link.style.display = "none";
  }

  modal.style.display = "flex";
}

function cerrarModal(e) {
  if (e.target.classList.contains('modal') || e.target.classList.contains('close-btn')) {
    const modal = document.getElementById('modal');
    const mediaContainer = document.getElementById('modal-media');
    modal.style.display = "none";
    mediaContainer.innerHTML = ""; // Detener video
  }
}