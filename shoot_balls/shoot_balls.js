import Score from '../Score.js';
import { InitCanvasSize } from '../Canvas.js';

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
InitCanvasSize(canvas);

let score = new Score('rgba(30,30,30,0.2)', 'rgba(250,250,250,0.1)');
let cannon = new Cannon();

canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    cannon.shot(x,y);
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
    init_canvas_size();
}
window.onresize = function(){
    init();
}
window.onload = function(){
    init();
}

let balls = [];
function Ball(){
    this.initial_r = canvas.height/15 + Math.random()*(canvas.height/30);
    this.r = this.initial_r;
    this.x = this.r + (Math.random()*canvas.width/2);
    this.dx = (Math.random()>0.5 ? 1 : -1) * (Math.random()*canvas.width/300);
    this.y = canvas.height + this.r;
    this.dy = -1 * (canvas.height/25 + Math.random()*canvas.height/1000); 
    this.ddy = -1 * (canvas.height/1200);
    this.color = Math.random()*360;
    this.opacity = 100;

    this.destroyed = false;
    this.explode_r = this.initial_r;
    this.explode_dr = this.explode_r/3;

    this.move = function(){
        this.x += this.dx;
        if(this.x<0) this.dx*=-1;
        this.y += this.dy;
        this.dy -= this.ddy;
    }
    this.draw = function(){
        ctx.fillStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        ctx.beginPath();
        ctx.arc(this.x+this.initial_r, this.y+this.initial_r, this.r, 0, Math.PI*2);
        ctx.fill();

        if(this.destroyed){
            ctx.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
            ctx.beginPath();
            ctx.arc(this.x+this.initial_r, this.y+this.initial_r, this.explode_r, 0, Math.PI*2);
            ctx.lineWidth = canvas.diag/300;
            ctx.stroke();
        }
    }
    //todo 충돌 구현...
    this.checkCrashed = function(info){
        if(Math.pow(this.r+info[2],2) >= (Math.pow(this.x-info[0],2) + Math.pow(this.y-info[1],2))){
            this.destroyed = true;
        }
    }
    this.destroy = function(){
        this.r *= 0.75;
        this.explode_r += this.explode_dr;
        this.explode_dr *= 0.9;
        this.opacity -= 5;
    }
    this.isDestroyed = function(){
        return this.destroyed;
    }
    this.isDisappeared = function(){
        return (this.opacity < 0) || (this.y > canvas.height+this.r);
    }
}

function Cannon(){
    this.x = 0;
    this.y = 0;
    this.delay = 0;
    this.shotDelay = 20;
    this.angle = 0;

    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    }
    this.draw = function(){

        let size_var = Math.log(_minSpawnRate-this.delay)*5;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#151515';
        ctx.lineWidth = canvas.diag/25 - size_var;
        ctx.translate(canvas.width, canvas.height);
        let dx = this.x - canvas.width;
        let dy = this.y - canvas.height;
        this.angle = 270*Math.PI/180 + Math.asin(dx / Math.sqrt(dx*dx+dy*dy));
        ctx.rotate(this.angle);
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.diag/30 + size_var, 0);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = '#151515';
        ctx.arc(canvas.width, canvas.height, canvas.diag/40 + size_var/1.5, 0, Math.PI*2);
        ctx.fill();

    }
    this.decreaseDelay = function(){
        if(this.delay>0) this.delay--;
    }
    this.shot = function(x,y){
        if(this.delay==0){
            this.delay = this.shotDelay;
            cannonBalls.push(new CannonBall(x,y));
        } 
    }
    this.getAngle = function(){
        return this.angle;
    }
}

let cannonBalls = [];
function CannonBall(x,y){
    this.x = canvas.width;
    this.y = canvas.height;
    this.dx = x - this.x;
    this.dy = y - this.y;
    this.size = canvas.diag/100;
    this.angle = cannon.getAngle();

    this.speed = canvas.diag/15;

    this.move = function(){
        let d = Math.sqrt( this.dx*this.dx + this.dy*this.dy );
        this.x += this.speed * (this.dx/d);
        this.y += this.speed * (this.dy/d);
    }
    this.draw = function(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = '#151515';
        ctx.rotate(this.angle);
        ctx.scale(1.5,1);
        ctx.arc(0,0,this.size,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
    this.getPosAndSize = function(){
        return [this.x,this.y,this.size];
    }
    this.isOutOfMap = function(){
        return (this.x < -this.size) || (this.y < -this.size);
    }
}

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
        cannonBalls[i].draw();
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
        balls[i].draw();
    }
    balls = balls.filter(function(data){
        return !data.isDisappeared();
    });
}
function runCannon(){
    cannon.decreaseDelay();
    cannon.draw();
}
let _spawnRate = 60;
let _spawnCounter = 0;
const _minSpawnRate = 20;
function spawnBall(){
    if(++_spawnCounter >= _spawnRate){
        _spawnCounter = 0;
        balls.push(new Ball());

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

