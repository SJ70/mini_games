const _max_power = 60;
const _color_h = '240';
const _color_s = '80';
const _color_l = '75';

export class Player{

    _powering = false;
    _landed = false;
    power = 0;


    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.current_color_h = _color_h;
        this.current_color_s = _color_s;
        this.current_color_l = _color_l;
        this.init();
    }
    init(){
        this.size = Math.round(this.canvas.area / 25);
        this.current_size_x = this.size;
        this.current_size_y = this.size;
        this.x = this.canvas.width * 0.2;
        this.y = this.canvas.height * 0;
        this.dy = 0;
        this.ddy = this.canvas.height / 1500;
        this.jump_per_power = Math.floor(this.canvas.height/35);
        this.power = 0;
    }

    getPowerLevel(){
        return this.power/_max_power;
    }
    do_power(){
        this._powering = true;
    }
    powering(){
        this.power++;
        this.current_size_y -= this.size/2/_max_power;
        this.current_size_x += this.size/2/_max_power;
        this.current_color_s -= 0.25;
        this.current_color_l -= 0.25;
    }
    isPowering(){
        return (this._powering && this.power<_max_power);
    }

    do_jump(){
        this._powering = false;
        this._landed = false;
        this.dy = - this.power/_max_power * this.jump_per_power;
        this.power = 0;
        this.current_size_x = this.size;
        this.current_size_y = this.size;
        this.current_color_s = _color_s;
        this.current_color_l = _color_l;
    }
    relationWith(floor){
        if(this.x+this.size/2 > floor.x && this.x-this.size/2 < floor.x+floor.size){
            if(this.y > floor.y){
                return 'crashed';
            }
            if(this.y == floor.y){
                return 'landed';
            }
            if(this.y+this.dy > floor.y){
                return 'landing';
            }
        }
        else return 'nothing';
    }
    do_land(){
        this._landed = true;
    }
    do_landing(floor){
        this.dy = floor.y - this.y;
    }
    isLanded(){
        return this._landed;
    }
    
    move(){
        this.y += this.dy;
        this.dy += this.ddy;
    }
    draw(){
        this.ctx.fillStyle = 'hsl(' + this.current_color_h + ',' + this.current_color_s + '%,' + this.current_color_l + '%)';
        this.ctx.fillRect(this.x - this.current_size_x/2, this.y - this.current_size_y, this.current_size_x, this.current_size_y);
    }
    drawArrow(mouse_x){
        let x = (this.x - mouse_x)/this.canvas.width * 50;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.x + this.size*0.5* (x<0?1:-1) -x, this.y-this.current_size_y*0.5)
        this.ctx.moveTo(0, this.size*0.12 * x/20);
        this.ctx.lineTo(this.size*0.2 * (x<0?1:-1), 0);
        this.ctx.lineTo(0, -this.size*0.12 * x/20);
        this.ctx.fill();
        this.ctx.restore();
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.x, this.y -this.size*1.75+(this.current_size_y))
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-this.current_size_x*0.12, this.current_size_x*0.2);
        this.ctx.lineTo(this.current_size_x*0.12, this.current_size_x*0.2);
        this.ctx.fill();
        this.ctx.restore();
    }

    isFallen(){
        return this.y-this.size > this.canvas.height;
    }

    getX(){
        return this.x;
    }
}
export default Player