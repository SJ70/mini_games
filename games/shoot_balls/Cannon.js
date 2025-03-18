export class Cannon{
    delay = 0;
    shotDelay = 20;
    angle = 0;

    constructor(canvas, ctx, color){
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
    }
    draw(mouse_x, mouse_y){
        let size_var = Math.log(this.shotDelay-this.delay)*5;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.canvas.area*0.06 - size_var;
        this.ctx.translate(this.canvas.width, this.canvas.height);
        let dx = mouse_x - this.canvas.width;
        let dy = mouse_y - this.canvas.height;
        this.angle = 270*Math.PI/180 + Math.asin(dx / Math.sqrt(dx*dx+dy*dy));
        this.ctx.rotate(this.angle);
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(this.canvas.area*0.0525 + size_var, 0);
        this.ctx.stroke();
        this.ctx.restore();
        
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.canvas.width, this.canvas.height, this.canvas.area*0.04 + size_var/1.5, 0, Math.PI*2);
        this.ctx.fill();
    }
    decreaseDelay(dt){
        if(this.delay > 0) this.delay -= dt * 60;
        if(this.delay < 0) this.delay = 0;
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