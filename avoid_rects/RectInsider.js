import Rect from './Rect.js';

export class RectInsider extends Rect{
    dx = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*3);
    dy = ((Math.random()>=0.5)?1:-1) * ( 1 +Math.random()*3);
    angle = 0;
    spinAngle = ((Math.random()>=0.5)?1:-1) * ( 0.1 + Math.random()*0.05 );
    opacity = 0;
    color = Math.random()*360;
    
    spawning = 0;
    
    constructor(canvas){
        super();
        this.size = Math.floor(Math.random()*(canvas.diag/40)) + Math.floor((canvas.diag/40));
        this.current_size = this.size * 30;
        this.x = this.size + Math.random() * (canvas.width - this.size*2);
        this.y = this.size + Math.random() * (canvas.height - this.size*2);
    }
    draw(ctx){
        ctx.save();
        ctx.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeRect(0 - this.current_size/2, 0 - this.current_size/2, this.current_size, this.current_size);
        ctx.restore();
    }
    move(canvas){
        this.x += this.dx;
        if(this.x >= canvas.width - this.size*0.7 || this.x <= this.size*0.7)
            this.dx *= -1;

        this.y += this.dy;
        if(this.y >= canvas.height - this.size*0.7 || this.y <= this.size*0.7)
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