
//----VARIABLES GLOBALES----//

//variable para crear a la serpiente
let s;

//escala el tamaño de la grilla/matriz y tamaño de los objetos
let scl = 25;

let food;

let input_nombre, input_mail, input_pass, button;

let estado = 0;
let cant_comida = 0;
let cant_anterior = 0;

//usamos esta variable para el momento final
let momentocamara = 28;
let telefono;
let imgjugar, gradiente;

function preload() {
  imgjugar = loadImage('img/inicio.jpg');
  gradiente = loadImage('img/gradiente.jpg');
  perra = loadImage('img/perra.png');
}

function setup() {
  var cnv = createCanvas(800, 600);
  cnv.parent("sketchHolder");
  image(imgjugar, 0, 0);
  
  s = new Snake();
  pickLocation();
  frameRate(10);

  capture = createCapture(VIDEO);
  capture.size(240, 240);
  capture.hide();
}


//-------DETECTAR LA FRUTA----------//
function pickLocation() {
  cant_comida++;
  if(cant_comida>=momentocamara){ 
    scl = 100;
  }
  
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
  if(estado==2){
        background(188, 245, 66);
        //si se come la fruta, se genera una nueva posicion
        if (s.eat(food)) {
          pickLocation();
        }
        //orden de funciones en la serpiente
        s.death();
        s.update();
        s.show();
        //comida normal
      if(cant_comida<momentocamara){
        fill(255, 0, 100);
        rect(food.x, food.y, scl, scl);
        } else{ //comida cámara 
        frameRate(5);
        image(capture, food.x, food.y, scl, scl);
        }
        basesypublicidad();
        if(cant_comida == 33){
          estado = 3;
        }
    }else if(estado==3){
        background(230);
        frameRate(30);
        image(capture, 0, 0, 462, 332);
        image(perra, 0, 0);
        fill(80, 0, 178);
        textStyle(BOLD);
        textSize(45);
        text("LLAMÁ AL " + telefono, 45, 430, 785, 480);
        textSize(30);
        text("o mandá un mail a " + input_mail.value(), 45, 480, 755, 580);
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
  //Formulario
  if (estado==0 && (mouseX>264 && mouseX<537 && mouseY>427 && mouseY<512)){
      estado=1;
      image(gradiente, 0, 0);
    fill(0);
    textStyle(NORMAL);
    textSize(11);
    text('Nombre Completo:', 300, 150);
      input_nombre = createInput('');
      input_nombre.position(314, 160);
  input_nombre.parent("sketchHolder");
    text('Email:', 300, 245);
      input_mail = createInput('');
      input_mail.position(314, 255);
    input_mail.parent("sketchHolder");
    text('Contraseña:', 300, 345);
      input_pass = createInput('', 'password');
      input_pass.position(314, 355);
    input_pass.parent("sketchHolder");
      button = createButton('Registrarse / Ingresar');
      button.position(314, 410);
    button.parent("sketchHolder");
      button.mousePressed(validarFormulario);
  }
}

function validarFormulario() {
        //ESTO ESTÁ COMENTADO PARA QUE NO SEA NECESARIO COMPLETAR EL FORMULARIO MIENTRAS PROBAMOS COSAS.
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

function basesypublicidad(){
  
  //ESTO ES PARA LOS ALERTS (CAMBIOS EN LAS BASES Y CONDICIONES) Y PARA MOSTRAR LAS PUBLICIDADES.
  if(cant_comida != cant_anterior){
    switch(cant_comida){
      
      case 8:
          document.getElementById("pubreal2").style.visibility = "visible";
          document.getElementById("pub1").style.visibility = "visible";

        alert("Hemos actualizado las bases y condiciones: si quieres seguir jugando, a partir de este momento aceptas que enviemos promociones y actualizaciones a tu email!");
      break;
      
      case 14:
          document.getElementById("pub2").style.visibility = "visible";
          document.getElementById("pub3").style.visibility = "visible";
          document.getElementById("pub4").style.visibility = "visible";

        alert("Hemos actualizado las bases y condiciones: a partir de este momento podremos probar tu email y contraseña en otras páginas con el fin de conocerte mejor y enviarte mejores promociones.");
      break;

      case 17:

      document.getElementById("pub5").style.visibility = "visible";
      document.getElementById("pub6").style.visibility = "visible";
      document.getElementById("pub7").style.visibility = "visible";
        alert("Wow, no nos esperabamos que te gusten estas cosas... pero cada loco con su tema.");
      break;
    
      case 21:
        document.getElementById("pub8").style.visibility = "visible";
        document.getElementById("pub9").style.visibility = "visible";
        document.getElementById("pub10").style.visibility = "visible";
        document.getElementById("pub3").style.visibility = "visible";
        document.getElementById("pub5").style.visibility = "visible";

        alert("NO TE PREOCUPES SI TU HOMEBANKING DICE QUE TE QUEDASTE SIN PLATA, LA ESTAMOS INVIRTIENDO PARA QUE SEAS MILLONARIO EN UNOS DÍAS!")
      break;

      case 25:
        document.getElementById("pub2").style.visibility = "visible";
        document.getElementById("pub3").style.visibility = "visible";
        document.getElementById("pub6").style.visibility = "visible";
        document.getElementById("pub7").style.visibility = "visible";
      break;

      case 28:
        document.getElementById("pub11").style.visibility = "visible;"
        document.getElementById("pub12").style.visibility = "visible;"
        document.getElementById("pub13").style.visibility = "visible;"
        document.getElementById("pub14").style.visibility = "visible;"
        document.getElementById("pub15").style.visibility = "visible;"
        alert("TE GANASTE UN AUTO 0KM")
      break;

      case 29:
        document.getElementById("pub11").style.visibility = "visible;"
        document.getElementById("pub12").style.visibility = "visible;"
        document.getElementById("pub2").style.visibility = "visible";
        document.getElementById("pubreal2").style.visibility = "visible";
        document.getElementById("pub1").style.visibility = "visible";
        telefono = prompt("Necesitamos tu número de telefono para que puedas seguir jugando.", "");
        while(telefono.length<6) telefono = prompt("Ingrese su telefono real, por favor.", "");
      break;

      case 31:
        document.getElementById("pub11").style.visibility = "visible;"
        document.getElementById("pub12").style.visibility = "visible;"
        document.getElementById("pub2").style.visibility = "visible";
        document.getElementById("pubreal2").style.visibility = "visible";
        document.getElementById("pub1").style.visibility = "visible";
        document.getElementById("pub8").style.visibility = "visible";
        document.getElementById("pub9").style.visibility = "visible";
        document.getElementById("pub10").style.visibility = "visible";
        document.getElementById("pub3").style.visibility = "visible";
        document.getElementById("pub5").style.visibility = "visible";

        alert(";P")
        alert(";P")
        alert(";P")
        alert(";P")

      break;

      case 33:
        document.getElementById("pub11").style.visibility = "visible;"
        document.getElementById("pub12").style.visibility = "visible;"
        document.getElementById("pub2").style.visibility = "visible";
        document.getElementById("pubreal2").style.visibility = "visible";
        document.getElementById("pub1").style.visibility = "visible";
        document.getElementById("pub8").style.visibility = "visible";
        document.getElementById("pub9").style.visibility = "visible";
        document.getElementById("pub10").style.visibility = "visible";
        document.getElementById("pub3").style.visibility = "visible";
        document.getElementById("pub5").style.visibility = "visible";
        document.getElementById("pub8").style.visibility = "visible";
        document.getElementById("pub9").style.visibility = "visible";
        document.getElementById("pub10").style.visibility = "visible";
        document.getElementById("pub3").style.visibility = "visible";
        document.getElementById("pub5").style.visibility = "visible";
        document.getElementById("pub11").style.visibility = "visible;"
        document.getElementById("pub12").style.visibility = "visible;"
        document.getElementById("pub13").style.visibility = "visible;"
        document.getElementById("pub14").style.visibility = "visible;"
        document.getElementById("pub15").style.visibility = "visible;"   
        document.getElementById("pub16").style.visibility = "visible;"
        document.getElementById("pub17").style.visibility = "visible;"

        alert("adjkahdoiwqjqflkafjspfkasd asjdashkjd haslkdjadwq pdjaslkd jadowj asdkjahf")
      break;
    }
    cant_anterior = cant_comida;
  }
}
