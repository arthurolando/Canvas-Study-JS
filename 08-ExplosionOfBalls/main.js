const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

var particles = [],
    numParticles = 100;

for (var i = 0; i < numParticles; i++) {
    particles.push(particle.create(width / 2, height / 2, Math.random() * 4 + 1, Math.random() * Math.PI * 2));
}

function init() {
    animationLoop();
}

function resetResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; 
}

function Draw(p) {
    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}

function animationLoop() {
    context.clearRect(0, 0, width, height);
    for (var i = 0; i < numParticles; i++) {
        var p = particles[i];
        p.update();
        Draw(p);
    }

    requestAnimationFrame(animationLoop);
}

function click(e) {
    for (var i = 0; i < numParticles; i++) {
        var p = particles[i];
        p.position.setX(e.x);
        p.position.setY(e.y);
        p.update();
        Draw(p);
    }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);
window.addEventListener("click", click);