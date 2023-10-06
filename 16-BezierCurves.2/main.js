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
    cp = {
        x: p1.x * 2 - (p0.x + p2.x) / 2,
        y: p1.y * 2 - (p0.y + p2.y) / 2,
    }

function init() {
    context.clearRect(0, 0, width, height);

    draw(p0, "black");
    draw(p1, "blue");
    draw(p2, "black");
    draw(cp, "red");
    
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(cp.x, cp.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
    
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    context.stroke();
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