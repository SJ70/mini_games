const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let em = canvas.width*canvas.height;
let size = em / 30000;
console.log(size);
let rects = [];

function Rect(){
    this.size = Math.floor(Math.random()*size/2) + size;
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
    this.update = function(){
        this.x += this.dx;
        if(this.x >= canvas.width - this.size || this.x <= this.size)
            this.dx *= -1;

        this.y += this.dy;
        if(this.y >= canvas.height - this.size || this.y <= this.size)
            this.dy *= -1;

        this.angle += this.spin;
        // console.log(this.x, this.y);        
    }
    this.reduceSize = function(){
        if(this.current_size > this.size){
            this.current_size -= this.size/2;
            this.opacity += 2.5;
            this.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
            setTimeout(this.reduceSize,10);
            console.log(111);
        }
    }
}

function drawScore(){
    ctx.font = "1em";
    ctx.fillStyle = 'white';
    ctx.fillText = rects.length;
}

function Animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0; i<rects.length; i++){
        drawScore();
        rects[i].update();
        rects[i].reduceSize();
        rects[i].draw();
    }
    requestAnimationFrame(Animate);
}
Animate();


const _spawningScale = 30;
function addRect(){
    rects.push(new Rect());
    setTimeout(addRect,1000);
}
addRect();