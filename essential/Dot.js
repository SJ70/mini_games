class Dot{
    
    constructor(canvas, sizeDivisor, x, y){
        this.x = x;
        this.y = y;
        this.sizeDivisor = sizeDivisor;

        this.size = Math.round(canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((canvas.diag-this.size)/15);
        this.sizeMultiple = 15;
    }

    resize(canvas){
        this.size = Math.round(canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((canvas.diag-this.MinSize)/15);
    }
    
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    decreaseSize(){
        if(this.sizeMultiple>0) this.sizeMultiple--;
    }
    increaseSize(){
        if(this.sizeMultiple<15) this.sizeMultiple++;
    }
    

    draw(ctx, color, r, c){
        ctx.fillStyle = color;
        ctx.beginPath();
        switch(arguments.length){
            case 2 : ctx.arc(this.x, this.y, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2); break;
            case 4 : ctx.arc(r, c, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2); break;
        }
        ctx.fill();
    }
}

export default Dot;