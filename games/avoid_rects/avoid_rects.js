import Game from '../../essential/Game.js';
import MouseFollower from '../../essential/MouseFollower.js';

import RectInsider from './RectInsider.js';
import RectOutsider from './RectOutsider.js';

export function avoid_rects(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'avoid_rects', '#FFFFFF', '135,135,135', '15,15,15');
    game.score.setFollowMouse(-0.05, -0.05);
    game.clickToStart.setFollowMouse(-0.1, -0.1);
    game.resize();

    let rects = [];
    let rectEdge = new RectOutsider(canvas, ctx);
    let player = new MouseFollower(canvas, 5000, canvas.width/2, canvas.height/2);

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousemove = function(event){
        game.mousemove(event);
    }
    window.onresize = function(){
        game.resize();
        rectEdge.resize();
    }

    // overriding
    game.gamestart = function(){
        game.gamestart_essential();
        _spawnCounter = 0;
        lastTime = performance.now();
    }
    game.gameover = function(){
        game.gameover_essential();
        rects = [];
    }

    let lastTime = performance.now();
    let _spawnCounter = 0;
    
    function run(timestamp){
        let dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        game.resetCanvas();
        runRectEdge(dt);
        player.move(game.mouse_x, game.mouse_y, dt);
        game.drawEssential(player.x, player.y, dt);
        runRects(dt);
        addRects(dt);

        if(!game.isOnPage()) return;
        console.log("avoid_rects")
        requestAnimationFrame(run);
    }

    function runRectEdge(dt){
        rectEdge.move(dt);
        rectEdge.spin(dt);
        if(game.on_game) rectEdge.draw();
        if(rectEdge.isCrashed(player.x, player.y)) game.gameover();
    }

    function runRects(dt){
        for(let i=0; i<rects.length; i++){
            rects[i].move(dt);
            rects[i].spin(dt);
            rects[i].spawn(dt);
            rects[i].draw();
            if(rects[i].isCrashed(player.x, player.y)){
                game.gameover();
            }
        }
    }
    
    function addRects(dt){
        if(game.on_game){
            _spawnCounter += dt * 60;
            if(_spawnCounter >= 60){
                _spawnCounter = 0;
                rects.push(new RectInsider(canvas, ctx));
                game.score.addScore();
            }
        }
    }
    
    requestAnimationFrame(run);
}
export default avoid_rects;