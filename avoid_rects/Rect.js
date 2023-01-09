export class Rect{
    constructor(){
    }
    spin(){
        this.angle += this.spinAngle;  
    }
    isCrashed(x, y){
        if(this.current_size > this.size) return false;
        let dist = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
        return dist <= (this.size*0.7) ;
    }
}
export default Rect;