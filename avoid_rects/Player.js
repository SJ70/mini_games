import Dot from '../essential/Dot.js';

export class Player extends Dot{

    setSpeed(canvas){
        this.speed = canvas.diag/5000;
    }
    setPos(x,y){
        this.x_dest=x;
        this.y_dest=y;
    }
    
    move(){
        let dx = this.x_dest - this.x;
        let dy = this.y_dest - this.y;
        let d = Math.sqrt( dx*dx + dy*dy );

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
export default Player;