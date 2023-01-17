export class MouseFollower{
    constructor(canvas, speedDivisor, x, y){
        this.speed = canvas.area / speedDivisor;
        this.setPos(x,y);
    }

    setPos(x,y){
        this.x = x;
        this.y = y;
    }
    
    move(mouse_x, mouse_y){
        let dx = mouse_x - this.x;
        let dy = mouse_y - this.y;
        let d = Number(Math.sqrt( dx*dx + dy*dy ));

        if(d < this.speed){
            this.x = mouse_x;
            this.y = mouse_y;
        }
        else{
            this.x += (dx>0?1:-1) * this.speed * Math.sqrt(d*d - dy*dy); 
            this.y += (dy>0?1:-1) * this.speed * Math.sqrt(d*d - dx*dx);
        }
    }
}
export default MouseFollower;