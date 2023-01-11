import CircleEffector from '../essential/CircleEffector.js';
import MouseFollower from '../essential/MouseFollower.js';
import Score from '../essential/Score.js';
import { canvasResize } from '../essential/Canvas.js';
import RectInsider from './RectInsider.js';
import RectOutsider from './RectOutsider.js';

export function avoid_rects(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    canvasResize(canvas);

    let rects = [];
    let rectEdge = new RectOutsider(canvas);

    let on_game = false;
    // mouse + circle = player
    let circle = new CircleEffector(canvas, 'rgb(255,255,255)', 100);
    let mouse = new MouseFollower(canvas, 5000);
    let score = new Score(canvas, 'rgba(135,135,135,0.2)', 'rgba(15,15,15,0.1)');

    canvas.onclick = function(event){
        if(!on_game){
            gamestart();
        }
    }
    canvas.onmousemove = function(event){
        const x = event.clientX - ctx.canvas.offsetLeft;
        const y = event.clientY - ctx.canvas.offsetTop;
        mouse.setDestPos(x,y);
        score.setDestPos(x,y);
    }
    function gamestart(){
        on_game = true;
        score.setScore(0);
        _spawnCounter = 0;
    }
    function gameover(){
        on_game = false;
        rects = [];
    }
    window.onresize = function(){
        gameover();
        canvasResize(canvas);
        rectEdge.resize(canvas);
        circle.resize(canvas);
    }
    window.onload = function(){
        gameover();
    }

    function addRect(){
        rects.push(new RectInsider(canvas));
        score.addScore();
    }

    let _spawnCounter = 0;
    function Animate(){
        ctx.fillStyle = "#151515";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        rectEdge.move(canvas);
        rectEdge.spin();
        if(on_game) rectEdge.draw(ctx);
        if(rectEdge.isCrashed(mouse.getX(),mouse.getY())) gameover();

        if(on_game) circle.decreaseSize();
        else circle.increaseSize();
        mouse.move();
        circle.setPos(mouse.getX(),mouse.getY());
        circle.draw(ctx, mouse.getX(), mouse.getY());

        score.move();
        score.draw_ClickToStart(ctx, canvas, -1, -1);
        score.draw(ctx, canvas, -1, -1);

        for(let i=0; i<rects.length; i++){
            rects[i].move(canvas);
            rects[i].spin();
            rects[i].spawn();
            rects[i].draw(ctx);
            if(rects[i].isCrashed(mouse.getX(), mouse.getY())) gameover();
        }
        if(on_game){
            _spawnCounter++;
            if(_spawnCounter==60){
                _spawnCounter=0;
                addRect();
            }
        }
        console.log(2)
        requestAnimationFrame(Animate);
    }
    Animate();
        
}
export default avoid_rects;