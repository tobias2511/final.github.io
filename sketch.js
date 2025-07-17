let angle = 0;
let fontRegular;

function preload() {
  fontRegular = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  let canvas = createCanvas(600, 400, WEBGL);
  canvas.parent('canvas-container');

  canvas.style('width', '100%');
  canvas.style('height', '100%');

  textFont(fontRegular);
  textSize(60);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(15, 25, 55);

  ambientLight(80);
  directionalLight(255, 255, 255, 0.3, -1, 0.5);
  pointLight(255, 255, 100, 0, 0, 200);

  orbitControl();

  push();
  rotateY(angle * 0.5);
  translate(0, -30, 0);

  // Extrusión falsa: letras en tonos amarillos, más oscuro atrás
  let depth = 15; // grosor
  for (let i = depth; i >= 0; i--) {
    let inter = map(i, 0, depth, 0, 1);
    // Amarillo degradado de claro a oscuro (más atrás más oscuro)
    fill(
      lerpColor(color(255, 255, 100), color(180, 150, 20), inter)
    );
    translate(0, 0, -1);  // desplaza hacia atrás
    text('LUMINA', 0, 0);
  }
  pop();

  // Lamparita (pera invertida) girando alrededor del texto
  push();
  let lampRadius = 150;
  let x = lampRadius * cos(angle * 2);
  let z = lampRadius * sin(angle * 2);
  translate(x, 0, z);

  noStroke();
  fill(255, 220, 50);

  beginShape();
  vertex(0, 30, 0);
  bezierVertex(20, 30, 25, 15, 25, 0);
  bezierVertex(25, -25, 0, -35, 0, -40);
  bezierVertex(0, -35, -25, -25, -25, 0);
  bezierVertex(-25, 15, -20, 30, 0, 30);
  endShape(CLOSE);

  pop();

  angle += 0.01;
}
