import  {Rect} from "./JudeUtils.js";
import { Text } from "./font.js";
import { ParticleEngine } from "./particalEngine.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();

ctx.imageSmoothingEnabled = false;
let particalEngine = new ParticleEngine(ctx, {color: "white", size: 5, count: 30, duration: 50});

let timeRemaining = 60;
function initKeyboard() {
    window.addEventListener("keydown", (e) => {
        currentKey.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
        currentKey.set(e.key, false);
    })
}
let level = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

]
let walls = []
class Level {
    constructor(level) {
        this.level = level
        this.tileSet = new Image();
        this.tileSet.src = "./TileSet.png";
    }
    draw() {
        for (let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 1) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'source-atop'; 
                    ctx.fillStyle = 'rgba(0,225,255,0.5)';
                    ctx.fillRect(j*50, i*50, 50, 50);
                    ctx.drawImage(this.tileSet, 8*4, 8*1, 8, 8, j*50, i*50, 50, 50);
                    ctx.restore();
                }
                if (this.level[i][j] == 2) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'source-atop'; 
                    ctx.fillStyle = 'rgba(0,225,255,0.5)';
                    ctx.fillRect(j*50, i*50, 50, 50);
                    walls.push(new Rect(j*50, i*50, 50, 50));
                    ctx.drawImage(this.tileSet, 8*4, 8*1, 8, 8, j*50, i*50, 50, 50);
                    ctx.restore();
                }
            }
        }   
    }
}
let level1 = new Level(level); 
class DropOFFStation {
    constructor(d) {
        this.station = d
        this.bounds = new Rect(900, 900, 100, 100);
        this.images = {
            1: new Image(),
            2: new Image(),
            3: new Image(),
            4: new Image(),
            5: new Image()
        };
        this.images[1].src = "./RedVote.png";
        this.images[2].src = "./BlueVote.png";
        this.images[3].src = "./GreenVote.png";
        this.images[4].src = "./YellowVote.png";
        this.images[5].src = "./PurpleVote.png";
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        if (this.station == 1) {
            this.bounds.x = 100
        }
        else if (this.station == 2) {
            this.bounds.x = 500
        }
        else if (this.station == 3) {
            this.bounds.x = 900
        }
        else if (this.station == 4) {
            this.bounds.x = 1300
        }
        else if (this.station == 5) {
            this.bounds.x = 1700
        }
        ctx.drawImage(this.images[this.station], this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
    update() {
            if (playerActive.bounds.intersects(this.bounds) || this.bounds.intersects(playerActive.bounds)) {
                if (playerActive.holding.vote == this.station) {
                    playerActive.holding = 0
                    for (let i = 0; i < npcs.length; i++) {
                        npcs[i].line -= 1
                    }
                    console.log("Dropped off")
                }
            }
    }
}
class NPC {
    constructor(l) {
        this.line = l
        this.bounds = new Rect(canvas.width/2, 400-(l*100), 60, 60);
        this.vote = Math.floor(Math.random() * 5 + 1);
        this.image = new Image();
        this.images = {
            1: new Image(),
            2: new Image(),
            3: new Image(),
            4: new Image(),
            5: new Image()
        };
        this.images[1].src = "./ScrollRed.png";
        this.images[2].src = "./ScrollBlue.png";
        this.images[3].src = "./ScrollGreen.png";
        this.images[4].src = "./ScrollYellow.png";
        this.images[5].src = "./ScrollPurple.png";
    }
    draw() {
        this.bounds.y = 400-(this.line*100);
        ctx.drawImage(this.images[this.vote], this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
let switched = 0;
class Player {
    constructor(x,y) {
        this.bounds = new Rect(x, y, 50, 50);
        this.XVell = 0;
        this.YVell = 0;
        this.holding = 0
        this.OfsetX = 0
        this.OfsetY = -4
        this.scroll = new Image();
        
    } 
    draw() {
        ctx.fillStyle = "gold";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        if (this.holding != null) {
            if (this.holding.vote == 1) {
                this.scroll.src = "./ScrollRed.png";
            }
            else if (this.holding.vote == 2) {
                this.scroll.src = "./ScrollBlue.png";
            }
            else if (this.holding.vote == 3) {
                this.scroll.src = "./ScrollGreen.png";
            }
            else if (this.holding.vote == 4) {
                this.scroll.src = "./ScrollYellow.png";
            }
            else if (this.holding.vote == 5) {
                this.scroll.src = "./ScrollPurple.png";
            }
            if (this.holding.vote > 0) {
                    ctx.drawImage(this.scroll, this.bounds.x + (this.OfsetX*15), this.bounds.y + (this.OfsetY*15), this.bounds.w, this.bounds.h);
            }

        }
    }
    update() {
        this.bounds.x += this.XVell;
        this.bounds.y += this.YVell;
        if (switched > 0) {
            switched -= 0.1;
        }
        if (playerActive == this) {
            if (currentKey.get(" ")) {
                if (switched <= 0) {
                    if (playerActive == player) {
                        playerActive = player2;
                        console.log(playerActive)
                        switched = 10
                    } else {
                        playerActive = player;
                        switched = 10

                    }
                }
            }
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
                        this.holding = npcs[i];
                        npcs.splice(i, 1);
                        if (this.holding.vote == 1) {
                            particalEngine.spawnParticles(this.bounds.x, this.bounds.y,255,0,0);
                        } else if (this.holding.vote == 2) {
                            particalEngine.spawnParticles(this.bounds.x, this.bounds.y,0,0,255);
                        }else if (this.holding.vote == 3) {
                            particalEngine.spawnParticles(this.bounds.x, this.bounds.y,0,255,0);
                        }
                        else if (this.holding.vote == 4) {
                            particalEngine.spawnParticles(this.bounds.x, this.bounds.y,255,255,0);
                        }
                        else if (this.holding.vote == 5) {
                            particalEngine.spawnParticles(this.bounds.x, this.bounds.y,255,0,255);
                        }
                    }
                }
            }
        } else {
            this.XVell = 0;
            this.YVell = 0;
        }
        for (let i = 0; i < walls.length; i++) {
            if (this.bounds.intersects(walls[i]) || walls[i].intersects(this.bounds)) {
                if (this.YVell > 0) {
                    this.bounds.y = walls[i].y - this.bounds.h - 5;
                } else if (this.YVell < 0) {
                    this.bounds.y = walls[i].y + walls[i].h + 5;
                }   
            }
        }
    }
}

let npcs = [];
let player = new Player(100,800);
let player2 = new Player(500,300);
let playerActive = player2;

let redStation = new DropOFFStation(1);
let blueStation = new DropOFFStation(2);
let greenStation = new DropOFFStation(3);
let yellowStation = new DropOFFStation(4);
let purpleStation = new DropOFFStation(5);
let stations = [redStation, blueStation, greenStation, yellowStation, purpleStation];

for (let i = 0; i < 10; i++) {
    npcs.push(new NPC(i));
}
let timeText = new Text(""  + Math.floor(timeRemaining), canvas.width-250, canvas.height-250, 75, 500, false);
let gameOver = new Text("Game Over", canvas.width/2-350, canvas.height/2, 75, 10, false);
function loop() {
    ctx.save();
    timeRemaining -= 1/60;
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    timeText.text = "" + Math.floor(timeRemaining);
    timeText.startTyping();
    timeText.draw(ctx);
    particalEngine.draw();
    player.draw();
    player2.draw();
    level1.draw();
    for (let i = 0; i < stations.length; i++) {
        stations[i].draw();
        stations[i].update();
    }
    particalEngine.update(1);
    player2.update();
    for (let i = 0; i < npcs.length; i++) {
        npcs[i].draw();
    }
    ctx.restore();
    requestAnimationFrame(loop) ;
}
function init() {
    initKeyboard();
    loop();
}

init();