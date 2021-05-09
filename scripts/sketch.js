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
var obstacleGroup;
var mine;
var mine1Image, mine2Image;
var randomNumber;
var coinRandomNumber;
var coinImage;
var coinSprite;
var coinGroup;
var bufferScore;


var state;
var otherBufferThing = false;





function preload(){
    playerStill = loadImage("../images/character_still.png");
    movingPlayer_1 = loadImage("../images/walking_1.png");
    movingPlayer_2 = loadImage("../images/walking_2.png");
    bushImage = loadImage("../images/bush.jpg")
    mineFieldAheadImage = loadImage("../images/starterTextMinefield.png");
    mineFieldAheadImage2 = loadImage("../images/starterTextMinefield.png");
    mine1Image = loadImage("../images/mine1.png");
    mine2Image = loadImage("../images/mine2.png");
    coinImage = loadImage("../images/coin.png");
}


function setup(){

  state = "play";

startBuffer = false;

 score = 0;

 bufferScore = 0;



 obstacleGroup = new Group();

 coinGroup = new Group();





 dangerSpriteGroup = new Group();

  myEngine = Engine.create();

  myWorld = myEngine.world;




  
    createCanvas(displayWidth-displayWidth/2-20-40,900)




    console.log(height)
if(otherBufferThing === false){
  player = createSprite(width-width/2,height-height+70,20,20)

  player.addAnimation("main",movingPlayer_1,movingPlayer_2);


  player.scale = 0.7
}
    

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

  
 
if(state === "play"){
  if(score<1){
    bufferScore++;
  }
  if(bufferScore>500){
    score++;
  }
  

  player.collide(wall1)
  player.collide(wall2)
 
  if(startBuffer = true&&frameCount%50===0&&dangerSprite2.y<2){
    randomNumber = Math.round(random(1,2))
    coinRandomNumber = Math.round(random(1,4))
    switch(randomNumber){
      case 1: 
       mine = createSprite(Math.round(random(100,width-100)),height,20,20);
       mine.velocityY = -3;
       obstacleGroup.add(mine)
       mine.addImage(mine1Image);
       mine.setCollider('rectangle',0,0,mine.width-10,mine.height)
       mine.debug = true;
       mine.lifetime = 900/3

       switch(coinRandomNumber){
         case 1:
           break;
          case 2:
            coinSprite = createSprite(mine.x-100,mine.y,20,20)
            coinSprite.addImage(coinImage);
            coinSprite.velocityY = -3;
            coinGroup.add(coinSprite);
            break;
          case 3:
            break;
          case 4:
            break;
          default:
            break;
       }


       break;

      case 2: 
       mine = createSprite(Math.round(random(100,width-100)),height,20,20);
       mine.velocityY = -3;
       obstacleGroup.add(mine);
       mine.addImage(mine2Image);
       mine.setCollider('rectangle',0,0,mine.width-10,mine.height)
       mine.debug = true;
       mine.lifetime = 900/3

       switch(coinRandomNumber){
        case 1:
          break;
         case 2:
           coinSprite = createSprite(mine.x+100,mine.y,20,20)
           coinSprite.addImage(coinImage);
           coinSprite.velocityY = -3;
           coinGroup.add(coinSprite);
           break;
         case 3:
           break;
         case 4:
           break;
         default:
           break;
      }


    }
  }
 
  if(player.isTouching(obstacleGroup)){
    console.log("touch")
    state = "end";
    player.visible = false;
    obstacleGroup.destroyEach();
    
  }
 
 
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
 


  
 }else if(state === "end"){
   textSize(20)
  text("Game Over! Your final score was: "+score+". Press space to try again.",width/2-300,height/2)
  coinGroup.destroyEach();
  if(keyDown("space")){
    state = "play";
    player.visible = true;
    score = 0;
   otherBufferThing = true;
   
   player.x = width-width/2;
    setup();
  }
 
}


  keyDownCheck();
  drawSprites();
  if(state === "play"){
    stroke("blue")
    textSize(20)
    text("Score: "+score,width-200,30)
  }


   

 



  
  

  

  
}

function keyDownCheck(){
 if(keyDown(RIGHT_ARROW)){
   player.x +=5
 }
 if(keyDown(LEFT_ARROW)){
   player.x-=5
 }
}


