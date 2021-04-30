const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;

var myEngine;
var myWorld;

var playerStill;
var movingPlayer_1, movingPlayer_2;
var player;
var playerAnimation;
var normalPlace;
var normalPlaceCounter, normalPlaceTimeOut;
var bushImage;
var bushObj;
var score;
var wall1,wall2;
var mineFieldAheadImage;
var mineFieldAheadImage2;
var dangerSprite;
var dangerSprite2;
var dangerSpriteGroup;
var startBuffer;





function preload(){
    playerStill = loadImage("../images/character_still.png");
    movingPlayer_1 = loadImage("../images/walking_1.png");
    movingPlayer_2 = loadImage("../images/walking_2.png");
    bushImage = loadImage("../images/bush.jpg")
    mineFieldAheadImage = loadImage("../images/starterTextMinefield.png");
    mineFieldAheadImage2 = loadImage("../images/starterTextMinefield.png");
}


function setup(){

startBuffer = false;

 score = 0;





 dangerSpriteGroup = new Group();

  myEngine = Engine.create();

  myWorld = myEngine.world;




  
    createCanvas(displayWidth-displayWidth/2-20-40,900)

    player = createSprite(width-width/2,height-height+70,20,20)

    player.addAnimation("main",movingPlayer_1,movingPlayer_2);


    player.scale = 0.7

    for(var i = 20; i<height; i=i+100){
      console.log("hi")
      bushObj = createSprite(30,i,20,20)
      bushObj.velocityY = -3;
      bushObj.addImage(bushImage)
      bushObj.scale = 0.07

      console.log("hi")
      bushObj = createSprite(width-30,i,20,20)
      bushObj.velocityY = -3;
      bushObj.addImage(bushImage)
      bushObj.scale = 0.07
    }

      wall1 = createSprite(80,10,2,height)

      wall1.visible = false;

      wall2 = createSprite(width-80,10,2,height)

      wall2.visible = false;

     dangerSprite = createSprite(20,height/2,20,20);
     dangerSprite.addImage(mineFieldAheadImage);
     dangerSprite.visible = false;

     dangerSprite.depth = player.depth - 1;

     dangerSpriteGroup.add(dangerSprite);

     dangerSprite2 = createSprite(width-20,height/2,20,20);
     dangerSprite2.addImage(mineFieldAheadImage2);
     dangerSprite2.visible = false;

     dangerSprite2.depth = player.depth -1;

     dangerSpriteGroup.add(dangerSprite2);
    

    

    
    
}

function draw(){
  Engine.update(myEngine)
  background("white")

  score++;

 player.collide(wall1)
 player.collide(wall2)


 if(bushObj.y <= 1){
  console.log("danger sign reached")

  

  dangerSprite.visible = true;
  dangerSprite.velocityY = -3;
  dangerSprite2.visible = true;
  dangerSprite2.velocityY = -3;
  if(dangerSprite.y===0||dangerSprite2.y===0){
    dangerSpriteGroup.destroyEach();
    startBuffer = true;
  }


  
 }


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