const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

var springPoint = {
    x: width / 2,
    y: height/ 2.
},
    weight = particle.create(Math.random() * width,Math.random() * height, 50, Math.random() * Math.PI * 2, 0.5),
    k = 0.1,
    springLength = 100;

weight.radius = 20;
weight.friction = 0.95;

function init() {
    animationLoop();
    document.querySelector("#debug span").innerText = 
    `K: ${k.toFixed(1)}
    Friction: ${(1 - weight.friction).toFixed(2)}
    Gravity: ${weight.gravity}`;
}

function resetResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; 
}

document.body.addEventListener("mousemove", function (e) {
    springPoint.x = (e.clientX);
    springPoint.y = (e.clientY);
});

function animationLoop() {
    context.clearRect(0, 0, width, height);

    var dx = springPoint.x - weight.x,
        dy = springPoint.y - weight.y,
        distance = Math.sqrt(dx * dx + dy * dy),
        springForce = (distance - springLength) * k,
        ax = dx / distance * springForce,
        ay = dy / distance * springForce;

    weight.vx += ax;
    weight.vy += ay;

    weight.update();

    context.beginPath();
    context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();    

    context.beginPath();
    context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
    
    context.beginPath();
    context.moveTo(weight.x, weight.y);
    context.lineTo(springPoint.x, springPoint.y);
    context.stroke();
    context.closePath();

    requestAnimationFrame(animationLoop);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);
