import Game from '../../essential/Game.js';

const _white_value = '240,240,240';
const _black_value = '40,40,40';
const _white = 'rgb('+_white_value+')';
const _black = 'rgb('+_black_value+')';

export function light_switch(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'light_switch', _black, '140,140,140', _white_value);

    let _light = true;

    game.score.setFollowMouse(0.04, 0.03);
    game.clickToStart.setFollowMouse(0.02, -0.015);
    game.circle.setSizeDivisor(10000);

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousedown = function(){
        if(game.isPlaying()){
            _light = !_light;
            game.setBackgroundColor( _light ? _white : _black);
            game.circle.setColor( _light ?  _black : _white);
            game.clickToStart.setColor( _light ? 'rgba('+_white_value+',0.1)' : 'rgba('+_black_value+',0.1)');
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
    }
    game.gameover = function(){
        game.gameover_essential();
    }
    game.resize = function(){
        game.score.setPluePos(0,-canvas.height*0.2);
        game.resize_essential();
    }
    game.resize();

    run();
    function run(){
        game.resetCanvas();



        drawSwitch();
        
        game.drawEssential(canvas.width/2, canvas.height/2);

        if(!game.isOnPage()) return;
        console.log("light_switch")
        requestAnimationFrame(run);
    }

    function drawSwitch(){
        drawSwitchBody();
        drawMark();
    }
    function drawMark(){
        //-
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        let size = canvas.area*0.002;
        ctx.fillStyle = _light ? 'hsl(0,0%,60%)' : 'hsl(0,0%,40%)';
        ctx.beginPath();
        ctx.fillRect(-size/2, ((_light) ? canvas.area*0.0185 : canvas.area*0.02 ) -size/2, size, size * 4 *(_light?0.75:1));
        ctx.restore();

        //o
        ctx.save();
        if(!_light) ctx.scale(1, 0.75);
        ctx.translate(canvas.width/2, (_light) ? canvas.height/2 : canvas.height/2/0.75+canvas.area*0.004);

        ctx.fillStyle = _light ? _black : _white;
        ctx.beginPath();
        ctx.arc(0,0,canvas.area*0.004,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle = _light ? 'hsl(0,0%,90%)' : 'hsl(0,0%,15%)';
        ctx.beginPath();
        ctx.arc(0,0,canvas.area*0.002,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
    function drawSwitchBody(){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2+canvas.area*0.012);
        let size = canvas.area/10;
        ctx.fillStyle = _light ? 'hsl(0,0%,90%)' : 'hsl(0,0%,15%)';
        ctx.fillRect(-size/2, size/2, size, size/20);
        ctx.fillStyle = _light ? 'hsl(0,0%,98%)' : 'hsl(0,0%,19%)';
        ctx.fillRect(-size/2, -size/2, size, size);

        let width = size*0.2;
        let height = size*0.45;

        if(_light){
    
            ctx.fillStyle = 'hsl(0,0%,100%)';
            ctx.fillRect(-width/2, 0, width, height/2-height/8);
            ctx.fillStyle = 'hsl(0,0%,90%)';
            ctx.fillRect(-width/2, height/2-height/8, width, height/8);
            ctx.fillStyle = 'hsl(0,0%,94%)';
            ctx.fillRect(-width/2, height/2, width, height/8);
            
        }
        else{
    
            ctx.fillStyle = 'hsl(0,0%,22%)';
            ctx.fillRect(-width/2, -height/2, width, height/8);
            ctx.fillStyle = 'hsl(0,0%,15%)';
            ctx.fillRect(-width/2, -height/2+height/8, width, height/2-height/8);

        }
        ctx.strokeStyle = _light ? 'hsl(0,0%,85%)' : 'hsl(0,0%,10%)';
        ctx.strokeRect(-size/2, -size/2, size, size);
        ctx.strokeStyle = _light ? 'hsl(0,0%,80%)' : 'hsl(0,0%,5%)';
        ctx.strokeRect(-width/2, -height/2, width, height);

        ctx.restore();
    }
}
export default light_switch;