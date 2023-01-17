import Game from '../essential/Game.js';

import Ball from './Ball.js'
import Cannon from './Cannon.js'
import CannonBall from './CannonBall.js'

export function shoot_balls(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'shoot_balls', '#151515', '120,120,120', '250,250,250');
    game.score.setFollowMouse(0.05, 0.05);
    game.clickToStart.setFollowMouse(0.1, 0.1);

    let cannon = new Cannon(canvas, ctx, game.circle.color);
    let balls = [];
    let cannonBalls = [];

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousedown = function(){
        if(game.on_game){
            if(cannon.isReadyToShot()){
                cannon.resetDelay();
                cannonBalls.push(new CannonBall(canvas, ctx, game.mouse_x, game.mouse_y, cannon.getAngle()));
            }
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
        _spawnCounter = 0;
        _spawnRate = _maxSpawnRate;
    }
    game.gameover = function(){
        game.gameover_essential();
        for(let j=0; j<balls.length; j++){
            balls[j].setDestroyed(true);
        }
    }

    run();
    function run(){
        game.resetCanvas();
        runCannonBalls();
        if(!game.on_game) runBalls();
        runCannon();
        game.runCircle(canvas.width, canvas.height);
        game.runScore();
        game.return_button.draw();
        if(game.on_game) spawnBall();
        if(game.on_game) runBalls();

        if(canvas.page != 'shoot_balls') return;
        console.log("shoot_balls")
        requestAnimationFrame(run);
    }
    function runCannonBalls(){
        for(let i=0; i<cannonBalls.length; i++){
            cannonBalls[i].move();
            cannonBalls[i].draw(ctx);
        }
        if(cannonBalls.length>0 && cannonBalls[0].isOutOfMap() == true) cannonBalls.shift();
    }
    function runBalls(){
        for(let i=0; i<balls.length; i++){
            if(!balls[i].isDestroyed() && balls[i].isOutOfMap(canvas)){
                game.gameover();
            }
            if(balls[i].isDestroyed()){
                balls[i].destroy();
            }
            else{
                balls[i].move();
                for(let j=0; j<cannonBalls.length; j++){
                    if(balls[i].isCrashed(cannonBalls[j].getPosAndSize())){
                        balls[i].setDestroyed(true);
                        game.score.addScore();
                    }
                }
            } 
            balls[i].draw(ctx,canvas);
        }
        balls = balls.filter(function(data){
            return !data.isDisappeared(canvas);
        });
    }
    function runCannon(){
        cannon.decreaseDelay();
        cannon.draw(game.mouse_x, game.mouse_y);
    }
    let _spawnRate = 60;
    let _spawnCounter = 0;
    const _maxSpawnRate = 60;
    const _minSpawnRate = 20;
    function spawnBall(){
        if(++_spawnCounter >= _spawnRate){
            _spawnCounter = 0;
            balls.push(new Ball(canvas));

            if(_spawnRate>_minSpawnRate) _spawnRate *= 0.99;
            else if(_spawnRate<_minSpawnRate) _spawnRate = _minSpawnRate;
        }
    }
}
export default shoot_balls;