import Game from '../essential/Game.js';

export function NEW_GAME(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'NEW_GAME', '#FFFFFF', '135,135,135', '15,15,15');
    game.score.setFollowMouse(0.1, 0.1);
    game.clickToStart.setFollowMouse(0.1, 0.1);
    game.circle.setSizeDivisor(100);
    game.resize();

    canvas.onclick = function(){
        game.click();
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
    }
    game.gameover = function(){
        game.gameover_essential();
    }

    run();
    function run(){
        game.resetCanvas();

        game.drawEssential(ball.x, ball.y - game.circle.size);

        if(!game.isOnPage()) return;
        console.log("NEW_GAME")
        requestAnimationFrame(run);
    }

    
}
export default NEW_GAME;