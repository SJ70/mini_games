import select_game from '../select_game/select_game.js';

export class ReturnButton{

    constructor(canvas,ctx,color){
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
        this.resize();
    }

    resize(){
        this.x = this.canvas.area/25;
    }

    draw(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x *2, this.x);
        this.ctx.lineTo(this.x *2, this.x *2);
        this.ctx.lineTo(this.x, this.x *1.5);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }

    checkClick(x,y){
        if( (x >= this.x) && (x <= this.x+this.x) && (y >= this.x) && (y <= this.x+this.x) ){
            select_game();
        }
    }
}
export default ReturnButton;