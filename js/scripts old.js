let enemy = document.querySelector('.enemy');
const gameBox = document.querySelector('.game-box');
let sth = 0;

setInterval(function(){
    
    sth += 1;
    enemy.style.top = sth + 'px';
    console.log();
    if(enemy.offsetTop > 450){
        enemy.parentElement.removeChild(enemy);
    }
}, 1);

console.dir(enemy);


class Enemy {
    constructor(){
        this.enemy = {
               
        };
    }
    
}


//class Enemy {
//    constructor(){
//       this.createEnemy();
//        this.setPosition(this.newEnemy);
//        this.run(this.newEnemy);
//    }
//    createEnemy(){
//       const createNewEnemy = document.createElement('i');
//        createNewEnemy.className = 'enemy fa fa-fighter-jet';
//        const newEnemy = gameBox.appendChild(createNewEnemy);
//        return newEnemy;
//    }
//    setPosition(enemy){
//       let randWidthPosition = Math.floor(Math.random() * 500);
//        enemy.style.left = randWidthPosition + 'px';
//    } 
//    run(enemy){
//        let move = 0;
//        setInterval(function(){
//            move += 1;
//            enemy.style.top = move + 'px';
//        },300);
//    }
//}

let aa = new Enemy();