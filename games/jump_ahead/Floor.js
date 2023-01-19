
export class Floor{
    constructor(canvas, ctx, x, y, size){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.dx = 0;
        this.y = y;
        this.size = size;
        this.spawning = 1;
        this.spawning_d = 10;
    }

    do_move(power, dx){
        this.dx = this.canvas.width/50 * power * (dx/this.canvas.width);
    }

    move(){
        this.x -= this.dx;
        this.dx *= 0.995;
    }
    spawn(){
        if(this.spawning<100){
            this.spawning += this.spawning_d;
            this.spawning_d *= 0.9;
            if(this.spawning + this.spawning_d>100)
            this.spawning=100;
        } 
    }

    draw(){
        this.ctx.fillStyle = 'rgb(50,50,80)';
        this.ctx.fillRect(this.x, this.y + (1-this.spawning/100)*(this.canvas.height-this.y), this.size, this.canvas.height-this.y);
    }

    reverseDir(){
        this.dx *= -1;
    }
    
    getHeight(){
        return this.y;
    }

    isOutOfMap(){
        return this.x+this.size<0;
    }
}
export default Floor