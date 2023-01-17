import Game from '../essential/Game.js';
import Ball from './Ball.js';
import Floor from './Floor.js';

export function bounce_ball(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'bounce_ball', '#FFFFFF', '135,135,135', '15,15,15');
    game.score.setFollowMouse(0.05, 0.05);
    game.clickToStart.setFollowMouse(0.1, 0.1);
    game.circle.setSizeDivisor(50);
    game.resize();

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousemove = function(event){
        game.mousemove(event);
    }
    window.onresize = function(){
        game.resize();
        ball.init(game.mouse_x);
    }

    let _floor_x, _floor_size;
    let _speed_level = 1;
    const HEIGHT = 0.975;

    let ball = new Ball(canvas,HEIGHT);
    let floor = [];

    // overriding
    game.gamestart = function(){
        game.gamestart_essential();
        ball.init(game.mouse_x);
        _speed_level = 1;
        floor = [];
        spawn_floor();
    }
    game.gameover = function(){
        game.gameover_essential();
        for(let i=0; i<floor.length; i++){
            floor[i].despawn();
        }
    }

    function spawn_floor(){
        _floor_size = canvas.width * 0.1 + Math.random() * canvas.width * 0.1;
        _floor_x = Math.random() * (canvas.width - _floor_size);
        floor.push(new Floor(canvas, ctx, _floor_x, _floor_size, canvas.height*HEIGHT, _speed_level));
    }

    run();
    function run(){
        game.resetCanvas();

        if(game.on_game){
            _speed_level += 0.002;
            run_ball();
        }

        run_floor();

        game.drawEssential(ball.x, ball.y - game.circle.size);

        if(!game.isOnPage()) return;
        console.log("bounce_ball")
        requestAnimationFrame(run);
    }

    function run_ball(){
        ball.move(game.mouse_x, _speed_level);
        
        if( ball.checkBounce(_floor_x, _floor_size, canvas.height*HEIGHT) || ( ball.is_out_of_map() && ball.checkBounce_x(_floor_x, _floor_size) )){
            ball.bounce();
            if(floor.length>0) floor[0].despawn();
            game.score.addScore();
            spawn_floor();
        }
        else if(ball.is_out_of_map()){
            game.gameover();
        }
    }
    function run_floor(){
        for(let i=0; i<floor.length; i++){
            floor[i].animate();
            floor[i].draw();
        }
        while(floor.length>0 && floor[0].isDisappeared()){
            floor.shift();
        }
    }
}
export default bounce_ball;