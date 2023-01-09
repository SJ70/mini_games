class Dot{
    x_dest = 0;
    y_dest = 0;

    constructor(canvas, x, y){
        this.x = x;
        this.y = y;
        this.size = Math.round(canvas.diag/150)*201;
        this.MinSize = Math.round(canvas.diag/150);
        this.MaxSize = this.MinSize*201;
        this.SizeTolerance = this.MinSize*10;
    }
    
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    changeSize(on_game){
        if(on_game){
            if(this.size>this.MinSize) this.size -= this.SizeTolerance;
        }
        else{
            if(this.size<this.MaxSize) this.size += this.SizeTolerance;
        }
    }

    draw(ctx, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

export default Dot;