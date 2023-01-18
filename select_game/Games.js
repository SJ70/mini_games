import avoid_rects from '../games/avoid_rects/avoid_rects.js';
import shoot_balls from '../games/shoot_balls/shoot_balls.js';
import bounce_ball from '../games/bounce_ball/bounce_ball.js';

export class Games{

    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.list = [
            () => avoid_rects(),
            () => shoot_balls(),
            () => bounce_ball(),
        ];
    }

    add(game){
        this.list.push(game);
    }

    size(){
        return this.list.length;
    }

    getPosOf(game){
        let index = this.list.findIndex(game);
        let v = this.canvas.width;
        let h = this.canvas.height / this.size();
        let x = 0;
        let y = index * h;
        return {x,y,v,h};
    }
    launchGameFromPos(mouse_x, mouse_y){
        let index = Math.floor(mouse_y / (this.canvas.height / this.size()));
        console.log(index)
        this.list[index]();
    }

    draw(){
        let v = this.canvas.width;
        let h = this.canvas.height / this.size();
        let x = 0;
        let y = 0;
        for(let i=0; i<this.size(); i++){
            this.ctx.fillStyle = "hsl("+360*i/this.size()+",100%,85%)";
            this.ctx.fillRect(x,y,v,h);
            y += h;
        }
    }


}
export default Games;