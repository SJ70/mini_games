import CircleEffector from '../essential/CircleEffector.js';
import MouseFollower from '../essential/MouseFollower.js';
import Score from '../essential/Score.js';
import { canvasResize } from '../essential/Canvas.js';
import Ball from './Ball.js'
import Cannon from './Cannon.js'
import CannonBall from './CannonBall.js'

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
canvasResize(canvas);
let score = new Score('rgba(120,120,120,0.2)', 'rgba(250,250,250,0.1)');
let cannon = new Cannon(canvas);
let on_game = false;

canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    if(!on_game){
        gamestart();
    }
    else{
        if(cannon.isReadyToShot()){
            cannon.resetDelay();
            cannonBalls.push(new CannonBall(canvas,x,y,cannon.getAngle()));
        }
    }
}
let mouse_x = 0;
let mouse_y = 0;
canvas.onmousemove = function(event){
    mouse_x = event.clientX - ctx.canvas.offsetLeft;
    mouse_y = event.clientY - ctx.canvas.offsetTop;
    cannon.setPos(mouse_x,mouse_y);
}

window.onresize = function(){
    gameover();
    canvasResize(canvas);
}
window.onload = function(){
    canvasResize(canvas);
}

let balls = [];
let cannonBalls = [];

function gamestart(){
    on_game = true;
    score.setScore(0);
    _spawnRate = _maxSpawnRate;
}
function gameover(){
    on_game = false;
    for(let j=0; j<balls.length; j++){
        balls[j].setDestroyed(true);
    }
}
function Run(){
    resetCanvas();
    runCannonBalls();
    if(!on_game) runBalls();
    runCannon();
    runScore();
    spawnBall();
    if(on_game) runBalls();
    requestAnimationFrame(Run);
}
function resetCanvas(){
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
function runCannonBalls(){
    for(let i=0; i<cannonBalls.length; i++){
        cannonBalls[i].move();
        cannonBalls[i].draw(ctx);
    }
    if(cannonBalls.length>0 && cannonBalls[0].isOutOfMap() == true) cannonBalls.shift();
}
function runBalls(){
    for(let i=0; i<balls.length; i++){
        if(!balls[i].isDestroyed() && balls[i].isOutOfMap(canvas)){
            gameover();
        }
        if(balls[i].isDestroyed()){
            balls[i].destroy();
        }
        else{
            balls[i].move();
            for(let j=0; j<cannonBalls.length; j++){
                if(balls[i].isCrashed(cannonBalls[j].getPosAndSize())){
                    balls[i].setDestroyed(true);
                    score.addScore();
                }
            }
        } 
        balls[i].draw(ctx,canvas);
    }
    balls = balls.filter(function(data){
        return !data.isDisappeared(canvas);
    });
}
function runCannon(){
    if(on_game) cannon.decreaseSize();
    else cannon.increaseSize();
    cannon.decreaseDelay();
    cannon.drawCannon(ctx,canvas);
    cannon.draw(ctx,canvas.width,canvas.height);
}
let _spawnRate = 60;
let _spawnCounter = 0;
const _maxSpawnRate = 60;
const _minSpawnRate = 20;
function spawnBall(){
    if(!on_game) return;
    if(++_spawnCounter >= _spawnRate){
        _spawnCounter = 0;
        balls.push(new Ball(canvas));

        if(_spawnRate>_minSpawnRate) _spawnRate *= 0.99;
        else if(_spawnRate<_minSpawnRate) _spawnRate = _minSpawnRate;
    }
}
function runScore(){
    score.draw(ctx,canvas,mouse_x,mouse_y,1,-1);
    score.draw_ClickToStart(ctx,canvas,mouse_x,mouse_y,1,-1);
}
Run();

