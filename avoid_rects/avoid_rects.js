import Game from '../essential/Game.js';
import MouseFollower from '../essential/MouseFollower.js';

import RectInsider from './RectInsider.js';
import RectOutsider from './RectOutsider.js';

export function avoid_rects(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'avoid_rects', '#FFFFFF', '135,135,135', '15,15,15');
    game.score.setFollowMouse(-0.05, -0.05);
    game.clickToStart.setFollowMouse(-0.1, -0.1);

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
    }
    game.gameover = function(){
        game.gameover_essential();
        rects = [];
    }

    run();
    function run(){
        game.resetCanvas();
        runRectEdge();
        player.move(game.mouse_x, game.mouse_y);
        game.runCircle(player.x, player.y);
        game.return_button.draw();
        game.runScore();
        runRects();
        addRects();

        if(!game.isOnPage()) return;
        console.log("avoid_rects")
        requestAnimationFrame(run);
    }

    function runRectEdge(){
        rectEdge.move();
        rectEdge.spin();
        if(game.on_game) rectEdge.draw();
        if(rectEdge.isCrashed(player.x, player.y)) game.gameover();
    }

    function runRects(){
        for(let i=0; i<rects.length; i++){
            rects[i].move();
            rects[i].spin();
            rects[i].spawn();
            rects[i].draw();
            if(rects[i].isCrashed(player.x, player.y)){
                game.gameover();
            }
        }
    }
    let _spawnCounter = 0;
    function addRects(){
        if(game.on_game){
            _spawnCounter++;
            if(_spawnCounter==60){
                _spawnCounter=0;
                rects.push(new RectInsider(canvas, ctx));
                game.score.addScore();
            }
        }
    }
}
export default avoid_rects;