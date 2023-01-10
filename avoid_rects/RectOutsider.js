import Rect from './Rect.js';

export class RectOutsider extends Rect{
    x = 0;
    y = 0;
    dx;
    dy = 0;
    angle = 0;
    spinAngle = -0.15;
    
    constructor(canvas){
        super();
        this.speed = Math.floor((canvas.area/100));
        this.dx = this.speed;
        this.size = canvas.area/20;
    }
    resize(canvas){
        this.speed = Math.floor((canvas.area/100));
        this.dx = this.speed;
        this.size = canvas.area/20;
    }
    draw(ctx){
        ctx.save();
        ctx.strokeStyle = 'white';
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);
        ctx.restore();
    }
    move(canvas){
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
export default RectOutsider;