let tilemap = [];
let numDown = 10;
let textures = [];
let numAcross = 10;
let textureNum;
let tileSize = 50;
let graphicsMap = [
    
    //	 0  1  2  3  4  5  6  7  8  9 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], // 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4  
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 0], // 5
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // 6
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 7
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]  // 9 
    ]
let emptyArray = [];

function preload() {
    textures[0] = loadImage('plane1.png');
    textures[1] = loadImage('enemy.png');
    textures[2] = loadImage('');
    textures[3] = loadImage('');
    textures[4] = loadImage('');
}

function setup() {
    createCanvas(500, 500);

    let tileID = 0;
    for (let across = 0; across < numAcross; across++) {
        tilemap[across] = [];
        for (let down = 0; down < numDown; down++) {
            let x = across * tileSize;
            let y = down * tileSize;
            let textureNum;
            textureNum = graphicsMap [down][across]
            tilemap[across][down] = new Tile(x, y, tileSize, tileID, textures[textureNum]);

            tileID++;
        }
    }
    console.log (tilemap[6][2])
}

function draw() {
    background(0);
    
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            tilemap[across][down].show();
            tilemap[across][down].debug();
        }
    }
}

class Tile {
    constructor(x, y, tileSize, tileID, texture) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.tileID = tileID;
        this.texture = texture;
    }
    debug() {
        //TILE
        stroke(245);
        noFill();
        rect(this.x, this.y, this.tileSize, this.tileSize);

        //LABEL
        noStroke();
        fill(255);
        textAlign(LEFT, TOP);

        let twoDigitID;
        if (this.tileID < 10) { 
            twoDigitID = "0" + this.tileID; 
        } else {
            twoDigitID = this.tileID; 
        }
        
        text(twoDigitID, this.x, this.y);
    }
    
    show(){
        noStroke();
        image(this.texture, this.x, this.y, this.tileSize, this.tileSize)
    }
}

class Player {
    constructor(sprite, startAcross, startDown, size, xSpeed, ySpeed, jumpHeight, tileSize, tileRules) {
        this.sprite = sprite;

        this.across = startAcross;
        this.down = startDown;
        
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        this.tileRules = tileRules;
        this.tileSize = tileSize;

        this.dirX = 0;
        this.dirY = 0;

        this.isJumping = false;
        this.isFalling = false;
        this.isGrounded = true;

        this.jumpHeight = jumpHeight;

        this.jumpTarget;

        this.playerLeft;
        this.playerRight;
        this.playerTop;
        this.playerBottom;

        this.topLeft = {};
        this.topRight = {};
        this.bottomLeft = {};
        this.bottomRight = {};
        
        this.collisionXPadding = 10;
        this.collisionYPadding = 5;
    }
}