const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

var particle = particle.create(width / 2, height / 2, 10, Math.PI * 2 * Math.random());

var friction = vector.create(0.15, 0);

friction.setAngle(particle.velocity.getAngle());

var timer = 100;

function init() {
    animationLoop();
}

function resetResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; 
}

function animationLoop() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(width / 2, height / 2 - 5);
    context.lineTo(width / 2, height / 2 + 5);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(width / 2 - 5, height / 2);
    context.lineTo(width / 2 + 5, height / 2);
    context.stroke();
    context.closePath();

    if (particle.velocity.getLength() > friction.getLength()) {
        particle.velocity.subtractFrom(friction);
    }
    else {
        particle.velocity = vector.create(0, 0);
    }

    particle.update();
    context.beginPath();
    context.arc(particle.position.getX(), particle.position.getY(), 10, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill();
    context.closePath();

    if (timer < 100) {
        timer++;
    }
    else {
        timer = 0;
        particle = particle.create(width / 2, height / 2, 10, Math.PI * 2 * Math.random());
        friction.setAngle(particle.velocity.getAngle());
    }
    requestAnimationFrame(animationLoop);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);
