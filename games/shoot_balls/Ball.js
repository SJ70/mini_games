export class Ball{

    constructor(canvas){
        this.initial_r = canvas.area/15 + Math.random()*(canvas.area/30);
        this.r = this.initial_r;
        this.x = this.r + (Math.random()*canvas.width/2);
        this.dx = (Math.random()>0.5 ? 1 : -1) * (Math.random()*canvas.width/300);
        this.y = canvas.height + this.r;
        this.dy = -1 * (canvas.height/25 + Math.random()*canvas.height/1000); 
        this.ddy = -1 * (canvas.height/1200);
        this.color = Math.random()*360;
        this.opacity = 100;

        this.destroyed = false;
        this.explode_r = this.initial_r;
        this.explode_dr = this.explode_r/3;
    }

    move(dt){
        this.x += this.dx * dt * 60;
        if(this.x<0) this.dx *= -1;
        this.y += this.dy * dt * 60;
        this.dy -= this.ddy * dt * 60;
    }
    draw(ctx, canvas){
        ctx.fillStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
        ctx.beginPath();
        ctx.arc(this.x+this.initial_r, this.y+this.initial_r, this.r, 0, Math.PI*2);
        ctx.fill();

        if(this.destroyed){
            ctx.strokeStyle = 'hsla('+this.color+',100%,80%,'+this.opacity+'%)';
            ctx.beginPath();
            ctx.arc(this.x+this.initial_r, this.y+this.initial_r, this.explode_r, 0, Math.PI*2);
            ctx.lineWidth = canvas.area/300;
            ctx.stroke();
        }
    }
    //todo 충돌 구현...
    isCrashed(info){
        return (Math.pow(this.r+info[2],2) >= (Math.pow(this.x-info[0],2) + Math.pow(this.y-info[1],2)));
    }
    setDestroyed(bool){
        this.destroyed = bool;
    }
    destroy(){
        this.r *= 0.75;
        this.explode_r += this.explode_dr;
        this.explode_dr *= 0.9;
        this.opacity -= 5;
    }
    isDestroyed(){
        return this.destroyed;
    }
    isDisappeared(){
        return (this.opacity < 0); 
    }
    isOutOfMap(canvas){
        return (this.y > canvas.height+this.r);
    }
}
export default Ball