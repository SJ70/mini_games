import Score from '../essential/Score.js';
import Player from './Player.js';
import RectInsider from './RectInsider.js';
import RectOutsider from './RectOutsider.js';
import { CanvasResize } from '../essential/Canvas.js';

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
CanvasResize(canvas);

let player = new Player(canvas, 0.01, 1, 1);
let rects = [];
let rectEdge = new RectOutsider(canvas);
let on_game = false;
let score = new Score('rgba(135,135,135,0.2)', 'rgba(15,15,15,0.1)');

canvas.onclick = function(event){
    if(!on_game){
        gamestart();
    }
}
canvas.onmousemove = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    player.setDestPos(x,y);
}
function gamestart(){
    on_game = true;
    score.setScore(0);
}
function gameover(){
    on_game = false;
    rects = [];
}
window.onresize = function(){
    gameover();
    CanvasResize(canvas);
    rectEdge.resize(canvas);
    player.resize(canvas);
}
window.onload = function(){
    gameover();
}

function addRect(){
    if(on_game){
        rects.push(new RectInsider(canvas));
        score.addScore();
    }
}

let _spawnCounter = 0;
function Animate(){
    ctx.fillStyle = "#151515";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    rectEdge.move(canvas);
    rectEdge.spin();
    rectEdge.draw(ctx);
    if(rectEdge.isCrashed(player.getX(),player.getY())) gameover();

    if(on_game) player.decreaseSize();
    else player.increaseSize();
    player.move();
    player.draw(ctx, 'rgb(255,255,255)');

    score.draw_ClickToStart(ctx, canvas, player.getX(), player.getY(),-1,-1);
    score.draw(ctx, canvas, player.getX(), player.getY(),-1,-1);

    for(let i=0; i<rects.length; i++){
        rects[i].move(canvas);
        rects[i].spin();
        rects[i].spawn();
        rects[i].draw(ctx);
        if(rects[i].isCrashed(player.getX(),player.getY())) gameover();
    }
    _spawnCounter++;
    if(_spawnCounter==60){
        _spawnCounter=0;
        addRect();
    }
    requestAnimationFrame(Animate);
}
Animate();