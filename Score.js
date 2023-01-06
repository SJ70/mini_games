function Score(){
    this.score = 0;
    this.color1 = 'white';
    this.color2 = 'black';

    this.setScore = function(score){
        this.score=score;
    }
    this.setColor1 = function(color){
        this.color1 = color;
    }
    this.setColor2 = function(color){
        this.color2 = color;
    }
    this.draw = function(ctx, canvas, x, y, followX, followY){
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
    this.draw_ClickToStart = function(ctx, canvas, x, y, followX, followY){
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