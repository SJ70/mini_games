import CircleEffector from '../essential/CircleEffector.js';
import Score from '../essential/Score.js';
import ClickToStart from './ClickToStart.js';
import { canvasResize } from '../essential/canvasResize.js';
import ReturnButton from '../essential/ReturnButton.js';

export class Game{
    mouse_x = 0;
    mouse_y = 0;
    on_game = false;
    lastTime = performance.now();

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
    
    resize(){
        this.gameover();
        canvasResize(this.canvas);
        this.circle.resize();
        this.return_button.resize();
        this.mouse_x = this.canvas.width/2;
        this.mouse_y = this.canvas.height/2;
    }
    
    click(){
        if(!this.on_game && this.circle.isSizeMax()){
            this.gamestart();
        }
        this.return_button.return(this.mouse_x, this.mouse_y);
    }
    mousemove(event){
        this.mouse_x = event.clientX - this.ctx.canvas.offsetLeft;
        this.mouse_y = event.clientY - this.ctx.canvas.offsetTop;
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

    drawEssential(x,y, dt){
        this.drawCircle(x,y, dt);
        this.drawText(dt);
        this.return_button.draw();
    }
    drawCircle(x,y, dt){
        if(this.on_game) this.circle.decreaseSize(dt);
        else this.circle.increaseSize(dt);
        this.circle.draw(x,y);
    }
    drawText(dt){
        this.score.PlusLevel(this.isPlaying());
        this.score.move(this.mouse_x,this.mouse_y, dt);
        this.score.draw(dt);
        this.clickToStart.PlusLevel(this.isPlaying());
        this.clickToStart.move(this.mouse_x,this.mouse_y, dt);
        this.clickToStart.draw(dt);
    }

    setBackgroundColor(color){
        this.BackgroundColor = color;
    }

}
export default Game;