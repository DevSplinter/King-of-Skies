const canvas = document.querySelector('#game-box');
const ctx = canvas.getContext('2d');
const plane = document.querySelector('.legend__img');
let canvasTop = canvas.offsetTop;
const button = document.querySelector('.btn-start-game');
const cashOutput = document.querySelector('.control-panel__cash');
const lifeOutput = document.querySelector('.control-panel__life');
const ammoOutput = document.querySelector('.control-panel__ammo');
const ammoIcon = document.querySelector('.control-panel__ammo-icon');
let counter = 0;
const enemyArray = [];

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
            that.checkCrash();
        },10);
        return y;
    }
    checkCrash(){
        if (this.yPosition > 500){
            clearInterval(this.intervalReset);
            player.life--;
            lifeOutput.value = `${player.life}`;
            if(player.life < 1){
                player.finishGame();
            }
        }
    }  
}

const player = {
    life: 2,
    alive: true,
    ammo: 30,
    cash: 0,
    finishGame(){
        console.log("przegrałeś!");
        this.alive = false;
        enemyArray.forEach(obj => clearInterval(obj.intervalReset));
    }
}

function createEnemy(){
    
    if(counter < 10 && player.alive){
        enemyArray[counter] = new Enemy();
        setTimeout(createEnemy, 800);
        counter++;
    }  
}

function game(){
    canvas.addEventListener('click', function(e){
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;   
        
        if(player.ammo > 0){
            ammoIcon.classList.add('control-panel__ammo-icon--shoot');
            ammoIcon.addEventListener('animationend', function(){
                this.classList.remove('control-panel__ammo-icon--shoot');
            });
            player.ammo--;
            ammoOutput.value = `${player.ammo}`;
        }else{
            ammoIcon.classList.add('control-panel__ammo-icon--out');
            console.log("brak amunicji!!!");
            return;
        }
        
        enemyArray.forEach(obj => {
            if(((obj.xPosition + 32) > x && x > obj.xPosition) && ((obj.yPosition + 32) > y && y > obj.yPosition)){
                player.cash += obj.cash;
                cashOutput.value = `${player.cash}`;
                clearInterval(obj.intervalReset);
                obj.cash = 0;
            } 
        });
    }) 
}

button.addEventListener('click', function(){
    createEnemy();
    button.parentElement.removeChild(button);
});

game();