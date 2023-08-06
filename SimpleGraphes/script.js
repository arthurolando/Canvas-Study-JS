const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
};

let Data = [
    200,
    300,
    102,
    350,
    50,
    120,
    504,
    60,
    102,
    102,
    10
];

function init() {
    DrawLine();
    DrawBalls();
    DrawGraphe();
}

function resizeReset() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;  
    init();
}

function DrawGraphe() {
    for (i = 1; i <= 100; i++) {
        ctx.beginPath();
        if (i % 5 == 0) {
            ctx.strokeStyle = "#000000e5";
        }
        else {
            ctx.strokeStyle = "#00000050";
        }
        ctx.moveTo(width / 50 * i, 0);
        ctx.lineTo(width / 50 * i, height);
        ctx.stroke();
        ctx.closePath();
    }
    for (i = 1; i <= 100; i++) {
        ctx.beginPath();
        if (i % 5 == 0) {
            ctx.strokeStyle = "#000000e5";
        }
        else {
            ctx.strokeStyle = "#00000050";
        }
        ctx.moveTo(0, height/50 * i);
        
        ctx.lineTo(width, height/50 * i);
        ctx.stroke();
        ctx.closePath();
    }      
    
    for (i = 1; i <= 100; i++) {
        ctx.beginPath();
        if (i % 10 == 0) {
            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.fillText((height/2 - height/100 * i).toFixed(2), 0, height/100* i);
        }
    }

    for(i = 1; i <= Data.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        if (i < 10) {
            ctx.fillText(i, width/Data.length * i - 5, height/2);
        }
        else {
            ctx.fillText(i, width/Data.length * i - 10, height/2);
        }
        ctx.closePath();
    }
}


function DrawLine() {
    ctx.beginPath();

    ctx.moveTo(0, height/2);
    
    Data.forEach((element, index) => {
        ctx.lineTo(findX(index, width), findY(element, height));
    });
    
    ctx.stroke();
    ctx.strokeStyle = "#e1e1e1";
    ctx.lineTo(width, height/2);
    ctx.lineTo(0, height/2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    
    ctx.closePath();
}

function DrawBalls() {
    Data.forEach((element, index) => {
        ctx.beginPath();
        ctx.arc(findX(index), findY(element), 3, Math.PI * 2, false);    
        ctx.fillStyle = "#f66";
        ctx.strokeWidth = 3;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    });
}

function findX(index) {
    result = width / Data.length * (index + 1);
    return result;
}

function findY(value) {
    result = height/2 - value;
    return result;
}

function getDistance(Ax, Ay, Bx, By) {
    var result = Math.sqrt(((Bx - Ax)*(Bx - Ax)) + ((By - Ay)*(By - Ay)))
    return result;
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset)
window.addEventListener("mousemove", mousemove);

setInterval(() => {
    document.querySelector("#debug span#mouse").innerText = `Mouse: (${(mouse.x / width * Data.length).toFixed(2)}, ${height/2 - mouse.y})`;
}, 100);