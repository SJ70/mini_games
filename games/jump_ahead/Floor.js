
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

    move(dt){
        this.x -= this.dx * dt * 60;
        this.dx *= Math.pow(0.995, dt * 60);
    }
    
    spawn(dt){
        if(this.spawning < 100){
            this.spawning += this.spawning_d * dt * 60;
            this.spawning_d *= Math.pow(0.91, dt * 60);
            if(this.spawning + this.spawning_d > 100)
                this.spawning = 100;
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
        return this.x + this.size < 0;
    }
}
export default Floor