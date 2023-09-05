const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var sun = particle.create(width / 2, height / 2, 0, 0),
    planets = [],
    numPlanets = 5;

for (var i = 0; i < numPlanets; i++) {
    planets.push(particle.create(width / numPlanets * (i + 1), height / numPlanets * (i + 1), 10, -Math.PI / 2))
}

sun.mass = 450000;

var color = [
    "#5df",
    "#f2a",
    "#4a4",
    "#2af",
    "#dfa"
]

function init() {
    animationLoop();
}

function animationLoop() {
    // context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    context.beginPath();
    context.fillStyle = "#ffff00";
    context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
    context.fill();
    context.closePath()

    for (var i = 0; i < numPlanets; i++) {
        var planet = planets[i];

        planet.gravitateTo(sun);
        planet.update();

        context.beginPath();
        context.fillStyle = color[i];
        context.arc(planet.position.getX(), planet.position.getY(), 5, 0, Math.PI * 2, false);
        context.fill();
        context.closePath()

        planet.distanceTo(sun) < 0 ? planets.splice[i]: "";
    }

    requestAnimationFrame(animationLoop);
}

window.addEventListener("DOMContentLoaded", init);