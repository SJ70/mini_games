import MouseFollower from "./MouseFollower.js";

class Score{
    score = 0;
    color1 = 'white';
    color2 = 'black';

    constructor(canvas, ctx, color1, color2){
        this.color1 = color1;
        this.color2 = color2;
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = new MouseFollower(canvas, 10000);
        this.mouse.setPos(canvas.width/2,-canvas.height*100);
    }

    setDestPos(x,y){
        this.mouse.setDestPos(x,y);
    }
    move(){
        this.mouse.move();
    }

    addScore(){
        this.score++;
    }
    setScore(score){
        this.score=score;
    }
    draw(followMouseX, followMouseY){

        this.ctx.font = this.canvas.area*0.3 +'px Arial';
        this.ctx.fillStyle = this.color1;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    
        this.x = this.canvas.width/2 - followMouseX * (this.canvas.width/2 - this.mouse.getX()) * 0.05;
        this.y = this.canvas.height/2 - followMouseY * (this.canvas.height/2 - this.mouse.getY()) * 0.05;
       
        this.ctx.save();
        this.ctx.fillText(this.score, this.x, this.y);
        this.ctx.restore();
    }

    draw_ClickToStart(followMouseX, followMouseY){
        this.ctx.font = this.canvas.area*0.08 +'px Arial';
        this.ctx.fillStyle = this.color2;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
    
        this.x = this.canvas.width/2 - followMouseX * (this.canvas.width/2 - this.mouse.getX()) * 0.1;
        this.y = this.canvas.height/5*3 - followMouseY * (this.canvas.height/2 - this.mouse.getY()) * 0.1;
        
        this.ctx.save();
        this.ctx.fillText("Click to Start", this.x, this.y);
        this.ctx.restore();
    }
}

export default Score;