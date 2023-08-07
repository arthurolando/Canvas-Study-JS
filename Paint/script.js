const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let marginX = window.innerWidth * 0.05 * window.devicePixelRatio;
let marginY = window.innerHeight * 0.05 * window.devicePixelRatio;

let width = canvas.width = window.innerWidth * 0.9;
let height = canvas.height = window.innerHeight * 0.5;

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

let draws = [];
let index = -1;

function init() {
    ctx.fillStyle = "#e1e1e1";
    ctx.fillRect(0, 0, width, height);
    canvas.style.marginLeft = `${marginX}px`;
    canvas.style.marginTop = `${marginY}px`;
    canvas.style.marginBottom = `${marginY}px`;
    console.log(window.devicePixelRatio);
    penThicknessDraw(drawing.width);
    document.querySelector(".penthickness-buttons input.ranget").value = drawing.width;
    document.querySelector(".penthickness-buttons input.range").value = drawing.width;
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

    while (draws.length - 1 > index){
        draws.pop();
    }
}

function stop(event) {
    canvas.style.cursor = "pointer";
    ctx.closePath();

    if ((event.type != "mouseout") || (drawing.state == true)){
        draws.push(ctx.getImageData(0,0,width,height));
        index += 1;
    }
    drawing.state = false;
}

function click(event) {
    drawing.state = !drawing.state;
    if (drawing.state) {
        start();
    }
    else {
        stop(event);
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

function undoImage() {
    if (index < 0 ){
        changeBackground("#e1e1e1");
    }
    else if (index == 0) {
        changeBackground("#e1e1e1");
        index -= 1;
    }
    else {
        index -= 1;
        ctx.putImageData(draws[index], 0, 0);
    }
}

function redoImage() {
    if (index + 1 < draws.length){
        index += 1;
        ctx.putImageData(draws[index], 0, 0);
    }
}

function penThicknessDraw(thinckness) {
    var penCanvas = document.getElementById("penThickness");
    var penctx = penCanvas.getContext("2d");
    penctx.fillStyle = "white";
    penctx.fillRect(0, 0, penCanvas.width, penCanvas.height);
    penctx.beginPath();
    penctx.lineWidth = thinckness;
    penctx.moveTo(10, 10);
    penctx.lineTo(penCanvas.width - 10, penCanvas.height - 10);
    penctx.stroke();
    penctx.closePath();
}

function penChangeThickness() {
    drawing.width = document.querySelector(".penthickness-buttons input.range").value;
    document.querySelector(".penthickness-buttons input.ranget").value = drawing.width;
    penThicknessDraw(drawing.width);
}

function penChangeThicknesst() {
    var ranget = document.querySelector(".penthickness-buttons input.ranget").value;
    if(ranget > 100 || ranget < 0) {
        document.querySelector(".penthickness-buttons input.ranget").value = drawing.width;
    }
    else {
        drawing.width = document.querySelector(".penthickness-buttons input.ranget").value;
        document.querySelector(".penthickness-buttons input.range").value = drawing.width;
        penThicknessDraw(drawing.width);
    }
}

function dowload() {
    if (confirm("Você tem certeza que deseja salvar imagem?")) {
        image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    }
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
        drawing.x = undefined;
        drawing.y = undefined;
    }

    draw();
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
canvas.addEventListener("click", click);
canvas.addEventListener("mouseout", stop);

// debug

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse:(${mouse.x}, ${mouse.y}),
    Margem: (${marginX.toFixed(2)}, ${marginY.toFixed(2)}),
    Tela (${width.toFixed(2)}, ${height.toFixed(2)})`;
    document.querySelector("#debug span#pincel").innerText = 
        `Pincel (${(drawing.x == undefined)? "Fora de tela": (drawing.x).toFixed(2)},${(drawing.y == undefined)? "Fora de tela:": (drawing.y).toFixed(2)})`;
}, 100);