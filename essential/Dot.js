class Dot{

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

    decreaseSize(){
        if(this.size>this.MinSize) this.size -= this.SizeTolerance;
    }
    increaseSize(){
        if(this.size<this.MaxSize) this.size += this.SizeTolerance;
    }

    draw(ctx, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }

    draw(ctx, color, r, c){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(r, c, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

export default Dot;