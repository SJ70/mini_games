export class Floor{
    constructor(canvas, ctx, x, size, height, speed_level){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.size = size;
        this.color = '#FFFFFF';
        this.y = canvas.height;
        this.height = height;
        this.dy = (canvas.height-height)/20 * speed_level;
        this.spawning = true;
    }
    animate(){
        if(this.spawning){
            if(this.height <= this.y){
                if(this.height > this.y-this.dy){
                    this.y = this.height;
                }
                else{
                    this.y -= this.dy;
                }
            }
        }
        else{
            this.y += this.dy;
        }
    }
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.size, this.canvas.height-this.y);
    }
    despawn(){
        this.spawning = false;
    }
    isDisappeared(){
        return this.y > this.canvas.height;
    }
}
export default Floor;