import  {Rect} from "./JudeUtils.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
function initKeyboard() {
    window.addEventListener("keydown", (e) => {
        currentKey.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
        currentKey.set(e.key, false);
    })
}
class DropOFFStation {
    constructor(d) {
        this.station = d
        this.bounds = new Rect(900, 1000, 100, 25);
    }
    draw() {
        if (this.station == 1) {
            this.bounds.x = 100
            ctx.fillStyle = "red";
        }
        else if (this.station == 2) {
            this.bounds.x = 500
            ctx.fillStyle = "blue";
        }
        else if (this.station == 3) {
            this.bounds.x = 900
            ctx.fillStyle = "green";
        }
        else if (this.station == 4) {
            this.bounds.x = 1300
            ctx.fillStyle = "yellow";
        }
        else if (this.station == 5) {
            this.bounds.x = 1700
            ctx.fillStyle = "purple";
        }
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
    update() {
            if (player.bounds.intersects(this.bounds) || this.bounds.intersects(player.bounds)) {
                if (player.holding.vote == this.station) {
                    player.holding = 0
                    console.log("Dropped off")
                }
            }
    }
}
class NPC {
    constructor(l) {
        this.line = l
        this.bounds = new Rect(canvas.width/2, 300-(l*50), 25, 25);
        this.vote = Math.floor(Math.random() * 5 + 1);
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.vote,this.bounds.x,this.bounds.y);
        if (this.vote == 1) {
            ctx.fillStyle = "red";
        }
        else if (this.vote == 2) {
            ctx.fillStyle = "blue";
        }
        else if (this.vote == 3) {
            ctx.fillStyle = "green";
        }
        else if (this.vote == 4) {
            ctx.fillStyle = "yellow";
        }
        else if (this.vote == 5) {
            ctx.fillStyle = "purple";
        }
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
class Player {
    constructor() {
        this.bounds = new Rect(900, 700, 25, 25);
        this.XVell = 0;
        this.YVell = 0;
        this.holding = 0
        this.OfsetX = 0
        this.OfsetY = -4

    } 

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        if (this.holding != null) {
            if (this.holding.vote == 1) {
                ctx.fillStyle = "red";
            }
            else if (this.holding.vote == 2) {
                ctx.fillStyle = "blue";
            }
            else if (this.holding.vote == 3) {
                ctx.fillStyle = "green";
            }
            else if (this.holding.vote == 4) {
                ctx.fillStyle = "yellow";
            }
            else if (this.holding.vote == 5) {
                ctx.fillStyle = "purple";
            }
            if (this.holding.vote > 0) {
                ctx.fillRect(this.bounds.x + (this.OfsetX*15), this.bounds.y + (this.OfsetY*15), this.bounds.w, this.bounds.h);
            }


        }
    }
    update() {
        this.bounds.x += this.XVell;
        this.bounds.y += this.YVell;
        if (currentKey.get("ArrowUp") || currentKey.get("w")) {
            this.YVell = -4
            this.OfsetX = 0
            this.OfsetY = -4

        } else if (currentKey.get("ArrowDown") || currentKey.get("s")) {
            this.YVell = 4
            this.OfsetX = 0
            this.OfsetY = 4

        } else {
            this.YVell = 0
        }
        if (currentKey.get("ArrowLeft") || currentKey.get("a")) {
            this.XVell = -4
            this.OfsetY = 0
            this.OfsetX = -4

        } else if (currentKey.get("ArrowRight") || currentKey.get("d")) {
            this.XVell = 4
            this.OfsetY = 0;
            this.OfsetX = 4
        } else {
            this.XVell = 0
        }
        for (let i = 0; i < npcs.length; i++) {
            if (this.bounds.intersects(npcs[i].bounds) || npcs[i].bounds.intersects(this.bounds)) {
                if (this.holding == 0) {
                    console.log("Holding",npcs[i].vote)
                    this.holding = npcs[i];
                    npcs.splice(i, 1);
                }
            }
        }
    }
}


let npcs = [];
let player = new Player();
let redStation = new DropOFFStation(1);
let blueStation = new DropOFFStation(2);
let greenStation = new DropOFFStation(3);
let yellowStation = new DropOFFStation(4);
let purpleStation = new DropOFFStation(5);
let stations = [redStation, blueStation, greenStation, yellowStation, purpleStation];

for (let i = 0; i < 10; i++) {
    npcs.push(new NPC(i));
}
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Running")
    player.draw();
    for (let i = 0; i < stations.length; i++) {
        stations[i].draw();
        stations[i].update();
    }
    player.update();
    for (let i = 0; i < npcs.length; i++) {
        npcs[i].draw();
    }
    requestAnimationFrame(loop) ;
}
function init() {
    initKeyboard();
    loop();
}

init();