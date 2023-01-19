import Game from '../../essential/Game.js';
import Floor from './Floor.js';
import Player from './Player.js';

export function jump_ahead(){
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let game = new Game(canvas, ctx, 'bounce_ball', 'hsl(240,80%,75%)', '50,50,80', '255,255,255');

    game.score.setFollowMouse(0.05, 0.05);
    game.clickToStart.setFollowMouse(0.1, 0.1);
    game.circle.setSizeDivisor(10000);
    game.resize();

    let player = new Player(canvas, ctx);
    let floor = [];

    canvas.onclick = function(){
        game.click();
    }
    canvas.onmousedown = function(){
        if(player.isLanded()){
            player.do_power();
        }
    }
    canvas.onmouseup = function(){
        if(player.isLanded()){
            for(let i=0; i<floor.length; i++){
                floor[i].do_move(player.getPowerLevel(), game.mouse_x-player.getX());
            }
            player.do_jump();
        }
    }
    canvas.onmousemove = function(event){
        game.mousemove(event);
    }
    window.onresize = function(){
        game.resize();
    }

    // overriding
    game.gamestart = function(){
        game.gamestart_essential();
        floor = [];
        floor.push(new Floor(canvas,ctx,this.canvas.width*0.1,this.canvas.height*0.6,this.canvas.width*0.2));
        player.init();
    }
    game.gameover = function(){
        game.gameover_essential();
    }

    function addFloor(){
        let tmp = canvas.width * (50 - game.score.getScore()) * 0.005;
        let size = canvas.width * 0.1 + ((tmp>0)?tmp:0);
        let x = canvas.width/2 + (canvas.width/2 - size) * Math.random();
        let y = canvas.height * (0.4 + Math.random()*0.5);
        floor.push(new Floor(canvas,ctx,x,y,size));
    }

    run();
    function run(){
        game.resetCanvas();

        if(game.isPlaying()){
            runGame();
        }

        drawPlayer();
        if(game.isPlaying()) drawFloors();
        game.drawEssential(player.x, player.y);

        if(!game.isOnPage()) return;
        console.log("jump_ahead")
        requestAnimationFrame(run);
    }
    function runGame(){
        if(!player.isLanded()){
            player.move();
            for(let i=0; i<floor.length; i++){
                floor[i].move();

                switch(player.relationWith(floor[i])){
                    case 'crashed':
                        for(let j=0; j<floor.length; j++){
                            // if(i==j) continue; // 충돌한 벽만 조금 더 움직이는 버그
                            floor[j].reverseDir();
                        }
                        break;
                    case 'landed':
                        player.do_land();
                        break;  
                    case 'landing':
                        player.do_landing(floor[i]);
                        break;
                }
            }
        }

        if(floor.length>0){
            if(player.relationWith(floor[floor.length-1])=='landed'){
                addFloor();
                game.score.addScore();
            }
            if(floor[0].isOutOfMap()){
                floor.shift();
            }
        }
        for(let i=0; i<floor.length; i++){
            floor[i].spawn();
        }

        if(player.isPowering()){
            player.powering();
        }
        if(player.isFallen()){
            game.gameover();
        }
    }
    function drawPlayer(){
        player.draw();
        if(player.isLanded()){
            player.drawArrow(game.mouse_x);
        }
    }
    function drawFloors(){
        for(let i=0; i<floor.length; i++){
            floor[i].draw();
        }
    }
}
export default jump_ahead;