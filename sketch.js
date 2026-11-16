// ==========================================
// PALETA DE COLORES EDITORIAL
// ==========================================
let COLOR_GOAT_MILK;      
let COLOR_SANDLIGHT;      
let COLOR_CHARCOAL;       
let COLOR_MULLED_WINE;    
let COLOR_WOODLAND;       
let COLOR_ANTIQUE_MARBLE; 

let scrollY = 0;
let targetScrollY = 0;
let totalHeight = 0;

// Sistema de animación para el modal
let modalProgress = 0;
let targetModalProgress = 0;
let proyectoSeleccionadoActivo = null;

let proyectos = [
  { 
    num: "01",
    titulo: "Interfaz Electrodoméstico", 
    desc: "Primer proyecto: Entradas y salidas de electrodoméstico. Diseño de paneles interactivos de control e interfaces de usuario.", 
    imgPath: "interfaz electrodomestico.png"
  },
  { 
    num: "02",
    titulo: "Voice Transcription", 
    desc: "Web interactiva que transcribe voz en tiempo real. Análisis dinámico de espectro: decibelios (dB), frecuencias (Hz) y afinación musical.", 
    imgPath: "Voice Transcription.png",
    webUrl: "https://joandbe.github.io/voice-transcription/"
  },
  { 
    num: "03",
    titulo: "Web Interactiva: Idiomas", 
    desc: "Juego web interactivo desarrollado con p5.js con edición de audio multicanal e interfaz adaptativa de múltiples módulos.", 
    imgPath: "Idiomas.png",
    webUrl: "https://joandbe.github.io/Idiomas/"
  },
  { 
    num: "04",
    titulo: "Sintetizador Max MSP9", 
    desc: "Diseño de interfaz sonora con controles dinámicos para edición, modulación y procesamiento digital de señales de audio (DSP).", 
    imgPath: "Interfaz audio.png",
    webUrl: "https://joandbe.github.io/Interfaz-audio"
  },
  { 
    num: "05",
    titulo: "Sonificador de Imágenes", 
    desc: "Herramienta web interactiva que convierte datos e imágenes mediante mapeo directo de valores RGB a frecuencias sintetizadas.", 
    imgPath: "Sonificador.png",
    webUrl: "https://joandbe.github.io/Sonificacion-imagenes/"
  }
];

let GITHUB_PROFILE_URL = "https://github.com/joandbe";
let imagenes = [];
let imagenPortada;
let proyectoSeleccionado = null;

function preload() {
  imagenPortada = loadImage("croquera.jpeg", () => {}, () => imagenPortada = null);

  for (let i = 0; i < proyectos.length; i++) {
    let path = proyectos[i].imgPath;
    let ruta = encodeURI(path);
    imagenes[i] = loadImage(ruta, () => {}, () => imagenes[i] = null);
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  let container = document.getElementById("canvas-container");
  if (container) canvas.parent(container);

  COLOR_GOAT_MILK = color('#E7E5DB');
  COLOR_SANDLIGHT = color('#AD9E89');
  COLOR_CHARCOAL = color('#191A1E');
  COLOR_MULLED_WINE = color('#49110B');
  COLOR_WOODLAND = color('#56483B');
  COLOR_ANTIQUE_MARBLE = color('#C8C2B7');

  recalcularAltura();
}

function recalcularAltura() {
  let isMobile = width < 768;
  let coverH = isMobile ? 380 : 480;
  let contentH = isMobile ? 700 : 480;
  let cardH = isMobile ? 560 : 460;
  totalHeight = coverH + contentH + (proyectos.length * (cardH + 40)) + 180;
}

function draw() {
  background(COLOR_SANDLIGHT);

  scrollY = lerp(scrollY, targetScrollY, 0.1);
  modalProgress = lerp(modalProgress, targetModalProgress, 0.15);

  // Limpiar selección cuando la animación del modal termina de cerrarse
  if (modalProgress < 0.01 && targetModalProgress === 0) {
    proyectoSeleccionado = null;
  }

  let algunHover = false;
  let isMobile = width < 768;

  push();
  translate(0, -scrollY);

  // 1. Portada
  let coverH = isMobile ? 380 : 480;
  drawEditorialCover(40, coverH);

  // 2. Content & About
  let startYContent = coverH + 60;
  let contentH = drawContentAndAboutSection(startYContent, isMobile);

  // 3. Proyectos
  let currentY = startYContent + contentH + 40;
  let cardH = isMobile ? 560 : 460;

  for (let i = 0; i < proyectos.length; i++) {
    let isHover = drawProjectPage(proyectos[i], imagenes[i], currentY, i, isMobile, cardH);
    if (isHover) algunHover = true;
    currentY += cardH + 40;
  }

  pop();

  // Footer Fijo
  drawFooter();

  // Modal con animación fluida
  if (modalProgress > 0.001) {
    drawModal();
    algunHover = true;
  }

  cursor(algunHover ? HAND : ARROW);
}

// ==========================================
// PORTADA EDITORIAL CON PROFUNDIDAD
// ==========================================
function drawEditorialCover(startY, coverH) {
  let margin = max(15, width * 0.04);
  let coverW = width - margin * 2;
  let isMobile = width < 768;

  // Sombra ambiental del bloque principal
  fill(25, 26, 30, 35);
  noStroke();
  rect(margin + 6, startY + 6, coverW, coverH, 4);

  // Fondo principal portada
  fill(COLOR_MULLED_WINE);
  rect(margin, startY, coverW, coverH, 4);

  // Línea sutil de acento lumínico interior
  stroke(255, 255, 255, 25);
  strokeWeight(1);
  noFill();
  rect(margin + 2, startY + 2, coverW - 4, coverH - 4, 3);

  noStroke();
  fill(COLOR_GOAT_MILK);
  textFont('Oswald');
  textStyle(BOLD);
  textAlign(LEFT, TOP);

  if (!isMobile) {
    textSize(min(coverW * 0.1, 85));
    text("PORT", margin + 45, startY + 45);
    text("FOLIO", margin + 45, startY + 125);

    textSize(28);
    text("2026", margin + 45, startY + 225);

    textFont('Inter');
    textSize(13);
    textStyle(NORMAL);
    text("Joan Dídac Barbé Espinoza\nTaller de Diseño de Interfaces\nSegundo Semestre 2026", margin + 45, startY + 340);

    let imgW = coverW * 0.45;
    let imgH = coverH - 60;
    let imgX = margin + coverW - imgW - 35;
    let imgY = startY + 30;

    fill(COLOR_WOODLAND);
    rect(imgX - 4, imgY - 4, imgW + 8, imgH + 8, 2);
    if (imagenPortada) renderImagen(imagenPortada, imgX, imgY, imgW, imgH);

  } else {
    textSize(52);
    text("PORT\nFOLIO", margin + 20, startY + 30);
    
    textFont('Inter');
    textSize(12);
    textStyle(NORMAL);
    text("Joan Dídac Barbé Espinoza — 2026", margin + 20, startY + 160);

    let imgW = coverW - 40;
    let imgH = 160;
    let imgX = margin + 20;
    let imgY = startY + 190;
    fill(COLOR_WOODLAND);
    rect(imgX - 2, imgY - 2, imgW + 4, imgH + 4, 2);
    if (imagenPortada) renderImagen(imagenPortada, imgX, imgY, imgW, imgH);
  }
}

// ==========================================
// SECCIÓN CONTENT & ABOUT
// ==========================================
function drawContentAndAboutSection(startY, isMobile) {
  let margin = max(15, width * 0.04);
  let totalW = width - margin * 2;

  if (!isMobile) {
    let pageWidth = (totalW - 20) / 2;
    let pageH = 460;

    // Columna Izquierda: Content
    fill(25, 26, 30, 25);
    noStroke();
    rect(margin + 4, startY + 4, pageWidth, pageH, 4);

    fill(COLOR_GOAT_MILK);
    stroke(COLOR_WOODLAND);
    strokeWeight(1.5);
    rect(margin, startY, pageWidth, pageH, 4);

    noStroke();
    fill(COLOR_CHARCOAL);
    textFont('Oswald');
    textSize(36);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("ÍNDICE", margin + 30, startY + 30);

    for (let i = 0; i < proyectos.length; i++) {
      let itemY = startY + 100 + i * 65;
      stroke(COLOR_ANTIQUE_MARBLE);
      strokeWeight(1);
      line(margin + 30, itemY, margin + pageWidth - 30, itemY);

      noStroke();
      fill(COLOR_MULLED_WINE);
      textFont('Oswald');
      textSize(20);
      text(proyectos[i].num + ".", margin + 30, itemY + 15);

      fill(COLOR_CHARCOAL);
      textFont('Inter');
      textSize(13);
      textStyle(BOLD);
      text(proyectos[i].titulo, margin + 80, itemY + 18);
    }

    // Columna Derecha: About
    let rightX = margin + pageWidth + 20;
    fill(25, 26, 30, 25);
    noStroke();
    rect(rightX + 4, startY + 4, pageWidth, pageH, 4);

    fill(COLOR_GOAT_MILK);
    stroke(COLOR_WOODLAND);
    strokeWeight(1.5);
    rect(rightX, startY, pageWidth, pageH, 4);

    noStroke();
    fill(COLOR_CHARCOAL);
    textFont('Oswald');
    textSize(36);
    textStyle(BOLD);
    text("Sobre los Proyectos", rightX + 30, startY + 30);

    fill(COLOR_CHARCOAL);
    textFont('Inter');
    textSize(13);
    textStyle(NORMAL);
    let descText = "Portafolio de de la asignatura Taller de Diseño de Interfaces, segundo semestre 2026.";
    text(descText, rightX + 30, startY + 90, pageWidth - 60, 200);

    if (imagenes[1]) {
      renderImagen(imagenes[1], rightX + 30, startY + 240, pageWidth - 60, 180);
    }

    return pageH;
  } else {
    let pageH = 680;
    fill(COLOR_GOAT_MILK);
    stroke(COLOR_WOODLAND);
    strokeWeight(1.5);
    rect(margin, startY, totalW, pageH, 4);

    noStroke();
    fill(COLOR_CHARCOAL);
    textFont('Oswald');
    textSize(28);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text("CONTENIDO", margin + 20, startY + 20);

    for (let i = 0; i < proyectos.length; i++) {
      let itemY = startY + 60 + i * 45;
      stroke(COLOR_ANTIQUE_MARBLE);
      strokeWeight(1);
      line(margin + 20, itemY, margin + totalW - 20, itemY);

      noStroke();
      fill(COLOR_MULLED_WINE);
      textFont('Oswald');
      textSize(16);
      text(proyectos[i].num + ".", margin + 20, itemY + 10);

      fill(COLOR_CHARCOAL);
      textFont('Inter');
      textSize(12);
      textStyle(BOLD);
      text(proyectos[i].titulo, margin + 60, itemY + 12);
    }

    let aboutY = startY + 310;
    noStroke();
    fill(COLOR_CHARCOAL);
    textFont('Oswald');
    textSize(28);
    textStyle(BOLD);
    text("Sobre los Proyectos", margin + 20, aboutY);

    textFont('Inter');
    textSize(12);
    textStyle(NORMAL);
    let descText = "El potafolio .";
    text(descText, margin + 20, aboutY + 40, totalW - 40, 100);

    if (imagenes[1]) {
      renderImagen(imagenes[1], margin + 20, aboutY + 100, totalW - 40, 220);
    }

    return pageH;
  }
}

// ==========================================
// PÁGINA DE PROYECTO CON MICROINTERACCIÓN
// ==========================================
function drawProjectPage(p, img, yPos, index, isMobile, pageH) {
  let margin = max(15, width * 0.04);
  let totalW = width - margin * 2;

  let realMouseY = mouseY + scrollY;
  let isHover = mouseX > margin && mouseX < margin + totalW && realMouseY > yPos && realMouseY < yPos + pageH;

  // Sombra y elevación al hacer hover
  if (isHover) {
    fill(25, 26, 30, 45);
    noStroke();
    rect(margin + 4, yPos + 4, totalW, pageH, 4);
  }

  fill(COLOR_GOAT_MILK);
  stroke(isHover ? COLOR_MULLED_WINE : COLOR_WOODLAND);
  strokeWeight(isHover ? 2.5 : 1.5);
  rect(margin, yPos, totalW, pageH, 4);

  if (!isMobile) {
    let pageW = (totalW - 20) / 2;
    stroke(COLOR_ANTIQUE_MARBLE);
    strokeWeight(1);
    line(margin + pageW + 10, yPos + 15, margin + pageW + 10, yPos + pageH - 15);

    let textBlockX = (index % 2 === 0) ? margin + 40 : margin + pageW + 40;
    let textBlockW = pageW - 80;
    let imgX = (index % 2 === 0) ? margin + pageW + 30 : margin + 20;

    if (img) renderImagen(img, imgX, yPos + 30, pageW - 40, pageH - 60);

    noStroke();

    fill(COLOR_MULLED_WINE);
    textFont('Oswald');
    textSize(110);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(p.num, textBlockX, yPos + 25);

    textSize(24);
    text(p.titulo, textBlockX, yPos + 175, textBlockW);

    fill(COLOR_CHARCOAL);
    textFont('Inter');
    textSize(13);
    textStyle(NORMAL);
    text(p.desc, textBlockX, yPos + 235, textBlockW, 120);

    if (p.webUrl) {
      fill(COLOR_MULLED_WINE);
      textFont('Inter');
      textSize(11);
      textStyle(BOLD);
      let arrowOffset = isHover ? 4 : 0;
      text("VER PROYECTO ↗", textBlockX + arrowOffset, yPos + pageH - 50);
    }
  } else {
    let imgH = 200;
    if (img) renderImagen(img, margin + 20, yPos + 20, totalW - 40, imgH);

    noStroke();

    fill(COLOR_MULLED_WINE);
    textFont('Oswald');
    textSize(54);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(p.num, margin + 20, yPos + imgH + 25);

    textSize(20);
    text(p.titulo, margin + 100, yPos + imgH + 30, totalW - 120);

    fill(COLOR_CHARCOAL);
    textFont('Inter');
    textSize(12);
    textStyle(NORMAL);
    text(p.desc, margin + 20, yPos + imgH + 100, totalW - 40, 100);

    if (p.webUrl) {
      fill(COLOR_MULLED_WINE);
      textFont('Inter');
      textSize(11);
      textStyle(BOLD);
      text("VER PROYECTO ↗", margin + 20, yPos + pageH - 35);
    }
  }

  return isHover;
}

// ==========================================
// FOOTER
// ==========================================
function drawFooter() {
  fill(COLOR_CHARCOAL);
  noStroke();
  rect(0, height - 50, width, 50);

  noStroke();
  fill(COLOR_GOAT_MILK);
  textFont('Oswald');
  textSize(13);
  textAlign(LEFT, CENTER);
  text("PORTFOLIO 2026 — Taller de Interfaces", 20, height - 25);

  let btnW = width < 768 ? 130 : 170;
  let btnH = 30;
  let btnX = width - btnW - 20;
  let btnY = height - 40;

  let isHover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;

  fill(isHover ? COLOR_MULLED_WINE : COLOR_SANDLIGHT);
  rect(btnX, btnY, btnW, btnH, 2);

  noStroke();
  fill(isHover ? COLOR_GOAT_MILK : COLOR_CHARCOAL);
  textFont('Inter');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("GITHUB ↗", btnX + btnW / 2, btnY + btnH / 2);
}

// ==========================================
// MODAL CON ANIMACIÓN FLUIDA (ESCALA Y FADE)
// ==========================================
function drawModal() {
  // Fondo oscuro difuso con opacidad interpolada
  fill(25, 26, 30, modalProgress * 210);
  noStroke();
  rect(0, 0, width, height);

  let mw = min(720, width * 0.92);
  let mh = min(520, height * 0.85);
  let mx = (width - mw) / 2;
  let my = (height - mh) / 2;

  push();
  // Aplicar transformación suave de escala desde el centro del modal
  let centerX = mx + mw / 2;
  let centerY = my + mh / 2;
  translate(centerX, centerY);
  scale(modalProgress);
  translate(-centerX, -centerY);

  // Sombra del modal
  fill(0, 0, 0, 50);
  noStroke();
  rect(mx + 8, my + 8, mw, mh, 8);

  // Cuerpo del modal
  fill(COLOR_GOAT_MILK);
  stroke(COLOR_MULLED_WINE);
  strokeWeight(2);
  rect(mx, my, mw, mh, 6);

  let p = proyectos[proyectoSeleccionado];

  if (proyectoSeleccionado !== null && imagenes[proyectoSeleccionado]) {
    renderImagen(imagenes[proyectoSeleccionado], mx + 20, my + 20, mw - 40, mh - 160);
  }

  noStroke();
  fill(COLOR_MULLED_WINE);
  textFont('Oswald');
  textSize(24);
  textAlign(LEFT, TOP);
  text(p.num + " — " + p.titulo, mx + 25, my + mh - 125);

  fill(COLOR_CHARCOAL);
  textFont('Inter');
  textSize(12);
  text(p.desc, mx + 25, my + mh - 85, mw - 50, 60);

  // Botón de cierre vectorial mejorado
  let closeBtnX = mx + mw - 25;
  let closeBtnY = my + 25;
  let isCloseHover = dist(mouseX, mouseY, closeBtnX, closeBtnY) < 18;

  fill(isCloseHover ? COLOR_MULLED_WINE : COLOR_SANDLIGHT);
  stroke(COLOR_WOODLAND);
  strokeWeight(1);
  ellipse(closeBtnX, closeBtnY, 32);

  noStroke();
  fill(isCloseHover ? COLOR_GOAT_MILK : COLOR_CHARCOAL);
  textFont('Inter');
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text("✕", closeBtnX, closeBtnY - 1);

  pop();
}

function renderImagen(img, x, y, w, h) {
  if (img && img.width > 0) {
    push();
    imageMode(CENTER);
    let imgRatio = img.width / img.height;
    let boxRatio = w / h;
    let dw = (imgRatio > boxRatio) ? w : h * imgRatio;
    let dh = (imgRatio > boxRatio) ? w / imgRatio : h;
    image(img, x + w / 2, y + h / 2, dw, dh);
    pop();
  }
}

// ==========================================
// MOUSE & SCROLL
// ==========================================
function mouseWheel(event) {
  if (targetModalProgress > 0.5) return; // Bloquear scroll de fondo si el modal está abierto
  targetScrollY += event.delta;
  let maxScroll = max(0, totalHeight - height + 80);
  targetScrollY = constrain(targetScrollY, 0, maxScroll);
}

function mousePressed() {
  if (targetModalProgress > 0.5) {
    let mw = min(720, width * 0.92);
    let mh = min(520, height * 0.85);
    let mx = (width - mw) / 2;
    let my = (height - mh) / 2;

    if (dist(mouseX, mouseY, mx + mw - 25, my + 25) < 22 ||
        mouseX < mx || mouseX > mx + mw || mouseY < my || mouseY > my + mh) {
      targetModalProgress = 0; // Iniciar cierre animado
    } else if (proyectos[proyectoSeleccionado] && proyectos[proyectoSeleccionado].webUrl) {
      window.open(proyectos[proyectoSeleccionado].webUrl, "_blank");
    }
    return;
  }

  let isMobile = width < 768;
  let margin = max(15, width * 0.04);
  let totalW = width - margin * 2;
  let coverH = isMobile ? 380 : 480;
  let contentH = isMobile ? 700 : 480;
  let cardH = isMobile ? 560 : 460;
  let realMouseY = mouseY + scrollY;

  let currentY = coverH + 60 + contentH + 40;
  for (let i = 0; i < proyectos.length; i++) {
    if (mouseX > margin && mouseX < margin + totalW && realMouseY > currentY && realMouseY < currentY + cardH) {
      proyectoSeleccionado = i;
      targetModalProgress = 1; // Iniciar apertura animada
      return;
    }
    currentY += cardH + 40;
  }

  let btnW = width < 768 ? 130 : 170;
  let btnH = 30;
  let btnX = width - btnW - 20;
  let btnY = height - 40;
  if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < mouseY + btnH) {
    window.open(GITHUB_PROFILE_URL, "_blank");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalcularAltura();
}