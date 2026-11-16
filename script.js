let datosProyectos = [
  {
    id: 'electrodomestico',
    codigo: 'PROYECTO-01',
    categoria: 'web',
    categoriaLabel: 'WEB & INTERFACES',
    titulo: 'Interfaz Electrodoméstico',
    resumen: 'Sistema de control y visualización para dispositivo electrodoméstico con diseño de paneles interactivos de control e interfaces de usuario físicas.',
    imagen: 'interfaz electrodomestico.png',
    github: 'https://github.com/joandbe',
    herramientas: ['Arduino', 'Prototipado', 'Interfaz']
  },
  {
    id: 'transcripcion',
    codigo: 'PROYECTO-02',
    categoria: 'audio',
    categoriaLabel: 'AUDIO & PROCESAMIENTO',
    titulo: 'Voice Transcription & Audio Analysis',
    resumen: 'Interfaz de análisis espectral en tiempo real que evalúa volumen en amplitud, decibeles aproximados y frecuencia principal mediante micrófono.',
    imagen: 'Voice Transcription.png',
    github: 'https://github.com/joandbe/voice-transcription',
    herramientas: ['Web Audio API', 'Análisis FFT', 'JavaScript']
  },
  {
    id: 'maxmsp',
    codigo: 'PROYECTO-03',
    categoria: 'audio',
    categoriaLabel: 'AUDIO & PROCESAMIENTO',
    titulo: 'Patch Interactivo de Procesamiento (Max/MSP)',
    resumen: 'Entorno modular de procesamiento de audio en tiempo real con control de volumen, filtros biquad y visualización espectral interactiva.',
    imagen: 'Interfaz audio.png',
    github: 'https://github.com/joandbe/Interfaz-audio',
    herramientas: ['Max/MSP', 'DSP', 'Audio Patching']
  },
  {
    id: 'sonificador',
    codigo: 'PROYECTO-04',
    categoria: 'audio',
    categoriaLabel: 'AUDIO & PROCESAMIENTO',
    titulo: 'Sonificador RGB Interactivo',
    resumen: 'Sistema de síntesis visual interactiva que traduce propiedades lumínicas y cromáticas de imágenes en frecuencias y tonalidades musicales.',
    imagen: 'Sonificador.png',
    github: 'https://github.com/joandbe/Sonificacion-imagenes',
    herramientas: ['JavaScript', 'p5.js', 'Web Audio API', 'HTML5']
  },
  {
    id: 'idiomas',
    codigo: 'PROYECTO-05',
    categoria: 'web',
    categoriaLabel: 'WEB & INTERFACES',
    titulo: 'El sonido de los idiomas',
    resumen: 'Plataforma interactiva de entrenamiento auditivo y desafíos temporales para comparar muestras acústicas de diferentes lenguas del mundo.',
    imagen: 'Idiomas.png',
    github: 'https://github.com/joandbe/Idiomas',
    herramientas: ['HTML5 Semántico', 'CSS Grid', 'JavaScript Vanilla']
  },
  {
    id: 'morse',
    codigo: 'PROYECTO-06',
    categoria: 'web',
    categoriaLabel: 'WEB & INTERFACES',
    titulo: 'Entrenador Morse',
    resumen: 'Simulador de misiones en código Morse con control físico mediante microcontrolador y pulsadores integrados.',
    imagen: 'morse.png',
    github: 'https://github.com/joandbe',
    herramientas: ['Arduino', 'Web Serial', 'Hardware']
  },
  {
    id: 'lampara',
    codigo: 'PROYECTO-07',
    categoria: 'audio',
    categoriaLabel: 'AUDIO & PROCESAMIENTO',
    titulo: 'Lámpara Interactiva',
    resumen: 'Sistema lumínico controlado por hardware y web que traduce entradas de audio y micrófono en patrones dinámicos de LEDs direccionables.',
    imagen: 'lampara.png',
    github: 'https://github.com/joandbe',
    herramientas: ['Arduino', 'WS2812B', 'Web Audio API']
  },
  {
    id: 'arjs',
    codigo: 'PROYECTO-08',
    categoria: 'web',
    categoriaLabel: 'WEB & INTERFACES',
    titulo: 'AR.js Experience',
    resumen: 'Prototipo de realidad aumentada basada en web para visualización espacial e interacción con modelos 3D.',
    imagen: 'arjs.png',
    github: 'https://github.com/joandbe',
    herramientas: ['WebAR', 'AR.js', 'Three.js']
  }
];

const gridContainer = document.getElementById('proyectos-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderizarProyectos(filtro = 'todos') {
  if (!gridContainer) return;
  gridContainer.innerHTML = '';
  const filtrados = filtro === 'todos' ? datosProyectos : datosProyectos.filter(p => p.categoria === filtro);

  filtrados.forEach(proyecto => {
    const article = document.createElement('article');
    article.className = 'project-entry';
    article.innerHTML = `
      <div>
        <div class="entry-header">
          <span class="mono-tag">${proyecto.codigo}</span>
          <span class="mono-tag accent-text">${proyecto.categoriaLabel}</span>
        </div>
        <div class="entry-thumb-box">
          <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
        </div>
        <h3 class="entry-title">${proyecto.titulo}</h3>
        <p class="entry-summary">${proyecto.resumen}</p>
      </div>
      <div class="entry-footer">
        <div>${proyecto.herramientas.map(h => `<span class="tech-pill">${h}</span>`).join('')}</div>
        <span class="mono-tag accent-text">VER DETALLE →</span>
      </div>
    `;
    article.addEventListener('click', () => abrirModalProyecto(proyecto));
    gridContainer.appendChild(article);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarProyectos(btn.dataset.filter);
  });
});

// ==========================================
// CONTROL DE TEMA SUN-MOON THREE-WAY
// ==========================================
const themeBtn = document.getElementById('theme-toggle-btn');
const themeStatusLabel = document.getElementById('theme-status-label');
let currentThemeMode = 'auto';

function aplicarTema(modo) {
  currentThemeMode = modo;
  const html = document.documentElement;
  
  if (themeBtn) themeBtn.setAttribute('data-mode', modo);

  if (modo === 'auto') {
    const hora = new Date().getHours();
    if (hora >= 20 || hora < 5) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
    if (themeStatusLabel) themeStatusLabel.textContent = 'AUTO';
    if (themeBtn) themeBtn.setAttribute('aria-label', 'Cambiar tema (Actual: Automático, siguiente: Claro)');
  } else if (modo === 'light') {
    html.setAttribute('data-theme', 'light');
    if (themeStatusLabel) themeStatusLabel.textContent = 'CLARO';
    if (themeBtn) themeBtn.setAttribute('aria-label', 'Cambiar tema (Actual: Claro, siguiente: Oscuro)');
  } else if (modo === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (themeStatusLabel) themeStatusLabel.textContent = 'OSCURO';
    if (themeBtn) themeBtn.setAttribute('aria-label', 'Cambiar tema (Actual: Oscuro, siguiente: Automático)');
  }
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    if (currentThemeMode === 'auto') aplicarTema('light');
    else if (currentThemeMode === 'light') aplicarTema('dark');
    else aplicarTema('auto');
  });

  themeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentThemeMode === 'auto') aplicarTema('light');
      else if (currentThemeMode === 'light') aplicarTema('dark');
      else aplicarTema('auto');
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentThemeMode === 'auto') aplicarTema('dark');
      else if (currentThemeMode === 'dark') aplicarTema('light');
      else aplicarTema('auto');
    }
  });
}

aplicarTema('auto');

const modalProyecto = document.getElementById('proyecto-modal');

function abrirModalProyecto(p) {
  if (!modalProyecto) return;
  document.getElementById('modal-codigo').textContent = p.codigo;
  document.getElementById('modal-categoria').textContent = p.categoriaLabel;
  document.getElementById('modal-titulo').textContent = p.titulo;
  document.getElementById('modal-descripcion').textContent = p.resumen;
  document.getElementById('modal-imagen-container').innerHTML = `<img src="${p.imagen}" alt="${p.titulo}">`;
  document.getElementById('modal-github-link').href = p.github;
  document.getElementById('modal-herramientas').innerHTML = p.herramientas.map(h => `<li>${h}</li>`).join('');
  modalProyecto.classList.add('open');
}

const cerrarModalBtn = document.getElementById('cerrar-modal-btn');
if (cerrarModalBtn) {
  cerrarModalBtn.addEventListener('click', () => modalProyecto.classList.remove('open'));
}
if (modalProyecto) {
  modalProyecto.addEventListener('click', (e) => {
    if (e.target === modalProyecto) modalProyecto.classList.remove('open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarProyectos();
});