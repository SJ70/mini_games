import Text from "./Text.js";

class Score extends Text{
    constructor(canvas, ctx, color){
        super(canvas, ctx, color);
        this.text = 0;
    }
    addScore(){
        this.text++;
    }
    setScore(score){
        this.text = score;
    }
    getScore(){
        return this.text;
    }
}

export default Score;