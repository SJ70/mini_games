import Dot from '../essential/Dot.js';

export class Cannon extends Dot{
    x = 0;
    y = 0;
    delay = 0;
    shotDelay = 20;
    angle = 0;

    constructor(canvas,x,y){
        super(canvas,x,y);
    }

    setPos(x,y){
        this.x = x;
        this.y = y;
    }
    drawCannon(ctx, canvas){
        let size_var = Math.log(this.shotDelay-this.delay)*5;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#151515';
        ctx.lineWidth = canvas.diag/25 - size_var;
        ctx.translate(canvas.width, canvas.height);
        let dx = this.x - canvas.width;
        let dy = this.y - canvas.height;
        this.angle = 270*Math.PI/180 + Math.asin(dx / Math.sqrt(dx*dx+dy*dy));
        ctx.rotate(this.angle);
        ctx.moveTo(0,0);
        ctx.lineTo(canvas.diag/30 + size_var, 0);
        ctx.stroke();
        ctx.restore();
        
        ctx.beginPath();
        ctx.fillStyle = '#151515';
        ctx.arc(canvas.width, canvas.height, canvas.diag/40 + size_var/1.5, 0, Math.PI*2);
        ctx.fill();
    }
    decreaseDelay(){
        if(this.delay>0) this.delay--;
    }
    isReadyToShot(){
        return this.delay==0;
    }
    resetDelay(){
        this.delay = this.shotDelay;
    }
    getAngle(){
        return this.angle;
    }
}
export default Cannon