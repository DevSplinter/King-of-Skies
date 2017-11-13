let canvas = document.querySelector('#game-box');
let ctx = canvas.getContext('2d');

let plane = document.querySelector('img');
let canvasTop = canvas.offsetTop;
let sth2 = false;

     
//function drawPlane(){
//    zmienna = setInterval(function(){
//        sth += 1;
//    ctx.beginPath();
//        ctx.clearRect(80, sth, 32,32);
//    ctx.drawImage(plane, 80, sth);
//    ctx.rect(80,sth,32,32);
//    ctx.closePath();
//    },30);
//    
//}
canvas.addEventListener('click', function(e){
    let rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
//    ctx.rect(80,100,32,32);
    if (ctx.isPointInPath(x,y)){
        clearInterval(this.intervalPlane);
        console.log('trafiony');
    }
    
});



class Enemy{
    constructor(){
        this.life = 2;
        this.cash = 50;
        this.intervalPlane;
        this.xPosition = this.randPosition();
        this.drawPlane();
        
    }
    drawPlane(){
        let intervalPlane = this.intervalPlane;
        let x = this.xPosition;
        let y = 0;
        
        intervalPlane = setInterval(function(){
        y += 1;
//        ctx.beginPath();
        ctx.clearRect(x, 0, 32, y+32);
        ctx.drawImage(plane, x, y);
        ctx.rect(x, y, 32, 32);
        ctx.closePath();
        },150);
    }
    randPosition(){
       return Math.floor(Math.random()*500);
    }
}
let aa = new Enemy();
let aa2 = new Enemy();
let aa3 = new Enemy();

console.log(aa.xPosition + ', ' + aa3.xPosition)
    