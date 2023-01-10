export class MouseFollower{
    x=0;
    y=0;

    constructor(canvas, speedDivisor){
        this.speed = canvas.area/speedDivisor;
        this.x_dest=0;
        this.y_dest=0;
    }
    
    setDestPos(x,y){
        this.x_dest=x;
        this.y_dest=y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    
    move(){
        let dx = this.x_dest - this.x;
        let dy = this.y_dest - this.y;
        let d = Number(Math.sqrt( dx*dx + dy*dy ));

        if(d < this.speed){
            this.x = this.x_dest;
            this.y = this.y_dest;
        }
        else{
            this.x += (dx>0?1:-1) * this.speed * Math.sqrt(d*d - dy*dy); 
            this.y += (dy>0?1:-1) * this.speed * Math.sqrt(d*d - dx*dx);
        }
    }
}
export default MouseFollower;