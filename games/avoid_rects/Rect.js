export class Rect{
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
    }
    spin(dt){
        this.angle += this.spinAngle * dt * 60;
    }
    isCrashed(x, y){
        if(this.current_size > this.size) return false;
        let dist = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
        return dist <= (this.size*0.7) ;
    }
}
export default Rect;