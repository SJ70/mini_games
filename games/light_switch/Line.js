import { _white_value, _black_value, _white, _black } from './colors.js';

export class Line{
    constructor(canvas, ctx, speedDivisor, dir, time, light){
        this.canvas = canvas;
        this.ctx = ctx;
        switch(dir){
            case 'up' :
            case 'down' :
                this.x = 0;
                this.dx = 0;
                this.width = canvas.width;
                this.speed = Math.ceil(canvas.height / speedDivisor);
                this.height = 2;
                break;
            case 'left' :
            case 'right' :
                this.y = 0;
                this.dy = 0;
                this.height = canvas.height;
                this.speed = Math.ceil(canvas.width / speedDivisor);
                this.width = 2;
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

    move(){
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(){
        this.ctx.fillStyle = this.light ? _white : _black;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isOnMiddle(){
        return (this.x==this.canvas.width/2 || this.y==this.canvas.height/2);
    }

    isVisible(light){
        return this.light!=light;
    }
}
export default Line;