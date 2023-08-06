const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = [
    x = 0,
    y = 0,
    click = false
];

class Circle {
    constructor (xpos, ypos, radius) {
        this.x = xpos;
        this.y = ypos;
        this.rad = radius;
        this.hover = false;
        this.fill = false;
    }
    draw(context) {
        context.beginPath();
        
        context.lineWidth = 3;
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.rad, Math.PI * 2, false);
        context.stroke();
        if (this.fill) {
            context.fill();
        }

        context.closePath()
    }
    update() {
        var distance = getDistance(mouse.x, mouse.y, this.x, this.y);
        if (distance < this.rad){
            this.distance = 0;
            this.hover = true;
            this.color = "#0f0"
            if (mouse.click) {
                this.fill = !this.fill;
            }
        }
        else {
            this.distance = (distance - this.rad).toFixed(2);
            this.hover = false;
            if (this.fill) {
                this.color = "#fff";
            }
            else {
                this.color = "#000"
            }
        }
        this.draw(ctx);

    }
}

class Rectangle {
    constructor (xpos, ypos, width, height) {
        this.x = xpos;
        this.y = ypos;
        this.width = this.x + width;
        this.height = this.y + height;
        this.hover = false;
        this.fill = false;
    }
    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.lineWidth = 3;
        context.moveTo(this.x, this.y);
        context.lineTo(this.width, this.y);
        context.lineTo(this.width, this.height);
        context.lineTo(this.x, this.height);
        context.lineTo(this.x, this.y);
        context.stroke();
        if (this.fill) {
            context.fill();
        }
        else {}

        context.closePath();
    }
    update() {
        if(mouse.x < this.x) {
            if(mouse.y < this.y) {
                this.distance = getDistance(mouse.x, mouse.y, this.x, this.y).toFixed(2);
            }
            else if(mouse.y < this.height) {
                this.distance = getDistance(mouse.x, 0, this.x, 0).toFixed(2);
            }
            else {
                this.distance = getDistance(mouse.x, mouse.y, this.x, this.height).toFixed(2);
            }
        }
        else if (mouse.x < this.width) {
            if (mouse.y < this.y) {
                this.distance = getDistance(0, mouse.y, 0, this.y).toFixed(2);
            }
            else if (mouse.y < this.height) {
                this.distance = 0;
            }
            else {
                this.distance = getDistance(0, mouse.y, 0, this.height).toFixed(2);
            }
        }
        else {
            if(mouse.y < this.y) {
                this.distance = getDistance(mouse.x, mouse.y, this.width, this.y).toFixed(2);
            }
            else if(mouse.y < this.height) {
                this.distance = getDistance(mouse.x, 0, this.width, 0).toFixed(2);
            }
            else {
                this.distance = getDistance(mouse.x, mouse.y, this.width, this.height).toFixed(2);
            }
        }

        if (this.distance > 0) {
            if (this.fill) {
                this.color = "#fff";
            }
            else {
                this.color = "#000";
            }
            this.hover = false;
        }
        else {
            this.color = "#0f0"
            this.hover = true;
            if (mouse.click) {
                this.fill = !this.fill;
            }
        }
        this.draw(ctx);
    }
}

let circle = new Circle(300, 300, 100);
let square = new Rectangle(200, 600, 200, 200);

function Draw() {
    ctx.clearRect(0, 0, width, height);

    circle.draw(ctx);
    square.draw(ctx);
}

function resizeReset() {   
    width = canvas.width = window.innerWidth;   
    height = canvas.height = window.innerHeight;
      
    Draw();
}

function getDistance(Ax, Ay, Bx, By) {
    var result = Math.sqrt(
        (Bx - Ax) * (Bx - Ax) + 
        (By - Ay) * (By - Ay)
    )
    return result;
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    ctx.clearRect(0, 0, width, height);
    circle.update();
    square.update();
}

function mouseclick() {
    mouse.click = true;
    ctx.clearRect(0, 0, width, height);
    circle.update();
    square.update();
    mouse.click = false;
}

function mouseout(e) {
    mouse.x = 0;
    mouse.y = 0;
}

window.addEventListener("DOMContentLoaded", Draw);
window.addEventListener("resize", resizeReset)
window.addEventListener("mousemove", mousemove);
window.addEventListener("click", mouseclick)
window.addEventListener("mouseout", mouseout);

// DEBUG

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse (${mouse.x},${mouse.y})`;
    document.querySelector("#debug span#circle").innerText = `Circle (${circle.x},${circle.y}), State: (${circle.fill ? "ON" : "OFF"}), Hover: (${circle.hover}), Mouse Distance: ${circle.distance}`;
    document.querySelector("#debug span#square").innerText = `Square (${square.x},${square.y}), State: (${square.fill ? "ON" : "OFF"}), Hover: (${square.hover}), Mouse Distance: ${square.distance}`;

}, 100);
