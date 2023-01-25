import Game from '../../essential/Game.js';
import Player from '../inside_out/Player.js';
import {_c1, _c2, _c1_value, _c2_value} from './colors.js';
import Spikes from './Spikes.js';

export function inside_out(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'inside_out', _c1, '135,135,135', _c2_value);
    game.score.setFollowMouse(0.015, 0.015);
    game.clickToStart.setFollowMouse(0.05, 0.05);
    game.clickToStart.setPluePos(0,0.4);
    //overriding
    game.circle.resize = function(){
        game.circle.size = Math.round(Math.min(canvas.width, canvas.height)/2.5);
        game.circle.sizeTolerance = Math.ceil((canvas.diag-game.circle.size)/15);
    }
    game.resize();

    let player = new Player(canvas,ctx);
    let spikes = new Spikes(canvas,ctx);
    let _speed;
    const MAX_SPEED = 2.5;

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousedown = function(event){
        if(game.isPlaying() && game.circle.isSizeMin()){
            player.reverse();
        }
    }
    canvas.onmousemove = function(event){
        game.mousemove(event);
    }
    window.onresize = function(){
        game.resize();
        player.resize();
    }

    // overriding
    game.gamestart = function(){
        game.gamestart_essential();
        player.init();
        spikes.init();
        _speed = 1;
    }

    run();
    function run(){
        game.resetCanvas();

        game.drawEssential(canvas.width/2, canvas.height/2);

        if(game.isPlaying()){
            player.rotate(_speed);
            if(player.isOverAngle()){
                game.score.addScore();
                player.addAngle(-360);
                if(_speed<MAX_SPEED) _speed += 0.05;
                console.log(_speed);
            }
            spikes.reverse_random(player.getAngle(), player.getAngle()+_speed);
            if(spikes.isCrashed(player.getAngle(), player.getAngle()+_speed, player.reversed)){
                // game.gameover();
                console.log('crashed');
            }
            player.draw();
        }
        spikes.draw(game.circle.getCurrentSize()*2.5);

        if(!game.isOnPage()) return;
        console.log("inside_out")
        requestAnimationFrame(run);
    }
    
}
export default inside_out;