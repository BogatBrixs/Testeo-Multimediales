
//----VARIABLES GLOBALES----//

//variable para crear a la serpiente
let s;

//escala el tamaño de la grilla/matriz y tamaño de los objetos
let scl = 25;

let food;

let input_nombre, input_mail, input_dni, button;

let estado = 0;

let imgjugar;

function preload() {
  imgjugar = loadImage('img/inicio.jpg');
}

function setup() {
  createCanvas(800, 600);
  s = new Snake();
  pickLocation();

  frameRate(10);

}


//-------DETECTAR LA FRUTA----------//
function pickLocation() {
  let cols = floor(width/scl);
  let rows = floor(height/scl);

  //comida
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


//----SIRVE PARA TESTEAR----//
/*function mousePressed() {
  s.total++; 
}*/

function draw() {
  switch(estado){
    case 0:
      image(imgjugar, 0, 0);
      break;
    case 1:
      
      break;
    case 2:
        background(51);
        //si se come la fruta, se genera una nueva posicion
        if (s.eat(food)) {
          pickLocation();
        }
        //orden de funciones en la serpiente
        s.death();
        s.update();
        s.show();
        //comida
        fill(255, 0, 100);
        rect(food.x, food.y, scl, scl);
      break;
  }
}


//----MOVIMIENTO----//
function keyPressed() {
  if (keyCode === UP_ARROW){
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function mouseReleased() {
  if (estado==0 && (mouseX>264 && mouseX<537 && mouseY>427 && mouseY<512)){
    estado=1;
  }
}
