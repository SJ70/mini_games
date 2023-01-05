const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
init_canvas_size = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);
}
init_canvas_size();

let cannon = new Cannon();

canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    cannon.shot(x,y);
}

canvas.onmousemove = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    cannon.setPos(x,y);
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
    this.r = canvas.height/15 + Math.random()*(canvas.height/30);
    this.x = this.r + (Math.random()*canvas.width/2);
    this.dx = (Math.random()>0.5 ? 1 : -1) * (Math.random()*canvas.width/300);
    this.y = canvas.height + this.r;
    this.dy = -1 * (canvas.height/25 + Math.random()*canvas.height/1000); 
    this.ddy = -1 * (canvas.height/1200);
    this.color = Math.random()*360;

    this.move = function(){
        this.x += this.dx;
        if(this.x<0) this.dx*=-1;
        this.y += this.dy;
        this.dy -= this.ddy;
    }
    this.draw = function(){
        ctx.fillStyle = 'hsla('+this.color+',100%,80%,100%)';
        ctx.beginPath();
        ctx.arc(this.x+this.r, this.y+this.r, this.r, 0, Math.PI*2);
        ctx.fill();
    }
}

function Cannon(){
    this.x = 0;
    this.y = 0;
    this.delay = 0;

    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    }
    this.draw = function(){

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#252525';
        ctx.lineWidth = canvas.diag/25 - (_minSpawnRate-this.delay)/1.5;
        ctx.translate(canvas.width, canvas.height);
        let dx = this.x - canvas.width;
        let dy = this.y - canvas.height;
        ctx.rotate(270*Math.PI/180 + Math.asin(dx / Math.sqrt(dx*dx+dy*dy)));
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.diag/30 + (_minSpawnRate-this.delay)/1.5, 0);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = '#151515';
        ctx.arc(canvas.width, canvas.height, canvas.diag/30, 0, Math.PI*2);
        ctx.fill();

    }
    this.decreaseDelay = function(){
        if(this.delay>0) this.delay--;
    }
    this.shot = function(x,y){
        if(this.delay==0){
            this.delay = _minSpawnRate;
            cannonBalls.push(new CannonBall(x,y));
        } 
    }
}

let cannonBalls = [];
function CannonBall(x,y){
    this.x = canvas.width;
    this.y = canvas.height;
    this.dx = x - this.x;
    this.dy = y - this.y;

    this.speed = canvas.diag/30;

    this.move = function(){
        let d = Math.sqrt( this.dx*this.dx + this.dy*this.dy );
        this.x += this.speed * (this.dx/d);
        this.y += this.speed * (this.dy/d);
    }
    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = '#151515';
        ctx.arc(this.x,this.y,canvas.diag/75,0,Math.PI*2);
        ctx.arc(this.x-canvas.width,this.y-canvas.height,canvas.diag/75,0,Math.PI*2);
        ctx.fill();
    }
}

let _spawnRate = 60;
let _spawnCounter = 0;
const _minSpawnRate = 20;
function Animate(){
    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    for(let i=0; i<balls.length; i++){
        balls[i].move();
        balls[i].draw();
    }
    for(let i=0; i<cannonBalls.length; i++){
        cannonBalls[i].move();
        cannonBalls[i].draw();
    }

    cannon.decreaseDelay();
    cannon.draw();
    // cannon.drawLine();

    if(++_spawnCounter >= _spawnRate){
        _spawnCounter = 0;
        console.log(_spawnRate);
        balls.push(new Ball());

        if(_spawnRate>_minSpawnRate) _spawnRate *= 0.99;
        else if(_spawnRate<_minSpawnRate) _spawnRate = _minSpawnRate;
    }


    requestAnimationFrame(Animate);
}
Animate();

