class Snake{

    x = 0;
    y = 0;
    xspeed = 1;
    yspeed = 0;
    total = 0;
    tail = [];


    //----------------------//
    eat = function(pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }


    //----------------------//
    dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }


    //----------------------//
    death = function() {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
            
        }
    }
 
    //----------------------//
    update = function() {

    //recorre el arreglo de "cuadritos" generando el largo de la serpiente
        if(this.total === this.tail.length){
            for (let i = 0; i < this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y)

      this.x += this.xspeed*scl;
      this.y += this.yspeed*scl;
      
      // ACOMODAMOS LA GRILLA CUANDO CAMBIA EL SCL
      if(scl==100 && (this.x%100!=0 || this.y%100!=0)){
        if(this.x%100!=0){
            if(this.x%100==75){
              this.x+=25;
            }else if(this.x%100==25){
              this.x-=25;
            }else if(this.x%100==50){
              this.x+=50;
            }
        }
        if(this.y%100!=0){
            if(this.y%100==75){
              this.y+=25;
            }else if(this.y%100==25){
              this.y-=25;
            }else if(this.y%100==50){
              this.y+=50;
            }
        }
      }
        
      //limitar el movimiento hasta los bordes
      this.x = constrain(this.x, 0, width-scl);
      this.y = constrain(this.y, 0, height-scl);

    }
  
    //----------------------//
    show = function() {
        
      fill(255);

      //dibuja la serpiente 
      for (let i = 0; i < this.total; i++){
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
      rect(this.x, this.y, scl, scl);
    }
  }
