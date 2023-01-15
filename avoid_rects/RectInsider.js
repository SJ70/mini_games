import Rect from './Rect.js';

export class RectInsider extends Rect{
    angle = 0;
    spinAngle = ((Math.random()>=0.5)?1:-1) * ( 0.1 + Math.random()*0.05 );
    opacity = 0;
    color = Math.random()*360;
    
    spawning = 0;
    
    constructor(canvas, ctx){
        super(canvas, ctx);
        this.size = Math.floor(Math.random()*(canvas.area/30)) + Math.floor((canvas.area/15));
        this.current_size = this.size * 30;
        this.x = this.size + Math.random() * (canvas.width - this.size*2);
        this.y = this.size + Math.random() * (canvas.height - this.size*2);
        this.dx = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*canvas.area/300);
        this.dy = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*canvas.area/300);
    }
    draw(){
        this.ctx.save();
        this.ctx.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.strokeRect(0 - this.current_size/2, 0 - this.current_size/2, this.current_size, this.current_size);
        this.ctx.restore();
    }
    move(){
        this.x += this.dx;
        if(this.x >= this.canvas.width - this.size*0.7 || this.x <= this.size*0.7)
            this.dx *= -1;

        this.y += this.dy;
        if(this.y >= this.canvas.height - this.size*0.7 || this.y <= this.size*0.7)
            this.dy *= -1;   
    }
    spawn(){
        if(this.current_size > this.size){
            this.current_size -= this.size/2;
            if(this.opacity<100) this.opacity += 2.5;
            this.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        }
    }
}
export default RectInsider;