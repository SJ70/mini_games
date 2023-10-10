import { canvasResize } from '../essential/canvasResize.js';

import Games from './Games.js';

export function select_game(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    canvasResize(canvas);
    canvas.page = 'select_game';

    let games = new Games(canvas, ctx);
    
    canvas.onclick = function(event){
        games.launchGameFromPos(mouse_y);
    }
    let mouse_x;
    let mouse_y;
    canvas.onmousemove = function(event){
        mouse_x = event.clientX - ctx.canvas.offsetLeft;
        mouse_y = event.clientY - ctx.canvas.offsetTop;
    }
    
    run();
    function run(){
        resetCanvas();

        games.draw(mouse_y);

        if(canvas.page!='select_game') return;
        console.log('select_game');
        requestAnimationFrame(run);
    }
    function resetCanvas(){
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

}
export default select_game;