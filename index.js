import  {Rect} from "./JudeUtils.js";
import { Text } from "./font.js";
import { ParticleEngine } from "./particalEngine.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
let totalVotes = 0;
ctx.imageSmoothingEnabled = false;
let particalEngine = new ParticleEngine(ctx, {color: "white", size: 5, count: 30, duration: 50});

let timeRemaining = 10;
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
                    ctx.fillStyle = 'rgba(0,225,255,0.5)';
                    ctx.fillRect(j*50, i*50, 50, 50);
                    ctx.drawImage(this.tileSet, 8*4, 8*1, 8, 8, j*50, i*50, 50, 50);
                    ctx.restore();
                }
                if (this.level[i][j] == 2) {
                    ctx.save();
                    ctx.fillStyle = 'rgba(0,225,255,0.5)';
                    ctx.fillRect(j*50, i*50, 50, 50);
                    // walls.push(new Rect(j*50, i*50, 50, 50));
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
                if (playerActive.holding != null) {
                    if (playerActive.holding.vote == this.station) {
                        playerActive.holding = null
                        for (let i = 0; i < npcs.length; i++) {
                            npcs[i].line -= 1
                            console.log("Dropped off",npcs)
                        }
                        for (let i = 0; i < npcs.length; i++) {
                            npcs.shift();
                            totalVotes += 1;
                            return;
                        }
                        console.log("Dropped off")
                    }
                }
            }
    }
}
class NPC {
    constructor(l) {
        this.line = l
        this.bounds = new Rect(canvas.width/2, 400-(l*100), 100, 100);
        this.voteNUM = Math.floor(Math.random() * 5 + 1);
        this.vote = new Vote(this.voteNUM, this.bounds.x+70, this.bounds.y+100,l)
        this.holding = this.vote;
        this.image = new Image();
        this.image.src = "./SpriteSheet.png"
    }
    draw() {
        this.bounds = new Rect(canvas.width/2, 400-(this.line*100), 100, 100);
        this.vote.line = this.line
        ctx.drawImage(this.image, 96*this.voteNUM, 32*(6), 32, 32, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        if (this.holding) {
            this.holding.inLINE();
            this.holding.draw();
        }
    }
}
class Vote {
    constructor(v,x,y,l) {
        this.vote = v;
        this.bounds = new Rect(x,y, 50, 50);
        this.image = new Image();
        this.line = l
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
    inLINE() {
        this.bounds.y = 450-(this.line*100);
    }
    draw() {
        ctx.drawImage(this.images[this.vote], this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
let switched = 0;
class Player {
    constructor(x,y) {
        this.bounds = new Rect(x, y, 50, 50);
        this.XVell = 0;
        this.YVell = 0;
        this.holding = null
        this.OfsetX = 0
        this.OfsetY = -4
        this.scroll = new Image();
        
    } 
    draw() {
        ctx.fillStyle = "gold";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
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
                    if (this.holding == null) {
                        this.holding = npcs[i].vote;
                        npcs[i].holding = null
                    }
                }
            }
        } else {
            this.XVell = 0;
            this.YVell = 0;
        }
        if (this.holding) {
            this.holding.bounds.x = this.bounds.x + (this.OfsetX*15);
            this.holding.bounds.y = this.bounds.y + (this.OfsetY*15);
            this.holding.draw();
        }
        // for (let i = 0; i < walls.length; i++) {
        //     if (this.bounds.intersects(walls[i]) || walls[i].intersects(this.bounds)) {
        //         if (this.YVell > 0) {
        //             this.bounds.y = walls[i].y - this.bounds.h - 5;
        //         } else if (this.YVell < 0) {
        //             this.bounds.y = walls[i].y + walls[i].h + 5;
        //         }   
        //     }
        // }
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
let currentScreen = 1;
for (let i = 0; i < 10; i++) {
    npcs.push(new NPC(i));
}
let timeText = new Text(""  + Math.floor(timeRemaining), canvas.width-250, canvas.height-250, 75, 500, false);
let gameOver = new Text("Game Over", canvas.width/2-350, canvas.height/2, 75, 10, false);
let votes = new Text("Votes" + totalVotes, 100, 100, 75, 500, true);
function loop() {
    if (currentScreen == 1) {
        ctx.save();
        timeRemaining -= 1/60;
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        timeText.text = "" + Math.floor(timeRemaining);
        timeText.startTyping();
        timeText.draw(ctx);
        particalEngine.draw();
        level1.draw();
        // player.draw();
        player2.draw();
        for (let i = 0; i < stations.length; i++) {
            stations[i].draw();
            stations[i].update();
        }
        particalEngine.update(1);
        player2.update();
        // player.update();
        for (let i = 0; i < npcs.length; i++) {
            npcs[i].draw();
        }
        if (timeRemaining <= 0) {
            currentScreen = 2
        }
        ctx.restore();
    }
    if (currentScreen == 2) {
        votes.text = "Votes: " + totalVotes;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        votes.startTyping();
        votes.draw(ctx);
        gameOver.startTyping();
        gameOver.draw(ctx);
    }
    requestAnimationFrame(loop) ;
}
function init() {
    initKeyboard();
    loop();
}

init();