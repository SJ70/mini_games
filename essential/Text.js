import MouseFollower from "./MouseFollower.js";

export class Text{
    text;
    fontSize = 0.3;
    widthMultiplier = 0.5;
    heightMultiplier = 0.5;
    followMouseX = 1;
    followMouseY = 1;
    plusLv=0;
    plusX=0;
    plusY=0;

    constructor(canvas, ctx, color){
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = color;
        // 마우스를 따라오는 비율값
        this.mouse = new MouseFollower(this.canvas, 10000, this.canvas.width/2, -this.canvas.height*100);
    }

    setFollowMouse(x,y){
        this.followMouseX = x;
        this.followMouseY = y;
    }
    move(x,y){
        this.mouse.move(x,y);
    }

    setPluePos(x,y){
        this.plusX = this.canvas.width * x;
        this.plusY = this.canvas.height * y;
    }
    
    setColor(color){
        this.color = color;
    }

    PlusLevel(onPlaying){
        if(onPlaying && this.plusLv<100){
            this.plusLv+=(100-this.plusLv)/10;
        } 
        if(!onPlaying && this.plusLv>0){
            this.plusLv-=(this.plusLv)/10;
        } 
    }

    draw(){
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
}

export default Text;