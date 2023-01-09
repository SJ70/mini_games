export function InitCanvasSize(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);
}