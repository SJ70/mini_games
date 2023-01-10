class Score{
    score = 0;
    color1 = 'white';
    color2 = 'black';

    constructor(color1, color2){
        this.color1 = color1;
        this.color2 = color2;
    }

    addScore(){
        this.score++;
    }
    setScore(score){
        this.score=score;
    }
    draw(ctx, canvas, [x, y], followMouseX, followMouseY){
        ctx.font = canvas.area*0.3 +'px Arial';
        ctx.fillStyle = this.color1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        this.x = canvas.width/2 - followMouseX * (canvas.width/2 - x) * 0.05;
        this.y = canvas.height/2 - followMouseY * (canvas.height/2 - y) * 0.05;
       
        ctx.save();
        ctx.fillText(this.score, this.x, this.y);
        ctx.restore();
    }
    draw_ClickToStart(ctx, canvas, [x, y], followMouseX, followMouseY){
        ctx.font = canvas.area*0.08 +'px Arial';
        ctx.fillStyle = this.color2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
    
        this.x = canvas.width/2 - followMouseX * (canvas.width/2 - x) * 0.1;
        this.y = canvas.height/5*3 - followMouseY * (canvas.height/2 - y) * 0.1;
        
        ctx.save();
        ctx.fillText("Click to Start", this.x, this.y);
        ctx.restore();
    }
}

export default Score;