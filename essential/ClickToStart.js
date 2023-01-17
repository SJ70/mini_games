import Text from "./Text.js";

class ClickToStart extends Text{
    constructor(canvas, ctx, color){
        super(canvas, ctx, color);
        this.text = "Click to Start";
        this.heightMultiplier = 0.65;
        this.fontSize = 0.08;
    }
}

export default ClickToStart;