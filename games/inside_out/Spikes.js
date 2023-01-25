import {_c1, _c2, _c1_value, _c2_value} from './colors.js';

const SPIKE_CNT = 12;
const ANGLE = 360/SPIKE_CNT;
let spikes = [];

export class Spikes{
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.init();
    }
    size = 10;

    init(){
        spikes = [];
        for(let i=0; i<12; i++){
            spikes.push(true);
        }
    }

    reverse_random(current_angle, next_angle){
        for(let i=0; i<SPIKE_CNT; i++){
            let angle = i*ANGLE;
            if((current_angle<=angle+180 && next_angle>angle+180) || (current_angle<=angle-180 && next_angle>angle-180)){
                spikes[i] = Math.random()>0.5;
            }
        }
    }

    isCrashed(current_angle, next_angle, reversed){
        for(let i=0; i<SPIKE_CNT; i++){
            let angle = i*ANGLE;
            if((current_angle<=angle && next_angle>angle) && spikes[i]==reversed){
                return true;
            }
        }
        return false;
    }

    draw(area){
        this.size = area/30;
        this.ctx.save();
        this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
        for(let i=0; i<12; i++){
            this.ctx.beginPath();
            this.ctx.fillStyle = spikes[i]?_c2:_c1;
            this.ctx.arc(0, 0, area/2.5, (-90-this.size/10)/180*Math.PI, (-90+this.size/10)/180*Math.PI);
            this.ctx.lineTo(0,-area/2.5 + (this.size * (spikes[i]?1:-1)));
            this.ctx.fill();
            this.ctx.rotate(ANGLE/180*Math.PI);
        }
        this.ctx.restore();
    }
}
export default Spikes;