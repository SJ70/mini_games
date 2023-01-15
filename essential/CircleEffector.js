export class CircleEffector{
    x = 0;
    y = 0;
    constructor(canvas, ctx, color, sizeDivisor){
        this.canvas = canvas;
        this.ctx = ctx;

        this.color = color;
        this.sizeDivisor = (arguments.length==2) ? 100 : sizeDivisor;

        this.size = Math.round(this.canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((this.canvas.diag-this.size)/15);
        this.sizeMultiple = 15;
    }

    resize(){
        this.size = Math.round(this.canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((this.canvas.diag-this.size)/15);
    }

    setPos(x,y){
        this.x = x;
        this.y = y;
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
        switch(arguments.length){
            case 0 : this.ctx.arc(this.x, this.y, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2); break;
            case 2 : this.ctx.arc(x, y, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2); break;
        }
        this.ctx.fill();
    }
}

export default CircleEffector;