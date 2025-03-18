import Rect from './Rect.js';

export class RectOutsider extends Rect{
    x = 0;
    y = 0;
    dx;
    dy = 0;
    angle = 0;
    spinAngle = -0.15;
    
    constructor(canvas, ctx){
        super(canvas, ctx);
        this.speed = Math.floor((this.canvas.area/100));
        this.dx = this.speed;
        this.size = this.canvas.area/20;
    }
    resize(){
        this.x=0;
        this.y=0;
        this.speed = Math.floor((this.canvas.area/100));
        this.dx = this.speed;
        this.dy = 0;
        this.size = this.canvas.area/20;
    }
    draw(){
        this.ctx.save();
        this.ctx.strokeStyle = 'white';
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.strokeRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);
        this.ctx.fillStyle = 'rgba(255,255,255,0.1)'
        this.ctx.fillRect(0 - this.size/2, 0 - this.size/2, this.size, this.size);
        this.ctx.restore();
    }
    move(dt){
        let adjustedSpeed = this.speed * dt * 60;
        if(this.x < 0){
            this.x = 0;
            this.dx = 0;
            this.dy = -adjustedSpeed;
        } 
        if(this.x > this.canvas.width){
            this.x = this.canvas.width;
            this.dx = 0;
            this.dy = adjustedSpeed;
        } 
        if(this.y > this.canvas.height){
            this.y = this.canvas.height;
            this.dx = -adjustedSpeed;
            this.dy = 0;
        } 
        if(this.y < 0){
            this.y = 0;
            this.dx = adjustedSpeed;
            this.dy = 0;
        } 
        this.x += this.dx * dt * 60;
        this.y += this.dy * dt * 60;
    }
}
export default RectOutsider;