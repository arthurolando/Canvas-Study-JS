const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

var gravity = 0.2;

var particleA = particle.create (utils.randomRange(0, width),
                                 utils.randomRange(0, height),
                                 utils.randomRange(0, 50),
                                 utils.randomRange(0, Math.PI * 2),
                                 gravity);

var particleB = particle.create (utils.randomRange(0, width),
                                 utils.randomRange(0, height),
                                 utils.randomRange(0, 50),
                                 utils.randomRange(0, Math.PI * 2),
                                 gravity);

var particleC = particle.create (utils.randomRange(0, width),
                                 utils.randomRange(0, height),
                                 utils.randomRange(0, 50),
                                 utils.randomRange(0, Math.PI * 2),
                                 gravity);

var k = 0.1;
var separation = 200;

particleA.friction = 0.9;
particleA.radius = 20;

particleB.friction = 0.9;
particleB.radius = 20;

particleC.friction = 0.9;
particleC.radius = 20;

function init() {
    animationLoop();
    document.querySelector("#debug span").innerText = 
    `K: ${k}
    Separation: ${separation}
    Gravity: ${gravity}`;
}

function resetResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; 
}


function animationLoop() {
    context.clearRect(0, 0, width, height);

    spring(particleA, particleB, separation);
    spring(particleB, particleC, separation);
    spring(particleC, particleA, separation);

    checkEdges(particleA);
    checkEdges(particleB);
    checkEdges(particleC);

    particleA.update();
    particleB.update();
    particleC.update();

    drawParticle(particleA);
    drawParticle(particleB);
    drawParticle(particleC);
    
    context.beginPath();
    context.moveTo(particleA.position.getX(), particleA.position.getY());
    context.lineTo(particleB.position.getX(), particleB.position.getY());
    context.lineTo(particleC.position.getX(), particleC.position.getY());
    context.lineTo(particleA.position.getX(), particleA.position.getY());
    context.stroke();
    context.closePath();

    requestAnimationFrame(animationLoop);
}

function drawParticle(particle) {
    context.beginPath();
    context.arc(particle.position.getX(), particle.position.getY(), particle.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();  
}

function spring(p0, p1, separation) {
    var distance = p0.position.subtract(p1.position);
    distance.setLength(distance.getLength() - separation);

    var springForce = distance.multiply(k);

    p1.velocity.addTo(springForce);
    p0.velocity.subtractFrom(springForce);
}

function checkEdges(particle) {
    if(particle.position.getY() + particle.radius > height) {
        particle.position.setY(height - particle.radius);
        particle.velocity.setY(particle.velocity.getY() * -0.95);
    }
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resetResize);
