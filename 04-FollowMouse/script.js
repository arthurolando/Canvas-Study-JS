const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var arrowX = width / 2;
var arrowY = height / 2;
var angle = 0;
var dx, dy;


function init() {
    animationLoop();
}

function animationLoop() {
    context.clearRect(0, 0, width, height);
    drawStraight();

    requestAnimationFrame(animationLoop);
}

function drawStraight() {
    context.save();
    context.translate(arrowX, arrowY);
    context.rotate(angle);

    context.beginPath();
    context.strokeStyle = "#fff";

    context.moveTo(20, 0);
    context.lineTo(-20, 0);
    context.moveTo(20, 0);
    context.lineTo(10, -10);
    context.moveTo(20, 0);
    context.lineTo(10, 10);
    context.stroke();

    context.restore();
}

function mousemove(e) {
    dx = e.clientX - arrowX;
    dy = e.clientY - arrowY;
    angle = Math.atan2(dy, dx)
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("mousemove", mousemove);
