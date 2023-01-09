class Score{
    score = 0;
    color1 = 'white';
    color2 = 'black';

    constructor(color1, color2){
        this.color1 = color1;
        this.color2 = color2;
    }

    setScore(score){
        this.score=score;
    }
    draw(ctx, canvas, x, y, followX, followY){
        ctx.font = canvas.diag/4+'px Arial';
        ctx.fillStyle = this.color1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        this.x = canvas.width/2 - followX * (canvas.width/2 - x) * 0.05;
        this.y = canvas.height/2 - followY * (canvas.height/2 - y) * 0.05;
       
        ctx.save();
        ctx.fillText(this.score, this.x, this.y);
        ctx.restore();
    }
    draw_ClickToStart(ctx, canvas, x, y, followX, followY){
        ctx.font = canvas.diag/12+'px Arial';
        ctx.fillStyle = this.color2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
    
        this.x = canvas.width/2 - followX * (canvas.width/2 - x) * 0.1;
        this.y = canvas.height/5*3 - followY * (canvas.height/2 - y) * 0.1;
        
        ctx.save();
        ctx.fillText("Click to Start", this.x, this.y);
        ctx.restore();
    }
}

export default Score;