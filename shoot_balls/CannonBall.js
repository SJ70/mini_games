export class CannonBall{

    constructor(canvas,x,y,angle){
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
    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = '#151515';
        ctx.rotate(this.angle);
        ctx.scale(1.5,1);
        ctx.arc(0,0,this.size,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
    getPosAndSize(){
        return [this.x,this.y,this.size];
    }
    isOutOfMap(){
        return (this.x < -this.size) || (this.y < -this.size);
    }
}
export default CannonBall