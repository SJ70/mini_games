import {_c1, _c2, _c1_value, _c2_value} from './colors.js';

export class Player{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.init();
        this.resize();
    }

    init(){
        this.reversed = false;
        this.angle = 0;
    }
    resize(){
        this.area = Math.round(Math.min(this.canvas.height, this.canvas.width));
        this.size = this.area/60;
    }

    rotate(value){
        this.angle += value;
    }

    draw(){
        this.ctx.save();
        this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillStyle = this.reversed?_c2:_c1;
        this.ctx.beginPath();
        this.ctx.rotate(this.angle/180*Math.PI);
        this.ctx.arc(0, -this.area/2.5 + (this.size * ((this.reversed)?1:-1)), this.size, 0, Math.PI*2);
        this.ctx.fill();
        this.ctx.restore();
    }

    reverse(){
        this.reversed = !this.reversed;
    }

    addAngle(angle){
        this.angle += angle;
    }
    isOverAngle(){
        return this.angle>=360;
    }
    getAngle(){
        return this.angle;
    }
}
export default Player