import { _white_value, _black_value, _white, _black } from './colors.js';

export class Line{
    constructor(canvas, ctx, speedDivisor, dir, time, light){
        this.canvas = canvas;
        let line_width = canvas.area/500;
        this.ctx = ctx;
        switch(dir){
            case 'up' :
            case 'down' :
                this.x = 0;
                this.dx = 0;
                this.width = canvas.width;
                this.speed = Math.ceil(canvas.height / speedDivisor);
                this.height = line_width;
                break;
            case 'left' :
            case 'right' :
                this.y = 0;
                this.dy = 0;
                this.height = canvas.height;
                this.speed = Math.ceil(canvas.width / speedDivisor);
                this.width = line_width;
                break;
        }
        switch(dir){
            case 'up' :
                this.y = canvas.height/2 + time*this.speed;
                this.dy = -this.speed;
                break;
            case 'down' :
                this.y = canvas.height/2 - time*this.speed;
                this.dy = this.speed;
                break;
            case 'left' :
                this.x = canvas.width/2 + time*this.speed;
                this.dx = -this.speed;
                break;
            case 'right' :
                this.x = canvas.width/2 - time*this.speed;
                this.dx = this.speed;
                break;
        }
        this.light = light;
    }

    getLight(){
        return this.light;
    }

    move(dt){
        this.x += this.dx * dt * 60;
        this.y += this.dy * dt * 60;
    }

    draw(){
        this.ctx.fillStyle = this.light ? _white : _black;
        this.ctx.save();
        this.ctx.filter = 'blur('+this.canvas.area/500+'px)';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isOnMiddle(dt){
        return (this.x - this.speed * dt * 60 < this.canvas.width/2) && (this.x >= this.canvas.width/2) 
        || (this.y - this.speed * dt * 60 < this.canvas.height/2) && (this.y >= this.canvas.height/2) ;
    }

    isVisible(light){
        return this.light!=light;
    }
}
export default Line;