let trazos = [];
let trazoActual = null;

const paleta = [
  [222, 218, 145],
  [191, 186, 176],
  [166, 136, 99],
  [198, 153, 144],
  [144, 178, 126],
  [238, 227, 202]
];

let textoGrafico;
let esMovil;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(displayDensity()); // mejora en alta resolución
  background(...paleta[5]);
  textFont('Cormorant Garamond');
  textSize(windowWidth < 600 ? 40 : 70);
  textAlign(CENTER, TOP);
  smooth();
  esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  frameRate(esMovil ? 30 : 60);

  textoGrafico = createGraphics(width, height);
  textoGrafico.textFont('Cormorant Garamond');
  textoGrafico.textSize(windowWidth < 600 ? 40 : 70);
  textoGrafico.textAlign(CENTER, TOP);
  textoGrafico.fill(30, 30, 30, 140);
  textoGrafico.noStroke();
  textoGrafico.text("Dibuja un recuerdo", width / 2, height * 0.035);
}

function draw() {
  background(...paleta[5]);
  image(textoGrafico, 0, 0);

  for (let t of trazos) {
    t.mostrar();
  }

  if (trazoActual) {
    trazoActual.mostrar();
  }

  noCursor();
  fill(30, 30, 30, 60);
  ellipse(mouseX, mouseY, esMovil ? 14 : 20, esMovil ? 14 : 20);
}

function mousePressed() {
  let c = paleta[floor(random(paleta.length - 1))];
  trazoActual = new Trazo(c);
}

function mouseDragged() {
  if (trazoActual) {
    trazoActual.agregarPincelada(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (trazoActual) {
    trazos.push(trazoActual);
    trazoActual = null;
  }
}

function keyPressed() {
  if (key === 'z' || key === 'Z') {
    if (trazos.length > 0) {
      trazos.pop();
    }
  }
}

class Trazo {
  constructor(col) {
    this.puntos = [];
    this.c = col;
  }

  agregarPincelada(x, y) {
    let cantidad = esMovil ? 2 : 5;
    for (let i = 0; i < cantidad; i++) {
      let ox = random(-8, 8);
      let oy = random(-8, 8);
      this.puntos.push(createVector(x + ox, y + oy));
    }
  }

  mostrar() {
    noStroke();
    fill(this.c[0], this.c[1], this.c[2], 200);
    for (let p of this.puntos) {
      let tam = random(8, 14);
      ellipse(p.x, p.y, tam, tam);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textoGrafico.resizeCanvas(width, height);
  textoGrafico.clear();
  textoGrafico.textFont('Cormorant Garamond');
  textoGrafico.textSize(windowWidth < 600 ? 40 : 70);
  textoGrafico.textAlign(CENTER, TOP);
  textoGrafico.fill(30, 30, 30, 140);
  textoGrafico.noStroke();
  textoGrafico.text("Dibuja un recuerdo", width / 2, height * 0.035);
}
