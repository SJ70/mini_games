import Game from '../../essential/Game.js';

import Ball from './Ball.js'
import Cannon from './Cannon.js'
import CannonBall from './CannonBall.js'

export function shoot_balls(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'shoot_balls', '#151515', '120,120,120', '250,250,250');
    game.score.setFollowMouse(0.05, 0.05);
    game.clickToStart.setFollowMouse(0.1, 0.1);
    game.resize();

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
                cannonBalls.push(new CannonBall(canvas, ctx, game.circle.color, game.mouse_x, game.mouse_y, cannon.getAngle()));
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

    let lastTime = performance.now();

    run();

    function run(timestamp){
        let dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        
        game.resetCanvas();
        runCannonBalls(dt);
        if(!game.on_game) runBalls(dt);
        runCannon(dt);
        game.drawEssential(canvas.width, canvas.height, dt);
        if(game.on_game) spawnBall(dt);
        if(game.on_game) runBalls(dt);

        if(!game.isOnPage()) return;
        console.log("shoot_balls")
        requestAnimationFrame(run);
    }
    function runCannonBalls(dt){
        for(let i=0; i<cannonBalls.length; i++){
            cannonBalls[i].move(dt);
            cannonBalls[i].draw(ctx);
        }
        if(cannonBalls.length > 0 && cannonBalls[0].isOutOfMap()) cannonBalls.shift();
    }
    function runBalls(dt){
        for(let i=0; i<balls.length; i++){
            if(!balls[i].isDestroyed() && balls[i].isOutOfMap(canvas)){
                game.gameover();
            }
            if(balls[i].isDestroyed()){
                balls[i].destroy();
            }
            else{
                balls[i].move(dt);
                for(let j=0; j<cannonBalls.length; j++){
                    if(balls[i].isCrashed(cannonBalls[j].getPosAndSize())){
                        balls[i].setDestroyed(true);
                        game.score.addScore();
                    }
                }
            } 
            balls[i].draw(ctx, canvas);
        }
        balls = balls.filter(data => !data.isDisappeared(canvas));
    }
    function runCannon(dt){
        cannon.decreaseDelay(dt);
        cannon.draw(game.mouse_x, game.mouse_y);
    }
    let _spawnRate = 60;
    let _spawnCounter = 0;
    const _maxSpawnRate = 60;
    const _minSpawnRate = 20;
    function spawnBall(dt){
        _spawnCounter += dt * 60;
        if(_spawnCounter >= _spawnRate){
            _spawnCounter = 0;
            balls.push(new Ball(canvas));
            if(_spawnRate > _minSpawnRate) _spawnRate *= 0.99;
            else if(_spawnRate < _minSpawnRate) _spawnRate = _minSpawnRate;
        }
    }
}
export default shoot_balls;