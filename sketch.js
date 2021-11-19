var PLAY = 1;
var END = 0;
var gameState = PLAY;


var obstacle,road,invisibleground;
var catrunning,roadImg,obstacleImg;
var gameover,gameoverImg,restart,restartImg;

function preload(){
catrunning =loadAnimation("cat-running-unscreen.gif");
roadImg =loadImage("road.png");
obstacleImg =loadImage("obstacle1.png");
gameoverImg =loadImage("gameover-removebg-preview.png");
restartImg =loadImage("restart-removebg-preview.png");
}

function setup() {
createCanvas(400,400);

road= createSprite(120,200) 
road.addImage(roadImg);


cat= createSprite(45,373,10,10);


invisibleGround = createSprite(255,395,600,10);  

gameover = createSprite(200,200,30,30);
gameover.addImage(gameoverImg);


restart = createSprite(380,20,10,10);
restart.addImage(restartImg);
restart.scale = 0.1


var score = 0;
obstacleGroup = new Group();
}

function draw() {
background("white")

if(gameState === PLAY){
  cat.visible = true;
  restart.visible = false;
  gameover.visible = false;

  cat.addAnimation("catrunner",catrunning);
  cat.scale=0.4;
  cat.setCollider('circle',0,0,50) 

  road.velocityX = -4;

  if (keyDown("SPACE")&& cat.y >= 350){
    cat.velocityY = -13;  
  }
  if(road.x < 85){
   road.x = width/2
   }

  cat.velocityY = cat.velocityY + 0.7;
  cat.collide(invisibleGround);

  Spawnobstacle();
}


if(obstacleGroup.isTouching(cat)){
  gameState = END;
}



if(gameState === END){
  road.velocityX = 0;
  cat.visible = false;
  obstacleGroup.setVelocityXEach(0)
  obstacle.remove();
  gameover.visible = true;
  restart.visible = true;

  textSize = 10;
  text("PRESS UP ARROW TO RESTART THE GAME",300,300)
}


if(keyDown("UP_ARROW")){
  gameState = PLAY;
}




 drawSprites();
}

function Spawnobstacle(){
    if(frameCount % 90 === 0){
     obstacle= createSprite(395,373,10,10);
     obstacle.addImage(obstacleImg);
     obstacle.scale=0.08;
     obstacleGroup.add(obstacle)
     obstacleGroup.setVelocityYEach(0)
    obstacleGroup.setVelocityXEach(-4)
    obstacleGroup.setLifetimeEach(164)
    invisibleGround.shapeColor = "light grey";
    }
}

