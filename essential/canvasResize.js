export function canvasResize(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.area = Math.sqrt(canvas.width*canvas.height);
    canvas.diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height);
}
export default canvasResize