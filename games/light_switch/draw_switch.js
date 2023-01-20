import { _white_value, _black_value, _white, _black } from './colors.js';

export function draw_switch(canvas,ctx,_light){

    drawSwitchBody(canvas,ctx,_light);
    drawMark(canvas,ctx,_light);

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
export default draw_switch;