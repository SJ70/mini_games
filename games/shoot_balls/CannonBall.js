export class CannonBall{

    constructor(canvas,ctx,color,x,y,angle){
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
        this.x = canvas.width;
        this.y = canvas.height;
        this.dx = x - this.x;
        this.dy = y - this.y;
        this.size = canvas.area/60;
        this.angle = angle;
        this.speed = canvas.area/10;
    }

    move(){
        let d = Math.sqrt( this.dx*this.dx + this.dy*this.dy );
        this.x += this.speed * (this.dx/d);
        this.y += this.speed * (this.dy/d);
    }
    draw(){
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rotate(this.angle);
        this.ctx.scale(1.5,1);
        this.ctx.arc(0,0,this.size,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.restore();
    }
    getPosAndSize(){
        return [this.x,this.y,this.size];
    }
    isOutOfMap(){
        return (this.x < -this.size) || (this.y < -this.size);
    }
}
export default CannonBall