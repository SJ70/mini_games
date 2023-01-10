export class CircleEffector{
    x = 0;
    y = 0;

    constructor(canvas, color, sizeDivisor){
        this.color = color;
        this.sizeDivisor = sizeDivisor;

        this.size = Math.round(canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((canvas.diag-this.size)/15);
        this.sizeMultiple = 15;
    }

    resize(canvas){
        this.size = Math.round(canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((canvas.diag-this.size)/15);
    }

    setPos([x,y]){
        this.x = x;
        this.y = y;
    }

    decreaseSize(){
        if(this.sizeMultiple>0) this.sizeMultiple--;
    }
    increaseSize(){
        if(this.sizeMultiple<15) this.sizeMultiple++;
    }
    
    draw(ctx, r, c){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        switch(arguments.length){
            case 1 : ctx.arc(this.x, this.y, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2); break;
            case 3 : ctx.arc(r, c, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2); break;
        }
        ctx.fill();
    }
}

export default CircleEffector;