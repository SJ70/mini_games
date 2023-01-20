import Game from '../../essential/Game.js';
import draw_switch from './draw_switch.js';
import Line from './Line.js';
import { _white_value, _black_value, _white, _black } from './colors.js';

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
const MAX_SPAWN_RATE = 20;
const MIN_SPAWN_RATE = 20;

export function light_switch(){
    let game = new Game(canvas, ctx, 'light_switch', _black, '140,140,140', _white_value);

    let _light = true;
    let lines = [];

    game.score.setFollowMouse(0.04, 0.03);
    game.score.setPluePos(0,-0.2);
    game.clickToStart.setFollowMouse(0.02, -0.015);
    game.circle.setSizeDivisor(10000);

    canvas.onclick = function(){
        if(game.circle.isSizeMax()){
            game.click();
        }
    }
    canvas.onmousedown = function(){
        if(game.isPlaying()){
            _light = !_light;
            game.setBackgroundColor( _light ? _white : _black);
            game.circle.setColor( _light ?  _black : _white);
            game.clickToStart.setColor( _light ? 'rgba('+_white_value+',0.1)' : 'rgba('+_black_value+',0.1)');
        }
    }
    canvas.onmousemove = function(event){
        game.mousemove(event);
    }
    window.onresize = function(){
        game.resize();
    }

    // overriding
    game.gamestart = function(){
        game.gamestart_essential();
        lines = [];
        _spawn_rate = MAX_SPAWN_RATE;
    }
    game.gameover = function(){
        game.gameover_essential();
    }
    game.resize = function(){
        game.resize_essential();
    }
    game.resize();

    let _spawn_rate = 0;
    let _time = _spawn_rate;
    function do_spawn_line(){
        if(_time--<0){
            if(_spawn_rate>MIN_SPAWN_RATE) _spawn_rate -= (_spawn_rate-MIN_SPAWN_RATE)/50;
            _time = _spawn_rate;
            addLine();
        }
    }

    function addLine(){
        let speedDivisor = (50 + (100 - game.score.getScore()*0.1)) * (Math.random()*0.5+0.5);
        let dir_tmp = Math.random()*4;
        let dir = (dir_tmp>3 ? 'up' : (dir_tmp>2 ? 'down' : (dir_tmp>1 ? 'left' : 'right')));
        let time = 100;
        let light = (Math.random()<0.8) != ((lines.length>0)?(lines[lines.length-1].getLight()):(_light));
        lines.push(new Line(canvas, ctx, speedDivisor, dir, time, light));
    }

    function runLines(){
        for(let i=0; i<lines.length; i++){
            lines[i].move();
            if(game.isPlaying() && lines[i].isOnMiddle()){
                if(lines[i].isVisible(_light)){
                    game.gameover();
                }
                else{
                    game.score.addScore();
                }
            }
            if(lines[i].isVisible(_light)){
                lines[i].draw();
            }
        }
        while(lines.length>10){
            lines.shift();
        } 
    }

    run();
    function run(){
        game.resetCanvas();

        draw_switch(canvas,ctx,_light);
        runLines();
        if(game.isPlaying()) do_spawn_line();
        
        game.drawEssential(canvas.width/2, canvas.height/2);

        if(!game.isOnPage()) return;
        console.log("light_switch")
        requestAnimationFrame(run);
    }

}
export default light_switch;