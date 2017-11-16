const canvas = document.querySelector('#game-box');
const ctx = canvas.getContext('2d');
const plane = document.querySelector('img');
let canvasTop = canvas.offsetTop;


//  canvas.addEventListener('click', function(e){
//
//    let rect = canvas.getBoundingClientRect();
//    let x = e.clientX - rect.left;
//    let y = e.clientY - rect.top;
////    ctx.rect(80,100,32,32);
////    if (ctx.isPointInPath(x,y)){
////        console.log("trafiony");
////    }
//      
//      if(((aa.xPosition + 32) > x && x > aa.xPosition) && ((aa.yPosition + 32) > y && y > aa.yPosition)){
//          console.log("trafiony obiekt aa");
//      }
//       if(((aa2.xPosition + 32) > x && x > aa2.xPosition) && ((aa2.yPosition + 32) > y && y > aa.yPosition)){
//          console.log("trafiony obiekt aa2");
//           delete aa2.interval;
//      }
//      if(((aa3.xPosition + 32) > x && x > aa3.xPosition) && ((aa3.yPosition + 32) > y && y > aa.yPosition)){
//          console.log("trafiony obiekt aa3");
//      }
//    
//});

class Enemy{
    constructor(){
        this.life = 2;
        this.cash = 50;
        this.xPosition = this.randPosition();
        this.drawPlane();
        this.yPosition = this.interval();
        this.intervalReset;
    }
    randPosition(){
       let x;
       return x = Math.floor(Math.random()*700);
    }
    drawPlane(x,y){        
        ctx.beginPath();
        ctx.clearRect(x, y-32, 32, 64);
        ctx.drawImage(plane, x, y);
        ctx.rect(x, y, 32, 32);
        ctx.closePath();
        };
    interval(){
        let y = 0;
        let x = this.xPosition;
        let that = this;
        this.intervalReset = setInterval(function(){
            y += 1;
            that.yPosition = y;
            that.drawPlane(x,y);
        },20);
        return y;
    }
    
}



   let counter = 0;
   let enemyArray = [];

function createEnemy(){
    
    if(counter < 10){
        enemyArray[counter] = new Enemy();
        setTimeout(createEnemy, 2000);
        counter++;
    }  

}
canvas.addEventListener('click', function(e){
     let rect = canvas.getBoundingClientRect();
   let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  //  ammo--;
    
    enemyArray.forEach(obj => {
        if(((obj.xPosition + 32) > x && x > obj.xPosition) && ((obj.yPosition + 32) > y && y > obj.yPosition)){
            clearInterval(obj.intervalReset);
        }
    });
//  if(((aa3.xPosition + 32) > x && x > aa3.xPosition) && ((aa3.yPosition + 32) > y && y > aa.yPosition)){
//         console.log("trafiony obiekt aa3");
//    }
    //clearInterval(enemyArray[e].intervalReset);
})
createEnemy();
