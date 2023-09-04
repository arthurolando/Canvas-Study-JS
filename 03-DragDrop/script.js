const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = [
    x = 0,
    y = 0,
];

let varX, varY = 0;

class Rectangle {
    constructor (xpos, ypos, w, h) {
        this.x = xpos;
        this.y = ypos;
        this.width = w;
        this.height = h;
        this.state = false;
    }
    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.fillStyle = "orange";
        context.moveTo(this.x, this.y);
        context.lineTo(this.width + this.x, this.y);
        context.lineTo(this.width + this.x, square.y + square.height);
        context.lineTo(this.x, square.y + square.height);
        context.lineTo(this.x, this.y);
        context.fill();

        context.closePath();
    }
    update() {
        ctx.clearRect(0, 0, width, height);
        this.w += this.x;
        this.h += this.y;
        this.draw(ctx);
    }
}

let square = new Rectangle(100, 200, 200, 200);

function init() {
    resizeReset();
    Draw();
}

function Draw() {
    ctx.clearRect(0, 0, width, height);
    square.draw(ctx);
}

function resizeReset() {   
    width = canvas.width = window.innerWidth;   
    height = canvas.height = window.innerHeight;

    Draw();
}

function insideRange(point, min, max) {
    return ((point > min) && (point < max))? true : false;
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    if(square.state) {
        square.x = mouse.x + varX;
        square.y = mouse.y + varY;
        square.update();
        canvas.style.cursor = "pointer";    
    }
    else {
        canvas.style.cursor = "default";
    }
}

function mouseclick() {
    if (insideRange(mouse.x, square.x, square.x + square.width) &&
        insideRange(mouse.y, square.y, square.y + square.height)) {
        square.state = !square.state;
        varX = square.x - mouse.x;
        varY = square.y - mouse.y;
    }
    else {
        square.state = false;
    }
    console.log(square.state);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset)
window.addEventListener("mousemove", mousemove);
window.addEventListener("click", mouseclick)

// DEBUG

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse (${mouse.x},${mouse.y})`;
    document.querySelector("#debug span#square").innerText = `Square (${square.x},${square.y}), Drag: ${square.state}`;

}, 100);
