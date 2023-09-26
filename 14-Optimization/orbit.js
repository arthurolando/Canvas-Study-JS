const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var sun = particle.create(width / 2, height / 2, 0, 0),
    planet = particle.create(width / 2 + 200, height / 2, 10, -Math.PI / 2);

sun.mass = 20000;


function init() {
    animationLoop();
}

function animationLoop() {
    context.clearRect(0, 0, width, height);

    context.globalCompositeOperation = "lighter";
    context.beginPath();
    context.fillStyle = "#ffff00";
    context.arc(sun.x, sun.y, 20, 0, Math.PI * 2, false);
    context.fill();
    context.closePath()

    planet.gravitateTo(sun);
    planet.update();

    context.beginPath();
    context.fillStyle = "#aff";
    context.arc(planet.x, planet.y, 5, 0, Math.PI * 2, false);
    context.fill();
    context.closePath()

    requestAnimationFrame(animationLoop);
}

window.addEventListener("DOMContentLoaded", init);