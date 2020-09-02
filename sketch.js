var trex;
var trexAnim;
var ground;
var groundAnim;
var invGround;
var check;
var cloud;            
var cloudAnim;
var o1;
var o2
var o3;
var o4;
var o5;
var o6;
var obstacles;
var check;
var PLAY=1;
var END = 0;
var gameState=PLAY;
var cloudsGroup;
var obsctaclesGroup;
var trexCollided;
var score;
var jump;
var checkpoint;
var die;
var gameover;
var restart;
var gameoverAnim;
var restartAnim;
var m="this is a message"
function preload()
{
trexAnim = loadAnimation("trex1.png","trex3.png","trex4.png");  
groundAnim= loadImage("ground2.png");
cloudAnim=loadImage("cloud1.png");
trexCollided=loadAnimation("trex_collided.png");  
o1=loadImage("obstacle1.png");
o2=loadImage("obstacle2.png");
o3=loadImage("obstacle3.png");
o4=loadImage("obstacle4.png");
o5=loadImage("obstacle5.png");
o6=loadImage("obstacle6.png");
checkpoint=loadSound("checkPoint.mp3");  
jump=loadSound("jump.mp3");
die=loadSound("die.mp3");  
 gameoverAnim = loadImage("gameOver.png"); 
 restartAnim=loadImage("restart.png"); 
}

function setup()
{createCanvas(400,400);
trex = createSprite(50,300,20,20);
 ground = createSprite(200,333,400,20);
 ground.addImage(groundAnim)
 restart = createSprite(210,211,20,20)
 gameover = createSprite(209,170,20,20)
 gameover.addImage(gameoverAnim)
 gameover.scale=0.5;
 restart.addImage(restartAnim);
 restart.scale=0.5;
 trex.addAnimation("running",trexAnim);
 trex.addAnimation("collided",trexCollided);
 trex.scale = 0.5;
 edges = createEdgeSprites();
 invGround=createSprite(200,350,400,5);
 invGround.visible=false;
 check=Math.round(random(1,20));
 console.log(check)
 cloudsGroup= new Group();
 obstaclesGroup = new Group();
//trex.debug=true;
 trex.setCollider("circle",0,0,40)
 score=0;
 
     
}


function draw()
  {background("grey");
   textSize(20);
   fill("black");
   text("Score: "+score,305,46);
   if (gameState===PLAY) 
   {
     gameover.visible=false;
     restart.visible=false;
     if (frameCount%5===0)
     {
       score=score+1;

     }
     if (score>0&&score%100===0) 
     {
       checkpoint.play();
     }
     trex.velocityY=trex.velocityY+0.5
     ground.velocityX=-(3+score/70);
     if (keyDown("space")&&trex.y>300)    
 {
  trex.velocityY=-10;
  jump.play();
 }
     if (frameCount%70===0)
 {
 
 Spawnclouds();
 }
 if (frameCount%70===0)  
 {Spawnobstacles();
  
 }  
   if (trex.isTouching(obstaclesGroup))
   {
     gameState=END;
    //trex.velocityY=-10;
   }
   }
   
   else if (gameState===END)
   {
     ground.velocityX=0;
     trex.velocityY=0;         
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
      trex.changeAnimation("collided",trexCollided);
     cloudsGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     die.play();
     gameover.visible=true;
     restart.visible=true;
     if (mousePressedOver(restart)){
   reset();
 }
   }
     
  console.log(frameCount)     
 
 
 if (ground.x<0)
 {
 ground.x=ground.width/2;
 }
 //  console.log(trex.y)
 
 //trex.bounceOff(edges);
 trex.collide(invGround);
 console.log(m)
 
 drawSprites();
 
 
}
function Spawnclouds()
{
  cloud=createSprite(350,90,20,20)
  cloud.velocityX=-5;
  cloud.addImage(cloudAnim);
  cloud.scale=0.3;
  cloud.lifetime=80;
  cloud.y=Math.round(random(50,150));
  trex.depth=cloud.depth
  trex.depth=trex.depth+1;
  cloudsGroup.add (cloud);
}
function Spawnobstacles()
{
  obstacles=createSprite(300,325,20,20);
  obstacles.velocityX=-(3+score/70)
  obstacles.lifetime=120;
  check=Math.round(random (1,6));
  switch(check)
  {
    case 1:obstacles.addImage(o1);
      break;
      case 2:obstacles.addImage(o2);
      break;
      case 3:obstacles.addImage(o3);
      break;
      case 4:obstacles.addImage(o4);
      break;
      case 5:obstacles.addImage(o5);
      break;
      case 6:obstacles.addImage(o6);
      break;
     
  } 
  
  obstacles.scale=0.5;
  obstaclesGroup.add(obstacles);
  //obstacles.debug=true;
}
function reset()
{
gameState=PLAY;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running",trexAnim);
 score=0; 
}
