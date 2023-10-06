const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var pFinal = {},
    t = 0,
    direction = 0.01,
    p0 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height),    
    },  
    p1 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height),    
    },  
    p2 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height),    
    },  
    p3 = {
        x: utils.randomRange(0, width),
        y: utils.randomRange(0, height),    
    },
    points = [p0, p1, p2, p3];

function init() {
    context.clearRect(0, 0, width, height);

    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    context.stroke();
    context.closePath();

    context.strokeStyle = "black";
    context.beginPath();
    utils.multicurve(points, context);
    context.closePath();
}

function draw(particle, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(particle.x, particle.y, 3, 0, Math.PI * 2, false);
    context.fill();
    context.closePath()
}

window.addEventListener("DOMContentLoaded", init);