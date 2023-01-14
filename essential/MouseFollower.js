export class MouseFollower{

    constructor(canvas, speedDivisor){
        this.speed = canvas.area/speedDivisor;
        this.x_dest = canvas.width/2;
        this.y_dest = canvas.height/2;
        this.x = this.x_dest;
        this.y = this.y_dest;
    }
    
    setDestPos(x,y){
        this.x_dest=x;
        this.y_dest=y;
    }

    setPos(x,y){
        this.x = x;
        this.y = y;
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