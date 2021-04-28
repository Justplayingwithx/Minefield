var playerStill;
var movingPlayer_1, movingPlayer_2;
var player;
var playerAnimation;
var normalPlace;
var normalPlaceCounter, normalPlaceTimeOut;



function preload(){
    playerStill = loadImage("../images/character_still.png");
    movingPlayer_1 = loadImage("../images/walking_1.png");
    movingPlayer_2 = loadImage("../images/walking_2.png");
}


function setup(){
    createCanvas(displayWidth-displayWidth/2-20-40,900)

    player = createSprite(width-width/2,height-height+70,20,20)

    player.addAnimation("main",movingPlayer_1,movingPlayer_2);


    player.scale = 0.7

    
    
}

function draw(){
  background("white")


  keyDownCheck();

  drawSprites();

  

  

  
}

function keyDownCheck(){
 if(keyDown(RIGHT_ARROW)){
   player.x +=5
 }
 if(keyDown(LEFT_ARROW)){
   player.x-=5
 }
}