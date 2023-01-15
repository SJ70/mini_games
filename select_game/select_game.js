import { canvasResize } from '../essential/canvasResize.js';

import avoid_rects from '../avoid_rects/avoid_rects.js';
import shoot_balls from '../shoot_balls/shoot_balls.js';

export function menu(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    canvasResize(canvas);
    canvas.page = 'select_game';
    
    canvas.onclick = function(event){
        if(canvas.page=='select_game'){
            if(mouse_x<canvas.width/2){
                avoid_rects();
            }
            else{
                shoot_balls();
            } 
        }
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

        if(canvas.page!='select_game') return;
        console.log('select_game');
        requestAnimationFrame(run);
    }
    function resetCanvas(){
        ctx.fillStyle = "rgb(135,135,135)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

}
export default menu;