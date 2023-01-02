const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let rects = [];

function Rect(){
    this.size = Math.random()*10 + 20;
    this.x = this.size + Math.random() * (canvas.width - this.size*2);
    this.y = this.size + Math.random() * (canvas.height - this.size*2);
    this.dx = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*3);
    this.dy = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*3);
    this.angle = 0;
    this.spin = ((Math.random()>=0.5)?1:-1) * ( 0.1 + Math.random()*0.05 );
    this.color = 'hsl('+Math.random()*360+',100%,75%)';
    this.spawning = 0;
    this.draw = function(){
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if(this.spawning<1){
            ctx.beginPath();
            ctx.arc(0,0,1,0,Math.PI*2);
            ctx.stroke();
        }    
        else{
            ctx.strokeRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);
        }

        ctx.restore();
    }
    this.update = function(){
        this.x += this.dx;
        if(this.x >= canvas.width - this.size || this.x <= this.size)
            this.dx *= -1;

        this.y += this.dy;
        if(this.y >= canvas.height - this.size || this.y <= this.size)
            this.dy *= -1;

        if(this.spawning<0){

        }

        this.angle += this.spin;
        console.log(this.x, this.y);        
    }
}

function Animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0; i<rects.length; i++){
        rects[i].update();
        rects[i].draw();
    }
    requestAnimationFrame(Animate);
}

Animate();

let spawnrate = 1;
function addRect(){
    if(rects.length>0) rects[rects.length-1].spawning = 1;
    rects.push(new Rect());
    setTimeout(addRect,1000);
}
addRect();