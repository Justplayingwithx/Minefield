var playerStill;
var movingPlayer_1, movingPlayer_2;
var player;



function preload(){
    playerStill = loadImage("../images/character_still.png");
    movingPlayer_1 = loadImage("../images/walking_1.png");
    movingPlayer_2 = loadImage("../images/walking_2.png");
}


function setup(){
    createCanvas(displayWidth-displayWidth/2-40,900)

    player = createSprite(width-width/2,height-height+70,20,20)

    
    
}

function draw(){
  background("white")

  drawSprites();

  
}