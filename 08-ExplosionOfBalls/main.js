const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

var particles = [],
    numParticles = 100,
    velocity,
    direction,
    gravity = 0.0;

document.querySelector("#debug span#numBalls").innerText = `Particles:(${numParticles})`;
document.querySelector("#debug span#gravity").innerText = `gravity:(${gravity})`;

for (var i = 0; i < numParticles; i++) {
    velocity =  Math.random() * 5 + 2;
    direction = Math.random() * Math.PI * 2;
    particles.push(particle.create(width / 2, height / 2, velocity, direction, gravity));
}

function init() {
    animationLoop();
}

function resetResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; 
}

console.log("To change gravity use changeGravity(value)");
function changeGravity(gravity) {
    gravity = gravity
    for (var i = 0; i < numParticles; i++) {
        particles[i].gravity = vector.create(0, gravity);
    }
    document.querySelector("#debug span#gravity").innerText = `gravity:(${gravity})`;
}

function Draw(p) {
    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
    context.fillStyle = "black";
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
        velocity =  Math.random() * 5 + 2;
        var p = particles[i];
        p.position.setX(e.x);
        p.position.setY(e.y);
        p.velocity.setLength(velocity);
        p.velocity.setAngle(Math.random() * Math.PI * 2);
        p.update();
        Draw(p);
    }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);
window.addEventListener("click", click);