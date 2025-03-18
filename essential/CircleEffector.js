const MAX = 15;

export class CircleEffector{
    constructor(canvas, ctx, color){
        this.canvas = canvas;
        this.ctx = ctx;

        this.color = color;
        this.sizeDivisor = 100;

        this.size = Math.round(this.canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((this.canvas.diag-this.size)/MAX);
        this.sizeMultiple = MAX;
    }

    setSizeDivisor(sizeDivisor){
        this.sizeDivisor = sizeDivisor;
    }
    getCurrentSize(){
        return Math.max(this.size + this.sizeMultiple * this.sizeTolerance, 0);
    }

    resize(){
        this.size = Math.round(this.canvas.area / this.sizeDivisor);
        this.sizeTolerance = Math.ceil((this.canvas.diag-this.size)/MAX);
    }

    decreaseSize(dt){
        if(this.sizeMultiple > 0) {
            this.sizeMultiple -= dt * 60;
            if(this.sizeMultiple < 0) this.sizeMultiple = 0;
        }
    }
    increaseSize(dt){
        if(this.sizeMultiple < MAX) {
            this.sizeMultiple += dt * 60;
            if(this.sizeMultiple > MAX) this.sizeMultiple = MAX;
        }
    }

    isSizeMax(){
        return this.sizeMultiple==MAX;
    }
    isSizeMin(){
        return this.sizeMultiple==0;
    }
    
    draw(x, y){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size + (this.sizeTolerance*this.sizeMultiple), 0, Math.PI*2);
        this.ctx.fill();
    }

    setColor(color){
        this.color = color;
    }
}

export default CircleEffector;