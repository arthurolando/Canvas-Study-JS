const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

var springPoint = vector.create(width / 2, height / 2),
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
    Gravity: ${weight.gravity.getLength()}`;
}

function resetResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; 
}

document.body.addEventListener("mousemove", function (e) {
    springPoint.setX(e.clientX);
    springPoint.setY(e.clientY);
});

function animationLoop() {
    context.clearRect(0, 0, width, height);

    var distance = springPoint.subtract(weight.position);
    distance.setLength(distance.getLength() - springLength)
    var springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);

    weight.update();

    context.beginPath();
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();    

    context.beginPath();
    context.arc(springPoint.getX(), springPoint.getY(), 4, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
    
    context.beginPath();
    context.moveTo(weight.position.getX(), weight.position.getY());
    context.lineTo(springPoint.getX(), springPoint.getY());
    context.stroke();
    context.closePath();

    requestAnimationFrame(animationLoop);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);
