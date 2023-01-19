import Game from '../../essential/Game.js';

export function light_switch_dummy(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'light_switch', 'rgb(255,255,255)', '128,128,128', '255,255,255');

    let _light = true;

    game.score.setFollowMouse(0.05, 0.05);
    game.clickToStart.setFollowMouse(0.1, 0.1);
    game.circle.setSizeDivisor(10000);
    game.resize();

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousedown = function(){
        _light = !_light;
        game.setBackgroundColor( _light ? '#DDDDDD' : '#1D1D1D');
        game.circle.setColor( _light ? '#1D1D1D' : '#DDDDDD');
    }
    canvas.onmouseup = function(){
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



        let size = canvas.area/10;
        let l = _light ? 0 : 80;
        ctx.fillStyle = 'hsla(0,0%,0%,0.025)';
        ctx.fillRect(canvas.width/2-size/2, canvas.height/2+size/2, size, size/20);
        ctx.fillStyle = 'hsl(0,0%,'+(99-l)+'%)';
        ctx.strokeStyle = 'hsl(0,0%,'+(85-l)+')';
        ctx.fillRect(canvas.width/2-size/2, canvas.height/2-size/2, size, size);
        ctx.strokeRect(canvas.width/2-size/2, canvas.height/2-size/2, size, size);

        let width = canvas.area/10*0.2;
        let height = canvas.area/10*0.45;

        if(_light){
    
            ctx.fillStyle = 'hsl(0,0%,'+(95-l)+'%)';
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2-height/2, width, height)
    
            ctx.fillStyle = 'hsl(0,0%,'+(90-l)+'%)';
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2-height/2, width, height/2)
            ctx.fillStyle = 'hsl(0,0%,'+(100-l)+'%)';
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2-height/2, width, height/8)
            
        }
        else{
    
            ctx.fillStyle = 'hsl(0,0%,'+(95-l)+'%)';
            let width = canvas.area/10*0.2;
            let height = canvas.area/10*0.45;
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2-height/2, width, height)
    
            ctx.fillStyle = 'hsl(0,0%,'+(100-l)+'%)';
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2, width, height/2)
            ctx.fillStyle = 'hsl(0,0%,'+(90-l)+'%)';
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2+height/2-height/8, width, height/8)
            ctx.fillStyle = 'hsl(0,0%,'+(95-l)+'%)';
            ctx.fillRect(canvas.width/2-width/2, canvas.height/2+height/2, width, height/8)

        }
        ctx.strokeStyle = 'hsl(0,0%,'+(80-l)+'%)';
        ctx.strokeRect(canvas.width/2-width/2, canvas.height/2-height/2, width, height);




        if(!game.isOnPage()) return;
        console.log("light_switch_dummy")
        requestAnimationFrame(run);
    }
}
export default light_switch_dummy;