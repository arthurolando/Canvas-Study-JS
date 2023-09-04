const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
};
let ball = [];
let particle = [];
let count;

var centerX = width / 2 ,
    centerY = height / 2,
    radius = 200,
    ballradius = 15,
    angle = 0,
    numBalls = 10,
    numParticles = 50,
    slice = Math.PI * 2 / numBalls,
    x, y;

class Ball {
    constructor (angle){
        this.angle = angle;
        this.x = centerX + Math.cos(this.angle) * radius;
        this.y = centerY + Math.sin(this.angle) * radius;
        this.radius = ballradius;
        this.color = "#a4f";
        this.state = true;
    }
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath(); 
    }
    update() {
        if (this.state) {
            if (getDistance(this.x, this.y, mouse.x, mouse.y) < this.radius) {
                this.color = "#f25";
                this.draw();
                this.hover = true;
            }
            else {
                this.color = "#a4f";
                this.draw();
                this.hover = false;
            }
        }
    }
    rotate() {
        this.angle = this.angle + 0.001;
        this.x = centerX + Math.cos(this.angle) * radius;
        this.y = centerY + Math.sin(this.angle) * radius;  
        this.update();   
    }
}

class Particle {
    constructor (i) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.radius = ballradius / 2 * getRandomInt(0, 2);
        this.color = "#faf";

        this.time = 0;
        this.death = 60;
    }
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath(); 
    }
    update() {
        this.progress = (this.death - this.time) / this.death;
        this.draw();
        this.radius = this.radius * (1 - this.progress / 10);
        this.x = this.x + this.x * getRandomInt(-1, 1) / 100;
        this.y = this.y + this.y * getRandomInt(-1, 1) / 100;
    }
}

function CreateBalls() {
    count = 0;

    for (var i = 0; i < numBalls; i += 1) {
        angle = i * slice;
        ball[i] = new Ball(angle);
    }  
    DrawBalls();
}

function DrawBalls() {
    context.beginPath();
    context.fillStyle = "white";
    context.arc(centerX, centerY, ballradius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();

    for (var i = 0; i < numBalls + count; i += 1) {
        ball[i].draw();
    }    
}

function ExplodeBalls(n) {
    for (var i = 0; i < numParticles; i += 1) {
        particle[i] = new Particle(n);
        console.log(i)
        particle[i].draw();
    }  
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function getDistance(Ax, Ay, Bx, By) {
    return Math.sqrt (
        (Ax - Bx) * (Ax - Bx) +
        (Ay - By) * (Ay - By)
    )
}

function init() {
    CreateBalls();
    animationLoop();
}

function animationLoop() {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";

    for (var i = 0; i < numBalls + count; i += 1) {
        ball[i].rotate();
    }
    
    if(particle.length > 0) {
        for (var i = 0; i < numParticles; i++) {
            particle[i].update();
        }
    }
    
    DrawBalls();

    requestAnimationFrame(animationLoop);
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}

function click(e) {
    mousemove(e);
    if (getDistance(mouse.x, mouse.y, centerX, centerY) < ballradius){
        if(count == 0) {
            numBalls++
        }
        else {
            numBalls = numBalls + count;
        }
        ball.pop();
        slice = Math.PI * 2 / numBalls,
        CreateBalls();
    }

    else {
        var noball = true;
        for (var i = 0; i < numBalls + count; i += 1) {
            if (ball[i].hover) {
                ball[i].state = false;
                ball[i].hover = false;
                ball[i].color = "#222";
                ball[i].radius += 1;
                ball[i].draw();
                console.log(i);
                numBalls--;
                count++;
                ball[i].update();
                noball = false;
                ExplodeBalls(i);
            }
        }
        if (noball) {
            ball.pop();
            slice = Math.PI * 2 / numBalls,
            CreateBalls();
        }
    } 
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("mousemove", mousemove);
window.addEventListener("click", click);

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse: (${mouse.x}, ${mouse.y})`;
    document.querySelector("#debug span#balls").innerText = `balls.length = ${numBalls}`;
}, 100);