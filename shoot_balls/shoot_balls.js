import Score from '../essential/Score.js';
import Ball from './Ball.js'
import Cannon from './Cannon.js'
import CannonBall from './CannonBall.js'
import { InitCanvasSize } from '../essential/Canvas.js';

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
InitCanvasSize(canvas);

let score = new Score('rgba(30,30,30,0.2)', 'rgba(250,250,250,0.1)');
let cannon = new Cannon();

canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    if(cannon.isReadyToShot()){
        cannon.resetDelay();
        cannonBalls.push(new CannonBall(canvas,x,y,cannon.getAngle()));
    }
}
let mouse_x = 0;
let mouse_y = 0;
canvas.onmousemove = function(event){
    mouse_x = event.clientX - ctx.canvas.offsetLeft;
    mouse_y = event.clientY - ctx.canvas.offsetTop;
    cannon.setPos(mouse_x,mouse_y);
}

init();
function init(){
    InitCanvasSize(canvas);
}
window.onresize = function(){
    init();
}
window.onload = function(){
    init();
}

let balls = [];

let cannonBalls = [];

function Run(){
    resetCanvas();
    runCannonBalls();
    runCannon();
    runScore();
    spawnBall();
    runBalls();
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
        if(balls[i].isDestroyed() == true){
            balls[i].destroy();
        }
        else{
            balls[i].move();
            for(let j=0; j<cannonBalls.length; j++){
                balls[i].checkCrashed(cannonBalls[j].getPosAndSize());
            }
        } 
        balls[i].draw(ctx,canvas);
    }
    balls = balls.filter(function(data){
        return !data.isDisappeared(canvas);
    });
}
function runCannon(){
    cannon.decreaseDelay();
    cannon.draw(ctx,canvas);
}
let _spawnRate = 60;
let _spawnCounter = 0;
const _minSpawnRate = 20;
function spawnBall(){
    if(++_spawnCounter >= _spawnRate){
        _spawnCounter = 0;
        balls.push(new Ball(canvas));

        if(_spawnRate>_minSpawnRate) _spawnRate *= 0.99;
        else if(_spawnRate<_minSpawnRate) _spawnRate = _minSpawnRate;
    }
}
function runScore(){
    score.setScore(1);
    score.draw(ctx,canvas,mouse_x,mouse_y,1,-1);
    score.draw_ClickToStart(ctx,canvas,mouse_x,mouse_y,1,-1);
}
Run();

