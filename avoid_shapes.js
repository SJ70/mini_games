const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let em = canvas.width*canvas.height;
let size = em / 30000;
console.log(size);

let mouse_x = 0;
let mouse_y = 0;
canvas.onmousemove = function(event){
    mouse_x = event.clientX - ctx.canvas.offsetLeft;
    mouse_y = event.clientY - ctx.canvas.offsetTop;
}

let rects = [];
function Rect(){
    this.size = Math.floor(Math.random()*size/2) + Math.floor(size);
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
        let dist = Math.sqrt(Math.pow(this.x - mouse_x, 2) + Math.pow(this.y - mouse_y, 2));
        if( dist <= (this.size*0.7) ){
            on_game=false;
        }
    }
    this.despawning = function(){
        this.current_size *= 1.2;
        this.opacity -= 2.5;
        this.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
    }
}

let on_game = false;
canvas.onclick = function(event){
    if(!on_game){
        on_game = true;
        addRect();
    }
}

function Animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawScore();
    if(on_game){
        for(let i=0; i<rects.length; i++){
            rects[i].moving();
            rects[i].spinning();
            rects[i].spawning();
            rects[i].draw();
            rects[i].check_crash();
        }
    }
    else{
        for(let i=0; i<rects.length; i++){
            rects[i].moving();
            rects[i].spinning();
            rects[i].despawning();
            rects[i].draw();
            if(rects[0].opacity==0) rects=[];
        }
    }
    requestAnimationFrame(Animate);
}
Animate();

function drawScore(){
    ctx.save();
    let size = (on_game) ? em/3000 : em/9000;
    let text = (on_game) ? rects.length-1 : "Click To Start";
    ctx.font = size+'px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.x = canvas.width/2 + (canvas.width/2 - mouse_x) * 0.05;
    this.y = canvas.height/2 + (canvas.height/2 - mouse_y) * 0.05;

    ctx.fillText(text, this.x, this.y);
    ctx.restore();
}

const _spawningScale = 30;
function addRect(){
    if(!on_game) return;
    rects.push(new Rect());
    setTimeout(addRect,1000);
}