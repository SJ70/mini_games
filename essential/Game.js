import CircleEffector from '../essential/CircleEffector.js';
import Score from '../essential/Score.js';
import ClickToStart from './ClickToStart.js';
import { canvasResize } from '../essential/canvasResize.js';
import ReturnButton from '../essential/ReturnButton.js';

export class Game{
    mouse_x = 0;
    mouse_y = 0;
    on_game = false;

    constructor(canvas, ctx, page, CircleColor, ScoreColor, BackgroundColor){
        this.canvas = canvas;
        this.ctx = ctx;

        this.page = page;
        this.canvas.page = page;

        canvasResize(this.canvas);
        this.circle = new CircleEffector(this.canvas, this.ctx, CircleColor);
        this.return_button = new ReturnButton(this.canvas, this.ctx, 'rgba('+ScoreColor+',0.4)')
        this.score = new Score(this.canvas, this.ctx, 'rgba('+ScoreColor+',0.2)');
        this.clickToStart = new ClickToStart(this.canvas, this.ctx, 'rgba('+BackgroundColor+',0.1)');
        this.BackgroundColor = 'rgb('+BackgroundColor+')';
    }

    // override when needed
    gamestart(){
        this.gamestart_essential();
    }
    gameover(){
        this.gameover_essential();
    }

    gamestart_essential(){
        this.on_game = true;
        this.score.setScore(0);
    }
    gameover_essential(){
        this.on_game = false;
    }

    
    click(){
        if(!this.on_game){
            this.gamestart();
        }
        this.return_button.checkClick(this.mouse_x, this.mouse_y);
    }
    mousemove(event){
        this.mouse_x = event.clientX - this.ctx.canvas.offsetLeft;
        this.mouse_y = event.clientY - this.ctx.canvas.offsetTop;
    }
    resize(){
        this.gameover();
        canvasResize(this.canvas);
        this.circle.resize();
        this.return_button.resize();
        this.mouse_x = this.canvas.width/2;
        this.mouse_y = this.canvas.height/2;
    }

    isPlaying(){
        return this.on_game;
    }
    isOnPage(){
        return this.canvas.page==this.page;
    }

    resetCanvas(){
        this.ctx.fillStyle = this.BackgroundColor;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    drawEssential(x,y){
        this.drawCircle(x,y);
        this.drawText();
        this.return_button.draw();
    }
    drawCircle(x,y){
        if(this.on_game) this.circle.decreaseSize();
        else this.circle.increaseSize();
        this.circle.draw(x,y);
    }
    drawText(){
        this.score.move(this.mouse_x,this.mouse_y);
        this.score.draw();
        this.clickToStart.move(this.mouse_x,this.mouse_y);
        this.clickToStart.draw();
    }

    setBackgroundColor(color){
        this.BackgroundColor = color;
    }

}
export default Game;