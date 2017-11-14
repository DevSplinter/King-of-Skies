const canvas = document.querySelector('#game-box');
const ctx = canvas.getContext('2d');
const plane = document.querySelector('img');
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
      
      if(((aa.xPosition + 32) > x && x > aa.xPosition) && ((aa.yPosition + 32) > y && y > aa.yPosition)){
          console.log("trafiony obiekt aa");
      }
       if(((aa2.xPosition + 32) > x && x > aa2.xPosition) && ((aa2.yPosition + 32) > y && y > aa.yPosition)){
          console.log("trafiony obiekt aa2");
           delete aa2.interval;
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
       return x = Math.floor(Math.random()*700);
    }
    drawPlane(x,y){        
        ctx.beginPath();
        ctx.clearRect(x-8, y-33, 55, 40);
        ctx.drawImage(plane, x, y);
        ctx.rect(x, y, 32, 32);
        ctx.closePath();
        };
    interval(){
        let y = 0;
        let x = this.xPosition;
        let that = this;
        setInterval(function(){
            y += 1;
            that.yPosition = y;
            that.drawPlane(x,y);
        },20);
        return y;
    }
    
}
let counter = 0;
let newEnemy = new Enemy();
function createEnemy(){
    newEnemy[counter] = new Enemy();
    counter++;
    if(counter < 10){
        setTimeout(createEnemy, 2000);
    }
}
createEnemy();


function drawing(){
    let xMax = canvas.width;
	let yMax = canvas.height;
    let hmTimes = Math.round(xMax + yMax);	
	
	for(let i=0; i<=hmTimes; i++) {
	  let randomX = Math.floor((Math.random()*xMax)+1);
	  let randomY = Math.floor((Math.random()*yMax)+1);
	  let randomSize = Math.floor((Math.random()*2)+1);
	  let randomOpacityOne = Math.floor((Math.random()*9)+1);
	  let randomOpacityTwo = Math.floor((Math.random()*9)+1);
	  let randomHue = Math.floor((Math.random()*360)+1);
    
      ctx.shadowBlur = Math.floor((Math.random()*15)+5);
      ctx.shadowColor = "white";
	  
    ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
	  ctx.fillRect(randomX, randomY, randomSize, randomSize);
	}
  
}

 drawing();