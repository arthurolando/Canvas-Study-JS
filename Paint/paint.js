const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let marginX = window.innerWidth * 0.05 * window.devicePixelRatio;
let marginY = window.innerHeight * 0.05 * window.devicePixelRatio;

let width = canvas.width = window.innerWidth * 0.9;
let height = canvas.height = window.innerHeight * 0.55;

let mouse = {
    x: undefined,
    y: undefined
}

let drawing = {
    x: undefined,
    y: undefined,
    state: false,
    color: "#000",
    width: 10,
}

function init() {
    ctx.fillStyle = "#e1e1e1";
    ctx.fillRect(0, 0, width, height);
    canvas.style.marginLeft = `${marginX}px`;
    canvas.style.marginTop = `${marginY}px`;
    canvas.style.marginBottom = `${marginY}px`;
    console.log(window.devicePixelRatio);
}

function resizeReset() {
    marginX = window.innerWidth * 0.05;
    marginY = window.innerHeight * 0.05;
    console.log(marginX);
    canvas.style.marginLeft = `${marginX}px`;
    canvas.style.marginTop = `${marginY}px`;
    canvas.style.marginBottom = `${marginY}px`; 
}

function start() {
    drawing.state = true;
    canvas.style.cursor = "crosshair";
    ctx.beginPath();
    ctx.moveTo(drawing.x, drawing.y);
    ctx.stroke();
}

function stop() {
    canvas.style.cursor = "pointer";
    ctx.closePath();
    drawing.state = false;
}

function click() {
    drawing.state = !drawing.state;
    if (drawing.state) {
        start();
    }
    else {
        stop();
    }
}

function draw() {
    if (drawing.state) {
        ctx.lineTo(drawing.x, drawing.y);
        ctx.strokeStyle = drawing.color;
        ctx.lineWidth = drawing.width;
        ctx.Cap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

    }
}

function changeBackground(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
}

function selectBackground() {
    var color = document.querySelector(".background-buttons input.color").value;
    changeBackground(color);
}

function changePenColor(color) {
    drawing.color = color;
}

function selectPenColor() {
    var color = document.querySelector(".pencolor-buttons input.color").value;
    changePenColor(color);
}

function inRange(point, min, max) {
    return (point > min && point < max)? true: false;
}

function mousemove(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    if (inRange(mouse.x, marginX, (width + marginX)) 
        && inRange(mouse.y - 18, marginY, (height + marginY))) {
        drawing.x = mouse.x - marginX;
        drawing.y = mouse.y - marginY - 18;
    }
    else {
        stop();
        drawing.x = undefined;
        drawing.y = undefined;
    }

    draw();
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
canvas.addEventListener("click", click);

// debug

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse:(${mouse.x}, ${mouse.y}),
    Margem: (${marginX.toFixed(2)}, ${marginY.toFixed(2)}),
    Tela (${width.toFixed(2)}, ${height.toFixed(2)})`;
    document.querySelector("#debug span#pincel").innerText = 
        `Pincel (${(drawing.x == undefined)? "Fora de tela": (drawing.x).toFixed(2)},${(drawing.y == undefined)? "Fora de tela:": (drawing.y).toFixed(2)})`;
}, 100);