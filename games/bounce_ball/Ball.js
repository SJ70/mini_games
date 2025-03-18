export class Ball{
    x=0;
    y=0;

    constructor(canvas, height_ratio){
        this.canvas = canvas;
        this.height_ratio = height_ratio;
        this.init(canvas.width/2);
    }

    init(x){
        this.x = x;
        this.bounce_dy = -this.canvas.height/50;
        this.y = this.canvas.height * this.height_ratio;
        this.dy = this.bounce_dy;
        this.ddy = this.canvas.height/4000;
    }

    move(mouse_x, _speed_level, dt){
        this.x += (mouse_x - this.x) * 0.03 * _speed_level * dt * 60;
        this.y += this.dy * _speed_level * dt * 60;
        this.dy += this.ddy * _speed_level * dt * 60;
    }

    bounce(){
        this.y = this.canvas.height * this.height_ratio;
        this.dy = this.bounce_dy;
    }

    checkBounce_x(x,size){
        return this.x > x && this.x < x+size;
    }
    checkBounce(x,size,height){
        return this.x > x && this.x < x+size && this.y >= height;
    }   

    is_out_of_map(){
        return this.y > this.canvas.height;
    }

}
export default Ball;