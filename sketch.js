
//----VARIABLES GLOBALES----//

//variable para crear a la serpiente
let s;

//escala el tamaño de la grilla/matriz y tamaño de los objetos
let scl = 25;

let food;

let input_nombre, input_mail, input_pass, button;

let estado = 0;

let imgjugar, gradiente;

function preload() {
  imgjugar = loadImage('img/inicio.jpg');
  gradiente = loadImage('img/gradiente.jpg');
}

function setup() {
  createCanvas(800, 600);
  image(imgjugar, 0, 0);
  
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
      image(gradiente, 0, 0);
    fill(0);
    text('Nombre Completo:', 300, 150);
      input_nombre = createInput('');
      input_nombre.position(300, 160, 'relative');
    text('Email:', 300, 245);
      input_mail = createInput('');
      input_mail.position(300, 255, 'relative');
    text('Contraseña:', 300, 345);
      input_pass = createInput('', 'password');
      input_pass.position(300, 355, 'relative');
      button = createButton('Registrarse / Ingresar');
      button.position(300, 410, 'relative');
      button.mousePressed(validarFormulario);
  }
}

function validarFormulario() {
        
        let emailrefencia = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		let email = input_mail.value();
  
		if (input_nombre.value()==''){
			alert("El nombre completo es obligatorio.")
			return false;
		}else if( !(emailrefencia.test(email)) ) {
			alert("Por favor ingrese una dirección de correo válida.")
			return false;
		}else if (input_pass.value()==''){
			alert("La contraseña es obligatoria.")
			return false;
		}else{
          estado2();
        }

	}

function estado2() {
  alert("AL INGRESAR AL JUEGO ACEPTÁS LAS SIGUIENTES BASES Y CONDICIONES:")
  estado = 2;
  input_nombre.hide();
  input_pass.hide();
  input_mail.hide();
  button.hide();
}
