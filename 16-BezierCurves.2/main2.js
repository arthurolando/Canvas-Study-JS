const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var pFinal = {},
    interPoint = {},
    t = 0,
    direction = 0.01,
    points = [];

for (var i = 0; i < 10; i++) {
    point = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height), 
    }
    points.push(point);
}

function init() {
    context.clearRect(0, 0, width, height);

    draw(points[0])
    for (var i = 1; i < points.length; i++) {
        draw(points[i]);
    }

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.strokeStyle = "lightgray";
    context.stroke();
    context.closePath();

    context.beginPath();
    utils.multicurve(points, context);
    context.closePath();

}

function draw(particle) {
    context.beginPath();
    context.arc(particle.x, particle.y, 3, 0, Math.PI * 2, false);
    context.fillStyle="gray";
    context.fill();
    context.closePath()
}

window.addEventListener("DOMContentLoaded", init);