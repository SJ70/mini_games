import { canvasResize } from '../essential/canvasResize.js';

import play_avoid_rects from '../games/avoid_rects/avoid_rects.js';
import play_shoot_balls from '../games/shoot_balls/shoot_balls.js';
import play_bounce_ball from '../games/bounce_ball/bounce_ball.js';
import play_jump_ahead from '../games/jump_ahead/jump_ahead.js';
import play_light_switch from '../games/light_switch/light_switch.js';
import play_inside_out from '../games/inside_out/inside_out.js';

class Game {
    constructor(title, play) {
        this.title = title;
        this.play = play;
    }
}

const avoid_rects = new Game("avoid_rects", () => play_avoid_rects());
const shoot_balls = new Game("shoot_balls", () => play_shoot_balls());
const bounce_ball = new Game("bounce_ball", () => play_bounce_ball());
const jump_ahead = new Game("jump_ahead", () => play_jump_ahead());
const light_switch = new Game("light_switch", () => play_light_switch());
const inside_out = new Game("inside_out", () => play_inside_out());

const games = [avoid_rects, shoot_balls, bounce_ball, jump_ahead, light_switch, inside_out];

export class Games{

    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
    }

    size(){
        return games.length;
    }

    getPosOf(game){
        let index = this.list.findIndex(game);
        let v = this.canvas.width;
        let h = this.canvas.height / this.size();
        let x = 0;
        let y = index * h;
        return {x,y,v,h};
    }

    launchGameFromPos(mouse_y){
        let index = this.getCurrentIndex(mouse_y);
        console.log(index)
        games[index].play();
    }

    draw(mouse_y){
        canvasResize(this.canvas);

        let v = this.canvas.width;
        let h = this.canvas.height / this.size();
        let x = 0;
        let y = 0;

        this.ctx.font = "normal normal " + (v/50) + "px sans-serif";
        this.ctx.textBaseline = "top";

        for(let i=0; i<this.size(); i++, y+=h){
            let index = this.getCurrentIndex(mouse_y);

            this.ctx.fillStyle = (i == index) ? "hsl(0, 0%, 30%)" : "hsl(0, 0%, 20%)";
            this.ctx.strokeStyle = "hsl(0, 0%, 10%)";
            this.ctx.fillRect(x,y,v,h);
            this.ctx.strokeRect(x,y,v,h);

            this.ctx.fillStyle = (i == index) ? "hsl(0, 0%, 100%)" : "hsl(0, 0%, 80%)";
            let title = games[i].title;
            this.ctx.fillText(title, x+15, y+15);
        }
    }

    getCurrentIndex(mouse_y) {
        return Math.floor(mouse_y / (this.canvas.height / this.size()));
    }

}
export default Games;