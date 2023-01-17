export class CircleEffector{
    constructor(canvas, ctx, color){
        this.canvas = canvas;
        this.ctx = ctx;

        this.color = color;
        this.sizeDivisor = 100;

        this.size = Math.round(this.canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((this.canvas.diag-this.size)/15);
        this.sizeMultiple = 15;
    }

    setSizeDivisor(sizeDivisor){
        this.sizeDivisor = sizeDivisor;
    }

    resize(){
        this.size = Math.round(this.canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((this.canvas.diag-this.size)/15);
    }

    decreaseSize(){
        if(this.sizeMultiple>0) this.sizeMultiple--;
    }
    increaseSize(){
        if(this.sizeMultiple<15) this.sizeMultiple++;
    }
    
    draw(x, y){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2);
        this.ctx.fill();
    }
}

export default CircleEffector;