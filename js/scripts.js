let canvas = document.querySelector('#game-box');
let ctx = canvas.getContext('2d');
let plane = document.querySelector('img');
let canvasTop = canvas.offsetTop;
let sth2 = false;


  canvas.addEventListener('click', function(e){
//      console.log('pozycja aa: ' + aa.xPosition + ', ' + aa.yPosition);
//        console.log('pozycja aa2: ' + aa2.xPosition + ', ' + aa2.yPosition);
//        console.log('pozycja aa3: ' + aa3.xPosition + ', ' + aa3.yPosition);
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
//    ctx.rect(80,100,32,32);
//    if (ctx.isPointInPath(x,y)){
//        console.log("trafiony");
//    }
      console.log("click:" + x);
      console.log("object x: " + aa.xPosition);
      console.log();
      if(((aa.xPosition + 32) > x && x > aa.xPosition) && ((aa.yPosition + 32) > y && y > aa.yPosition)){
          console.log("trafiony obiekt aa");
      }
       if(((aa2.xPosition + 32) > x && x > aa2.xPosition) && ((aa2.yPosition + 32) > y && y > aa.yPosition)){
          console.log("trafiony obiekt aa2");
      }
      if(((aa3.xPosition + 32) > x && x > aa3.xPosition) && ((aa3.yPosition + 32) > y && y > aa.yPosition)){
          console.log("trafiony obiekt aa3");
      }
    
});

class Enemy{
    constructor(){
        this.life = 2;
        this.cash = 50;
        this.xPosition = this.randPosition();
        this.drawPlane();
        this.yPosition = this.interval();
    }
    randPosition(){
        let x;
       return x = Math.floor(Math.random()*300);
    }
    drawPlane(x,y){        
        ctx.beginPath();
        ctx.clearRect(x-2, 0, 36, y+32);
        ctx.drawImage(plane, x, y);
        ctx.rect(x, y, 32, 32);
        };
    interval(){
        let y = 0;
        let x = this.xPosition;
        let that = this;
        setInterval(function(){
            y += 1;
            that.yPosition = y;
            that.drawPlane(x,y);
        },25);
        return y;
    }
    
}
let aa = new Enemy();
let aa2 = new Enemy();
let aa3 = new Enemy();



    