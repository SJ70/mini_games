const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);
console.log(canvas.diag);
console.log(canvas.diag/5000);

canvas.onmousemove = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;
    player.setPos(x,y);
}
let player = new Player();
function Player(){
    this.x_dest = 0;
    this.y_dest = 0;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.speed = canvas.diag/5000;

    this.MinSize = Math.round(canvas.diag/150);
    this.MaxSize = this.MinSize*201;
    this.SizeTolerance = this.MinSize*10;
    this.size = this.MaxSize;

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

const _spawningScale = 30;
let rects = [];
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
    
    this.current_size = this.size * _spawningScale;
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
}
function addRect(){
    if(on_game){
        rects.push(new Rect());
        score.check();
    }
    setTimeout(addRect,1000);
}

let rectEdge = new RectEdge();
function RectEdge(){
    this.size = canvas.diag/10000;
    this.x = 0;
    this.y = 0;
    this.color = Math.random()*360;
}

let on_game = false;
canvas.onclick = function(event){
    if(!on_game){
        on_game = true;
    }
}
function gameover(){
    on_game = false;
    rects = [];
}

let score = new Score();
function Score(){
    this.score = 0;
    this.check = function(){
        this.score=rects.length-1;
    }
    this.draw = function(){
        ctx.font = canvas.diag/4+'px Arial';
        ctx.fillStyle = 'rgba(135,135,135,0.2)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        this.x = canvas.width/2 + (canvas.width/2 - player.getX()) * 0.05;
        this.y = canvas.height/2 + (canvas.height/2 - player.getY()) * 0.05;
       
        ctx.save();
        ctx.fillText(this.score, this.x, this.y);
        ctx.restore();
    }
}

function draw_ClickToStart(){
    ctx.save();
    ctx.font = canvas.diag/12+'px Arial';
    ctx.fillStyle = 'rgba(15,15,15,0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    this.x = canvas.width/2 + (canvas.width/2 - player.getX()) * 0.1;
    this.y = canvas.height/5*3 + (canvas.height/2 - player.getY()) * 0.1;
    ctx.fillText("Click to Start", this.x, this.y);
    ctx.restore();
}

function Animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    player.animate();
    player.move();
    player.draw();
    draw_ClickToStart();
    score.draw();

    for(let i=0; i<rects.length; i++){
        rects[i].moving();
        rects[i].spinning();
        rects[i].spawning();
        rects[i].draw();
        rects[i].check_crash();
    }
    requestAnimationFrame(Animate);
}
Animate();
addRect();