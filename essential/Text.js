import MouseFollower from "./MouseFollower.js";

export class Text{
    text;
    fontSize = 0.3;
    widthMultiplier = 0.5;
    heightMultiplier = 0.5;
    followMouseX = 1;
    followMouseY = 1;

    constructor(canvas, ctx, color){
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
        // 마우스를 따라오는 비율값
        this.mouse = new MouseFollower(canvas, 10000);
        this.mouse.setPos(this.canvas.width/2, -this.canvas.height*100);
    }

    setFollowMouse(x,y){
        this.followMouseX = x;
        this.followMouseY = y;
    }
    move(x,y){
        this.mouse.move(x,y);
    }

    draw(){
        this.ctx.font = this.canvas.area * this.fontSize +'px Arial';
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    
        this.x = this.canvas.width * this.widthMultiplier - this.followMouseX * (this.canvas.width/2 - this.mouse.x);
        this.y = this.canvas.height * this.heightMultiplier - this.followMouseY * (this.canvas.height/2 - this.mouse.y);
       
        this.ctx.save();
        this.ctx.fillText(this.text, this.x, this.y);
        this.ctx.restore();
    }
}

export default Text;