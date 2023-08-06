const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

class Circle {
    constructor(xpos, ypos, radius, color, text, speed){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;

        this.hitCount = 0
    }
    draw(context){
        context.beginPath();
        
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.fillStyle = this.color;
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.xpos, this.ypos);
        context.font = "12px Arial";
        context.fillText(this.hitCount, this.xpos, this.ypos + 15);

        context.lineWidth = 5;
        context.arc(this.xpos, this.ypos, this.radius, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }
    update(){
        this.draw(ctx);

        if((this.xpos + this.radius) > width) {
            this.dx = -this.dx;
            this.hitCount++;
        }
        if((this.ypos + this.radius) > height) {
            this.dy = -this.dy;
            this.hitCount++;
        }
        if((this.xpos - this.radius) < 0) {
            this.dx = -this.dx;
            this.hitCount++;
        }
        if((this.ypos - this.radius) < 0) {
            this.dy = -this.dy;
            this.hitCount++;
        }
        this.xpos += this.dx;
        this.ypos += this.dy;
    }
}

let getDistance = function(xpos1, ypos1, xpos2, ypos2){
    var result = Math.sqrt((Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)));

    return result;
}

let circleA = new Circle(100, 100, 50, "black", "Circulo A", 2);
let circleB = new Circle(200, 200, 75, "black", "Circulo B", 0);

let hit = true;

let updateCircle = function() {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, width, height);

    circleB.update();
    circleA.update();

    if (getDistance(circleA.xpos, circleA.ypos, circleB.xpos, circleB.ypos) < (circleA.radius + circleB.radius) ){
        circleB.color = "#f00";
        circleA.color = "#f00";
        if (hit){ 
            hit = false; 
            circleB.hitCount++; 
        }
    }

    else {
        circleB.color = "black";
        circleA.color = "black";
        hit = true;
    }    

}

function resizeReset() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

circleA.draw(ctx);
circleB.draw(ctx);
updateCircle();

window.addEventListener("resize", resizeReset);

setInterval (() => {
    document.querySelector("#debug span#circleA").innerText = "Circulo A: (" + circleA.xpos + "," + circleA.ypos + ")" + " Hits: " + circleA.hitCount;
    document.querySelector("#debug span#circleB").innerText = "Circulo B: (" + circleB.xpos + "," + circleB.ypos + ")" + " Collisions: " + circleB.hitCount;
});