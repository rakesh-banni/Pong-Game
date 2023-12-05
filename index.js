const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretxt = document.querySelector("#scoretext");
const restbtn = document.querySelector("#resetbtn");
const startbtn = document.querySelector("#startbtn");
const pausebtn = document.querySelector("#pausebtn");

const gamewidth = gameboard.clientWidth;
const gameheight = gameboard.height;
const boardbackground = "forestgreen"
const paddle1color = "lightblue";
const paddle2color = "red";
const paddleboarder = "black"
const ballcolor = "yellow"
const ballboardercolor = "black"
const ballradius = 12.5;
const paddlespeed = 100;

let intervalid;
let ballspeed = 1;
let ballX = gamewidth/2;
let ballY = gameheight/2;
let ballXdirection = 0;
let ballYdirection = 0;
let player1score = 0;
let player2score = 0;
let paddle1 = {
    width:25,
    height:100,
    x: 0,
    y: 0
}


let paddle2 = {
    width:25,
    height:100,
    x: gamewidth-25,
    y: gameheight-100
}

window.addEventListener("keydown", changedirection)
restbtn.addEventListener("click", resetgame)
startbtn.addEventListener("click", gamestart)
pausebtn.addEventListener("click", ()=>{
    clearTimeout(intervalid)
})


clearboard();
drawpaddles();
drawball(ballX, ballY);
function gamestart(){
    creatball();
    nexttick();
};

function nexttick(){
    intervalid = setTimeout(()=>{
        clearboard();
        drawpaddles();
        drawball(ballX, ballY);
        moveball();
        checkcollision();
        nexttick();
    }, 10);
};

function clearboard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0,0, gamewidth, gameheight);
};

function drawpaddles(){

    ctx.strokeStyle = paddleboarder;

    ctx.fillStyle = paddle1color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)

    ctx.fillStyle = paddle2color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle1.height)
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
};

function creatball(){
    ballspeed = 1;
    if (Math.round(Math.random())==1){
        ballXdirection = 1;
    }
    else{
        ballXdirection = -1
    }

    if (Math.round(Math.random())==1){
        ballYdirection = 1;
    }
    else{
        ballYdirection = -1
    }
    ballX = gamewidth /2;
    ballY = gameheight /2;
    drawball(ballX, ballY)
};

function moveball(){
    ballX+=(ballspeed*ballXdirection)
    ballY+=(ballspeed*ballYdirection)
};

function drawball(ballx, bally){
    ctx.fillStyle = ballcolor;
    ctx.strokeStyle = ballboardercolor;
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballx, bally, ballradius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke();
};

function checkcollision(){
    if(ballY<=0+ballradius){
        ballYdirection*=-1
    }
    if(ballY>=gameheight-ballradius){
        ballYdirection*=-1
    }
    if(ballX<=0){
        player2score+=1;
        updatescore()
        creatball()
        return
    }
    if(ballX>=gamewidth){
        player1score+=1;
        updatescore()
        creatball()
        return
    }
    if(ballX <= (paddle1.x+paddle1.width+ballradius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x+paddle1.width) + ballradius;
            ballXdirection *=-1
            ballspeed+=0.1
        }
    }
    if(ballX >= (paddle2.x-ballradius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballXdirection *=-1
            ballspeed+=0.1
        }
    }
};

function changedirection(event){
    const keypressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keypressed){
        case(paddle1Up):
        if(paddle1.y > 0){
            paddle1.y -= paddlespeed;
        }
        break;
        case(paddle1Down):
        if(paddle1.y < gameheight-paddle1.height){
            paddle1.y +=paddlespeed;
        }
        break;
        case(paddle2Up):
        if(paddle2.y > 0){
            paddle2.y -=paddlespeed;
        }
        break;
        case(paddle2Down):
        if(paddle2.y < gameheight-paddle2.height){
            paddle2.y +=paddlespeed;
        }
        break;
    }
};

function updatescore(){
    scoretxt.textContent = `${player1score} : ${player2score}`
};

function resetgame(){
    player1score = 0;
    player2score = 0;
    paddle1 = {
        width:25,
        height:100,
        x: 0,
        y: 0
    }
    
    
    paddle2 = {
        width:25,
        height:100,
        x: gamewidth-25,
        y: gameheight-100
    }
    updatescore()
    ballspeed = 1;
    ballX = gamewidth/2;
    ballY = gameheight/2;
    ballXdirection = 0;
    ballYdirection = 0;
    clearTimeout(intervalid)
    clearboard();
    drawpaddles();
    drawball(ballX, ballY);
};

