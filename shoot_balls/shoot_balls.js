const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
init_canvas_size = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);
}
init_canvas_size();


canvas.onclick = function(event){
    console.log('click');
}

canvas.onmousemove = function(event){
    console.log('move');
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

let _spawnrate = 60;
let _spawnCounter = 0;
function Animate(){
    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0; i<balls.length; i++){
        balls[i].move();
        balls[i].draw();
    }


    if(++_spawnCounter >= _spawnrate){
        if(_spawnrate>20) _spawnrate *= 0.99;
        _spawnCounter = 0;
        console.log(_spawnrate);
        balls.push(new Ball());
    }

    requestAnimationFrame(Animate);
}
Animate();

