export class MouseFollower{
    constructor(canvas, speedDivisor, x, y){
        this.speed = canvas.area / speedDivisor;
        this.setPos(x,y);
    }

    setPos(x,y){
        this.x = x;
        this.y = y;
    }
    
    move(mouse_x, mouse_y, dt){
        let dx = mouse_x - this.x;
        let dy = mouse_y - this.y;
        let d = Number(Math.sqrt( dx*dx + dy*dy ));

        console.log(this.x, this.y);
        if(d < this.speed * dt * 60){
            this.x = mouse_x;
            this.y = mouse_y;
        }
        else{
            let dx2 = this.speed * Math.sqrt(d*d - dy*dy) * 60 * dt;
            if (isNaN(dx2)) dx2 = 0.000000000001;
            this.x += (dx>0?1:-1) * dx2; 

            let dy2 = this.speed * Math.sqrt(d*d - dx*dx) * 60 * dt;
            if (isNaN(dy2)) dy2 = 0.000000000001;
            this.y += (dy>0?1:-1) * dy2;
        }
    }
}
export default MouseFollower;