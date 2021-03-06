const canvas = document.querySelector('#game-box');
const ctx = canvas.getContext('2d');
const jetPlane = document.querySelector('.legend__img-jet');
const heavyPlane = document.querySelector('.legend__img-heavy');
let canvasTop = canvas.offsetTop;
const button = document.querySelector('.btn-start-game');
const cashOutput = document.querySelector('.control-panel__cash');
const lifeOutput = document.querySelector('.control-panel__life');
const ammoOutput = document.querySelector('.control-panel__ammo');
const ammoIcon = document.querySelector('.control-panel__ammo-icon');
const levelOutput = document.querySelector('.control-panel__level');
let counter = 0;
const enemyArray = [];
let startGame = false;

class Enemy{
    constructor(speed, type){
        this.speed = speed;
        this.type = type;
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
        ctx.clearRect(x, y-1, 32, 32);
        ctx.drawImage(this.type, x, y);
        ctx.rect(x, y, 32, 32);
        ctx.closePath();
        };
    interval(){
        let y = 0;
        let x = this.xPosition;
        let that = this;
        let speed = this.speed;
        this.intervalReset = setInterval(function(){
            y += 1;
            that.yPosition = y;
            that.drawPlane(x,y);
            that.checkCrash();
        }, speed);
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
    removePlane(x, y){
        ctx.beginPath();
        ctx.clearRect(x, y, 32, 32);
        ctx.closePath();
    }
}

class ModernJet extends Enemy {
    constructor(speed){
        super(speed, jetPlane);
        this.life = 1;
        this.cash = 30;
    }
    
}

class HeavyPlane extends Enemy {
    constructor(speed){
        super(speed, heavyPlane);
        this.life = 2;
        this.cash = 50;
    }
}

const player = {
    life: 2,
    alive: true,
    ammo: 130,
    cash: 0,
    finishGame(){
        console.log("przegrałeś!");
        this.alive = false;
        enemyArray.forEach(obj => clearInterval(obj.intervalReset));
    }
}

const levels = {
    first: {
        name: "Poziom 1",
        speed: 20,
        enemySum: 15,
        difficulty: 5
    },
    second: {
        name: "Poziom 2",
        speed: 15,
        enemySum: 40,
        difficulty: 4
    },
    third: {
        name: "Poziom 3",
        speed: 10,
        enemySum: 65,
        difficulty: 2
    }
}

function levelController(){
    if(counter < levels.first.enemySum) {
        fillLevelInfo(levels.first.name);
        createEnemy(levels.first.speed, levels.first.difficulty);
    }else if(counter < levels.second.enemySum){
        fillLevelInfo(levels.second.name);
        createEnemy(levels.second.speed, levels.second.difficulty);
    }else if(counter < levels.third.enemySum){
        fillLevelInfo(levels.third.name);
        createEnemy(levels.third.speed, levels.third.difficulty);
    }
}

function createEnemy(speed, difficulty){
    if(player.alive){
        if(counter % difficulty != 0){
            enemyArray[counter] = new ModernJet(speed);
            setTimeout(levelController, 800);
            counter++;
        }else{
            enemyArray[counter] = new HeavyPlane(speed);
            setTimeout(levelController, 800);
            counter++;
        }
    }
}

function fillLevelInfo(nameLabel){
    if(nameLabel != levelOutput.value){
        levelOutput.value = `${nameLabel}`;
    }
}

function game(){
    canvas.addEventListener('click', function(e){
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;   
        
        if(player.ammo > 0 && player.alive && startGame){
            ammoIcon.classList.add('control-panel__ammo-icon--shoot');
            ammoIcon.addEventListener('animationend', function(){
                this.classList.remove('control-panel__ammo-icon--shoot');
            });
            player.ammo--;
            ammoOutput.value = `${player.ammo}`;
        }else if(startGame){
            ammoIcon.classList.add('control-panel__ammo-icon--out');
            console.log("brak amunicji!!!");
            return;
        }
        
        enemyArray.forEach((obj, index) => {
            if(((obj.xPosition + 32) > x && x > obj.xPosition) && ((obj.yPosition + 32) > y && y > obj.yPosition)){
                obj.life--;
                if(obj.life < 1){
                    console.log(enemyArray);
                    player.cash += obj.cash;
                    cashOutput.value = `${player.cash}`;
                    clearInterval(obj.intervalReset);
                    obj.cash = 0;
                    obj.removePlane(obj.xPosition, obj.yPosition);
                    enemyArray.splice(index, 1);
                }
            } 
        });
    }); 
}

button.addEventListener('click', function(){
    startGame = true;
    levelController();
    button.parentElement.removeChild(button);
});

game();