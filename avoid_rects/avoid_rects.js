import Score from '../essential/Score.js';
import Player from './Player.js';
import RectInsider from './RectInsider.js';
import RectOutsider from './RectOutsider.js';
import { InitCanvasSize } from '../essential/Canvas.js';

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
InitCanvasSize(canvas);

let player = new Player(canvas, 0, 0, canvas.diag/5000, Math.round(canvas.diag/150));
player.setSpeed(canvas);
let rects = [];
let RectEdge = new RectOutsider(canvas);
let on_game = false;
let score = new Score('rgba(135,135,135,0.2)', 'rgba(15,15,15,0.1)');

canvas.onclick = function(event){
    if(!on_game){
        on_game = true;
    }
}
function gameover(){
    on_game = false;
    rects = [];
}
init();
function init(){
    gameover();
    InitCanvasSize(canvas);
}
window.onresize = function(){
    init();
}
window.onload = function(){
    init();
}

canvas.onmousemove = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    player.setPos(x,y);
}

function addRect(){
    if(on_game){
        rects.push(new RectInsider(canvas));
        score.setScore(rects.length-1);
    }
}

let _spawnCounter = 0;
function Animate(){
    ctx.fillStyle = "#151515";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    RectEdge.move(canvas);
    RectEdge.spin();
    RectEdge.draw(ctx);
    if(RectEdge.isCrashed(player.getX(),player.getY())) gameover();

    player.changeSize(on_game);
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