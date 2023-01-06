import Score from '../Score.js';

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);

let player = new Player();
let rects = [];
let rectEdge = new Rect();

let on_game = false;
canvas.onclick = function(event){
    if(!on_game){
        on_game = true;
        player.resize_until_start();
    }
}
function gameover(){
    on_game = false;
    rects = [];
}
init();
function init(){
    gameover();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);
    player.init();
    rectEdge.edge_init();
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
function Player(){
    this.x_dest = 0;
    this.y_dest = 0;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.size = Math.round(canvas.diag/150)*201;
    
    this.init = function(){
        this.speed = canvas.diag/5000;
        this.MinSize = Math.round(canvas.diag/150);
        this.MaxSize = this.MinSize*201;
        this.SizeTolerance = this.MinSize*10;
    }
    this.resize_until_start = function(){
        this.size = this.MaxSize;
    }

    this.getX = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    this.setPos = function(x,y){
        this.x_dest=x;
        this.y_dest=y;
    }
    this.animate = function(){
        if(on_game){
            if(this.size>this.MinSize) this.size -= this.SizeTolerance;
        }
        else{
            if(this.size<this.MaxSize) this.size += this.SizeTolerance;
        }
    }
    this.move = function(){
        let dx = this.x_dest - this.x;
        let dy = this.y_dest - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );

        if(d < this.speed){
            this.x = this.x_dest;
            this.y = this.y_dest;
        }
        else{
            this.x += (dx>0?1:-1) * this.speed * Math.sqrt(d*d - dy*dy); 
            this.y += (dy>0?1:-1) * this.speed * Math.sqrt(d*d - dx*dx);
        }
    }
    this.draw = function(){
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function Rect(){
    this.size = Math.floor(Math.random()*(canvas.diag/40)) + Math.floor((canvas.diag/40));
    this.x = this.size + Math.random() * (canvas.width - this.size*2);
    this.y = this.size + Math.random() * (canvas.height - this.size*2);
    this.dx = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*3);
    this.dy = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*3);
    this.angle = 0;
    this.spin = ((Math.random()>=0.5)?1:-1) * ( 0.1 + Math.random()*0.05 );
    this.opacity = 0;
    this.color = Math.random()*360;
    
    this.current_size = this.size * 30;
    this.spawning = 0;

    this.draw = function(){
        ctx.save();
        ctx.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeRect(0 - this.current_size/2, 0 - this.current_size/2, this.current_size, this.current_size);
        ctx.restore();
    }
    this.moving = function(){
        this.x += this.dx;
        if(this.x >= canvas.width - this.size*0.7 || this.x <= this.size*0.7)
            this.dx *= -1;

        this.y += this.dy;
        if(this.y >= canvas.height - this.size*0.7 || this.y <= this.size*0.7)
            this.dy *= -1;   
    }
    this.spinning = function(){
        this.angle += this.spin;  
    }
    this.spawning = function(){
        if(this.current_size > this.size){
            this.current_size -= this.size/2;
            if(this.opacity<100) this.opacity += 2.5;
            this.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        }
    }
    this.check_crash = function(){
        if(this.current_size > this.size) return;
        let dist = Math.sqrt(Math.pow(this.x - player.getX(), 2) + Math.pow(this.y - player.getY(), 2));
        if( dist <= (this.size*0.7) ){
            gameover();
        }
    }
    this.edge_init = function(){
        this.speed = Math.floor((canvas.diag/100));
        this.angle = 0;
        this.spin = -0.15;
        this.size = canvas.diag/40;
        this.current_size = this.size;
        this.x = 0;
        this.y = 0;
        this.dx = this.speed;
        this.dy = 0;
    }
    this.edge_draw = function(){
        ctx.save();
        ctx.strokeStyle = 'white';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore();
    }
    this.edge_moving = function(){
        if(this.x<0){
            this.x=0;
            this.dx=0;
            this.dy=-this.speed;
        } 
        if(this.x>canvas.width){
            this.x=canvas.width;
            this.dx=0;
            this.dy=this.speed;
        } 
        if(this.y>canvas.height){
            this.y=canvas.height;
            this.dx=-this.speed;
            this.dy=0;
        } 
        if(this.y<0){
            this.y=0;
            this.dx=this.speed;
            this.dy=0;
        } 
        this.x += this.dx;
        this.y += this.dy;
    }
}
function addRect(){
    if(on_game){
        rects.push(new Rect());
        score.setScore(rects.length-1);
    }
}

let score = new Score();
score.setColor1('rgba(135,135,135,0.2)');
score.setColor2('rgba(15,15,15,0.1)');

let _spawnCounter = 0;
function Animate(){
    ctx.fillStyle = "#151515";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    rectEdge.edge_moving();
    rectEdge.spinning();
    rectEdge.edge_draw();
    rectEdge.check_crash();

    player.animate();
    player.move();
    player.draw();

    score.draw_ClickToStart(ctx, canvas, player.getX(), player.getY(),-1,-1);
    score.draw(ctx, canvas, player.getX(), player.getY(),-1,-1);

    for(let i=0; i<rects.length; i++){
        rects[i].moving();
        rects[i].spinning();
        rects[i].spawning();
        rects[i].draw();
        rects[i].check_crash();
    }
    _spawnCounter++;
    if(_spawnCounter==60){
        _spawnCounter=0;
        addRect();
    }
    requestAnimationFrame(Animate);
}
Animate();