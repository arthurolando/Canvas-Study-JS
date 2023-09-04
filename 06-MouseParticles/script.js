const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height, balls = [];
let mouse = {
    x: undefined,
    y: undefined
}

let rgb = [
	"rgb(26, 188, 156)",
	"rgb(46, 204, 113)",
	"rgb(52, 152, 219)",
	"rgb(155, 89, 182)",
	"rgb(241, 196, 15)",
	"rgb(230, 126, 34)",
	"rgb(231, 76, 60)"
]

function init(){
    resizeReset();
    animationLoop();
}

function resizeReset() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function animationLoop() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    drawBalls();

    let temp = [];
    for (let i = 0; i < balls.length; i++){
        if (balls[i].time <= balls[i].ttl){
            temp.push(balls[i]);
        }
    }
    balls = temp;

    requestAnimationFrame(animationLoop);
}

function drawBalls () {
    for (let i = 0; i < balls.length; i++){
        balls[i].update();
        balls[i].draw();
    }
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 5; i++){
        balls.push(new Ball());
    }
}

function click(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 50; i++){
        balls.push(new Ball());
    }
    balls.forEach(ball => {
        if (ball.time > Math.round(6, 12) * 10){
            ball.time = 120;
        }       
        if (ball.x > mouse.x){
            ball.end.x = ball.x + getRandomInt(-100, 300) * 5;
        }
        else {
            ball.end.x = ball.x + getRandomInt(-300, 100) * 5;
        }
        if (ball.y > mouse.y){
            ball.end.y = ball.y + getRandomInt(-100, 300) * 5;
        }
        else{
            ball.end.y = ball.y + getRandomInt(-300, 100) * 5;
        }
    });
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

class Ball {
    constructor(){
        this.start = {
            x: mouse.x + getRandomInt(-20, 20),
            y: mouse.y + getRandomInt(-20, 20),
            size: getRandomInt(30, 40),  
        }
        this.end = {
            x: mouse.x + getRandomInt(-300, 300),
            y: mouse.y + getRandomInt(-300, 300),
        }

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = rgb[getRandomInt(0, rgb.length - 1)];
    
        this.time = 0;
        this.ttl = 120;
    }
    draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        if (this.time <= this.ttl){
            let progress = 1 - (this.ttl - this.time) / this.ttl;
        
            this.size = this.start.size * (1 - easeOutQuart(progress) );
            this.x = this.x + (this.end.x - this.x) * 0.01;
            this.y = this.y + (this.end.y - this.y) * 0.01;
        }
        this.time++;
    }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("click", click);
window.addEventListener("mouseout", mouseout);

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse: (${mouse.x}, ${mouse.y})`;
    document.querySelector("#debug span#balls").innerText = `balls.length = ${balls.length}`;
}, 100);