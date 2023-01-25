import Text from "./Text.js";

class Score extends Text{
    sizeMultiplier = 1;
    constructor(canvas, ctx, color){
        super(canvas, ctx, color);
        this.text = 0;
        this.initialFontSize = this.fontSize;
    }
    //override
    draw(){
        if(this.sizeMultiplier>1) this.sizeMultiplier += (1-this.sizeMultiplier)/10;
        this.fontSize = this.initialFontSize * this.sizeMultiplier;

        this.ctx.font = this.canvas.area * this.fontSize +'px Arial';
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    
        this.x = this.canvas.width * this.widthMultiplier - this.followMouseX * (this.canvas.width/2 - this.mouse.x) + this.plusX*(this.plusLv/100);
        this.y = this.canvas.height * this.heightMultiplier - this.followMouseY * (this.canvas.height/2 - this.mouse.y) + this.plusY*(this.plusLv/100);
       
        this.ctx.save();
        this.ctx.fillText(this.text, this.x, this.y);
        this.ctx.restore();
    }
    addScore(){
        this.text++;
        this.sizeMultiplier=1.2;
    }
    setScore(score){
        this.text = score;
    }
    getScore(){
        return this.text;
    }
}

export default Score;